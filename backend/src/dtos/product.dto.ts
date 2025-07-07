export interface CreateProductDto {
    name: string;
    description: string;
    imageUrl: string;
    type: 'electro' | 'acoustic' | 'ukulele';
    sku: string;
    stringsCount: 4 | 6 | 7 | 12;
    price: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
