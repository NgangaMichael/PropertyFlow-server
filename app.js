import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({

  origin: 'http://localhost:5173',
  credentials: true, // If you're using cookies or authorization headers
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api', routes);

export default app;