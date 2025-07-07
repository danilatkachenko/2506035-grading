// backend/src/app.ts
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from './controllers/product.controller';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { register, login } from './controllers/auth.controller';
import { authMiddleware, AuthRequest } from './middleware/auth.middleware';
// import { setupSwagger } from './swagger';

dotenv.config();

const app = express();
app.use(express.json());
// setupSwagger(app);

// тестовый роут
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK' });
});
app.get('/api/protected', authMiddleware, (req: AuthRequest, res) => {
    res.json({ message: 'You are authorized', userId: req.userId });
});

// добавляем роут регистрации
app.post('/api/register', register);
app.post('/api/login', login);
// CRUD Product (все приватные)
app.post('/api/products', authMiddleware, createProduct);
app.get('/api/products', authMiddleware, getProducts);
app.get('/api/products/:id', authMiddleware, getProductById);
app.put('/api/products/:id', authMiddleware, updateProduct);
app.delete('/api/products/:id', authMiddleware, deleteProduct);


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
