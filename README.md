# ☕ Bright Coffee House

A full-stack web application for a coffee house — featuring a beautiful public-facing website and a powerful admin dashboard.

## Project Structure

```
bright-coffee-house/
├── frontend/       # React + Vite frontend (public website + admin panel)
└── backend/        # Express + Prisma backend API
```

## Quick Start

Follow these steps to start the application:

### 1. Start the Backend

Open a terminal and run:
```bash
cd backend
npm install
npm run dev
```
> [!NOTE]
> If it's your first time, run `npm run prisma:migrate` and `node prisma/seed.js` inside the backend folder first.

Backend API → **http://localhost:5000**

### 2. Start the Frontend

Open a **second** terminal and run:
```bash
cd frontend
npm install
npm run dev
```

Frontend → **http://localhost:3000**


## Features

### Public Website
- 🏠 Landing page with hero section
- ☕ Interactive menu / services section
- 📖 About section
- 🖼️ Photo gallery
- 📬 Contact form
- 📧 Newsletter subscription
- 🤖 AI-powered assistant (Gemini)

### Admin Panel (`/admin`)
- 🔐 Secure login with JWT authentication
- 📊 Dashboard with stats overview
- ☕ Services / menu management (with image upload)
- 💬 Contact messages management
- 👥 Newsletter subscribers management
- ⚙️ Settings / password change

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 19, TypeScript, Vite, Tailwind CSS v4     |
| Backend   | Node.js, Express.js, Prisma ORM, SQLite         |
| Auth      | JWT (jsonwebtoken), bcryptjs                    |
| AI        | Google Gemini API                               |

## Default Admin Credentials

Run the seed script in the backend to create the default admin:

```bash
cd backend
node prisma/seed.js
```

See `backend/.env` for configuration details.