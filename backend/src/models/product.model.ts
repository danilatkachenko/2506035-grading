import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    dateAdded: Date;
    imageUrl: string;
    type: 'electro' | 'acoustic' | 'ukulele';
    sku: string;
    stringsCount: 4 | 6 | 7 | 12;
    price: number;
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 1024,
    },
    dateAdded: {
        type: Date,
        default: () => new Date(),
    },
    imageUrl: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['electro', 'acoustic', 'ukulele'],
        required: true,
    },
    sku: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40,
    },
    stringsCount: {
        type: Number,
        enum: [4, 6, 7, 12],
        required: true,
    },
    price: {
        type: Number,
        min: 100,
        max: 1_000_000,
        required: true,
    },
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
