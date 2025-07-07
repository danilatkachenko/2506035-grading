export async function fetchProducts(
  token: string,
  params: Record<string, string> = {}
) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`/api/products?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Ошибка загрузки товаров');
  return res.json() as Promise<{
    items: any[];
    total: number;
    page: number;
    pages: number;
  }>;
}

export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  strings: number;
}, token: string) {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.image,
      type: product.type,
      stringsCount: product.strings,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || 'Ошибка создания товара');
  }

  return res.json();
}
