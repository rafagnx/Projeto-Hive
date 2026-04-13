const { PrismaClient } = require('@prisma/client');

async function seed() {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.create({
      data: {
        email: 'admin@instapost.local',
        password: '$2b$10$Y3wO.oE4x7k3oDExy3qBvuxJ9q./T81V8p8dM/X0QkI6y9zV8yY1W',
        name: 'Admin',
        role: 'ADMIN',
      },
    });
    console.log('User created:', user.email);
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('User already exists');
    } else {
      console.error(error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

seed();
