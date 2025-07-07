import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { ProductModel } from './models/product.model';

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
    console.error('❌ MONGO_URL не задан');
    process.exit(1);
}

const types = ['acoustic', 'electro', 'ukulele'];
const stringVariants = [4, 6, 7, 12];

async function generate(count = 10) {
    await mongoose.connect(mongoUrl!);
    console.log('✅ Подключено к MongoDB');

    const products = Array.from({ length: count }).map(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        imageUrl: faker.image.urlPicsumPhotos(),
        type: faker.helpers.arrayElement(types),
        sku: faker.string.uuid().slice(0, 8),
        stringsCount: faker.helpers.arrayElement(stringVariants),
        price: Number(faker.commerce.price({ min: 5000, max: 100000 })),
    }));

    await ProductModel.insertMany(products);
    console.log(`✅ Создано товаров: ${count}`);

    await mongoose.disconnect();
    process.exit(0);
}

const arg = process.argv[2];
const count = arg ? parseInt(arg) : 10;

generate(count);
