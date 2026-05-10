import axios from 'axios';

const client = axios.create({
    baseURL: '/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export async function listCategories() {
    const { data } = await client.get('/categories');
    return data;
}

export async function createCategory(payload) {
    const { data } = await client.post('/categories', payload);
    return data;
}

export async function updateCategory(categoryId, payload) {
    const { data } = await client.put(`/categories/${categoryId}`, payload);
    return data;
}

export async function deleteCategory(categoryId) {
    await client.delete(`/categories/${categoryId}`);
}

export async function listProducts(params = {}) {
    const { data } = await client.get('/products', { params });
    return data;
}

export async function createProduct(payload) {
    const { data } = await client.post('/products', payload);
    return data;
}

export async function updateProduct(productId, payload) {
    const { data } = await client.put(`/products/${productId}`, payload);
    return data;
}

export async function deleteProduct(productId) {
    await client.delete(`/products/${productId}`);
}