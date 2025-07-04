// backend/src/app.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { register, login } from './controllers/auth.controller';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const app = express();
app.use(express.json());

// тестовый роут
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK' });
});
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You are authorized', userId: (req as any).userId });
});

// добавляем роут регистрации
app.post('/api/register', register);
app.post('/api/login', login);

// подключаемся к MongoDB
const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
    console.error('❌ MONGO_URL не задан в .env');
    process.exit(1);
}

mongoose
    .connect(mongoUrl)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
        console.error('❌ Ошибка подключения к MongoDB:', err);
        process.exit(1);
    });

export default app;
