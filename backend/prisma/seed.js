const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const defaultHashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.admin.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: defaultHashedPassword,
        },
    });
    console.log('Initial admin created:', admin.username);

    const yaredPassword = await bcrypt.hash('abcd', 10);
    const yared = await prisma.admin.upsert({
        where: { username: 'yared' },
        update: { password: yaredPassword },
        create: {
            username: 'yared',
            password: yaredPassword,
        },
    });
    console.log('Yared admin created:', yared.username);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
