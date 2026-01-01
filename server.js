import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.API_PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});