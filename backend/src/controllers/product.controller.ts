import { Request, Response } from 'express';
import { ProductModel } from '../models/product.model';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { AuthRequest } from '../middleware/auth.middleware';

export const createProduct = async (req: AuthRequest, res: Response) => {
    const dto = req.body as CreateProductDto;
    try {
        const product = await ProductModel.create({ ...dto });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data', error: err });
    }
};

export async function getProducts(req: Request, res: Response) {
    const { type, stringsCount, q, sort, order, page = '1', limit = '7' } = req.query;

    const filter: any = {};

    if (type) filter.type = type;
    if (stringsCount) filter.stringsCount = Number(stringsCount);
    if (q) {
        filter.name = { $regex: q.toString(), $options: 'i' };
    }

    let sortOption: any = {};
    if (sort === 'price' || sort === 'createdAt') {
        sortOption = { [sort]: order === 'asc' ? 1 : -1 };
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const items = await ProductModel.find(filter)
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

    const total = await ProductModel.countDocuments(filter);

    res.json({
        items,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
    });
}

export const getProductById = async (req: AuthRequest, res: Response) => {
    try {
        const prod = await ProductModel.findById(req.params.id);
        if (!prod) return res.status(404).json({ message: 'Product not found' });
        res.json(prod);
    } catch (err) {
        res.status(400).json({ message: 'Invalid ID', error: err });
    }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
    const dto = req.body as UpdateProductDto;
    try {
        const prod = await ProductModel.findByIdAndUpdate(req.params.id, dto, { new: true });
        if (!prod) return res.status(404).json({ message: 'Product not found' });
        res.json(prod);
    } catch (err) {
        res.status(400).json({ message: 'Update failed', error: err });
    }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
    try {
        const prod = await ProductModel.findByIdAndDelete(req.params.id);
        if (!prod) return res.status(404).json({ message: 'Product not found' });
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ message: 'Delete failed', error: err });
    }
};
