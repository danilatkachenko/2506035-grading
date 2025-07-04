import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { RegisterDto, LoginDto } from '../dtos/user.dto';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as RegisterDto;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already taken' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ name, email, passwordHash });

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginDto;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '2h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err });
    }
};
