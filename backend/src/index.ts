import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'path';
import multer from 'multer';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- Middleware ---
const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// --- Auth Routes ---

// Login
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { username } });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, username: admin.username });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Change Password
app.put('/api/auth/change-password', authenticateToken, async (req: any, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { id: req.user.id } });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Current password incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.admin.update({
            where: { id: req.user.id },
            data: { password: hashedPassword }
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// --- Contact Routes ---

// Create Message (Public)
app.post('/api/contacts', async (req, res) => {
    const { name, phone, email, message } = req.body;
    try {
        const newContact = await prisma.contact.create({
            data: { name, phone, email, message }
        });
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: 'Error saving message' });
    }
});

// Get all messages (Admin Only)
app.get('/api/contacts', authenticateToken, async (req, res) => {
    try {
        const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Mark message as read (Admin Only)
app.put('/api/contacts/:id/read', authenticateToken, async (req, res) => {
    try {
        const contact = await prisma.contact.update({
            where: { id: parseInt(req.params.id) },
            data: { isRead: true }
        });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error updating message status' });
    }
});

// Get dashboard stats (Admin Only)
app.get('/api/stats', authenticateToken, async (req, res) => {
    try {
        const servicesCount = await prisma.service.count();
        const unreadMessagesCount = await prisma.contact.count({ where: { isRead: false } });
        const subscribersCount = await prisma.subscription.count();
        const totalMessagesCount = await prisma.contact.count();

        res.json({
            services: servicesCount,
            unreadMessages: unreadMessagesCount,
            totalMessages: totalMessagesCount,
            subscribers: subscribersCount,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
});

// Delete message (Admin Only)
app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
    try {
        await prisma.contact.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message' });
    }
});

// --- Subscription Routes ---

// Subscribe (Public)
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    try {
        const sub = await prisma.subscription.create({ data: { email } });
        res.status(201).json(sub);
    } catch (error: any) {
        if (error.code === 'P2002') return res.status(400).json({ message: 'Email already subscribed' });
        res.status(500).json({ message: 'Error subscribing' });
    }
});

// Get all subscribers (Admin Only)
app.get('/api/subscriptions', authenticateToken, async (req, res) => {
    try {
        const subs = await prisma.subscription.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(subs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscribers' });
    }
});

// Delete subscriber (Admin Only)
app.delete('/api/subscriptions/:id', authenticateToken, async (req, res) => {
    try {
        await prisma.subscription.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Subscriber removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing subscriber' });
    }
});

// --- Service Routes ---

// Get all services (Public)
app.get('/api/services', async (req, res) => {
    try {
        const services = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services' });
    }
});

// Create service (Admin Only)
app.post('/api/services', authenticateToken, upload.single('image'), async (req: any, res) => {
    const { title, price, content } = req.body;
    let imagePath = '';

    if (req.file) {
        imagePath = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    }

    try {
        const service = await prisma.service.create({
            data: { title, price: parseFloat(price), image: imagePath, content }
        });
        res.status(201).json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error creating service' });
    }
});

// Update service (Admin Only)
app.put('/api/services/:id', authenticateToken, upload.single('image'), async (req: any, res) => {
    const { title, price, content } = req.body;
    let updateData: any = { title, price: parseFloat(price), content };

    if (req.file) {
        updateData.image = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    }

    try {
        const service = await prisma.service.update({
            where: { id: parseInt(req.params.id) },
            data: updateData
        });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Error updating service' });
    }
});

// Delete service (Admin Only)
app.delete('/api/services/:id', authenticateToken, async (req, res) => {
    try {
        await prisma.service.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
