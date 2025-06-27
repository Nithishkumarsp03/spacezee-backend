// bicrypt.js (ES module)
import bcrypt from 'bcrypt';

const plainPassword = "spacezee@2025";
const saltRounds = 12;

async function runBcryptDemo() {
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  console.log("🔐 Hashed Password:", hashedPassword);
}

runBcryptDemo();
