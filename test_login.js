const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function test() {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email: 'admin@instapost.local' } });
  if (!user) {
    console.log('USER NOT FOUND IN DB');
    return;
  }
  const newHash = await bcrypt.hash('admin123', 10);
  await prisma.user.update({
    where: { email: 'admin@instapost.local' },
    data: { password: newHash }
  });
  console.log('PASSWORD UPDATED TO admin123!');
}
test().finally(() => process.exit(0));
