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
import { upload } from './upload';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK' });
});
app.get('/api/protected', authMiddleware, (req: AuthRequest, res) => {
    res.json({ message: 'You are authorized', userId: req.userId });
});

app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/products', authMiddleware, createProduct);
app.post('/api/upload', upload.single('image'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'Нет файла' });
    }
    res.json({ url: `/uploads/${file.filename}` });
});
app.get('/api/products', authMiddleware, getProducts);
app.get('/api/products/:id', authMiddleware, getProductById);
app.put('/api/products/:id', authMiddleware, updateProduct);
app.delete('/api/products/:id', authMiddleware, deleteProduct);


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
