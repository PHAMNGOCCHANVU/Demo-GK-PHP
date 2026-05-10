import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import {
    createCategory,
    createProduct,
    deleteCategory,
    deleteProduct,
    listCategories,
    listProducts,
    updateCategory,
    updateProduct,
} from '../api/catalogApi.js';

const initialCategoryForm = { name: '' };
const initialProductForm = { name: '', price: '', category_id: '' };

function resolveMessage(error, fallback) {
    const data = error?.response?.data;

    if (!data) {
        return fallback;
    }

    if (typeof data.message === 'string' && data.message.length > 0) {
        return data.message;
    }

    const firstError = Object.values(data.errors ?? {})[0]?.[0];
    return firstError ?? fallback;
}

export function useCatalogManager() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryForm, setCategoryForm] = useState(initialCategoryForm);
    const [productForm, setProductForm] = useState(initialProductForm);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);
    const [deletingCategoryId, setDeletingCategoryId] = useState(null);
    const [deletingProductId, setDeletingProductId] = useState(null);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(true);
    const [savingCategory, setSavingCategory] = useState(false);
    const [savingProduct, setSavingProduct] = useState(false);
    const [notice, setNotice] = useState(null);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const hasBootstrapped = useRef(false);
    const deferredSearch = useDeferredValue(search);

    const categoryUsage = useMemo(() => {
        return products.reduce((accumulator, product) => {
            accumulator[product.category_id] = (accumulator[product.category_id] ?? 0) + 1;
            return accumulator;
        }, {});
    }, [products]);

    async function refreshCategories() {
        setCategoriesLoading(true);

        try {
            const data = await listCategories();
            startTransition(() => setCategories(data));
        } finally {
            setCategoriesLoading(false);
        }
    }

    async function refreshProducts() {
        setProductsLoading(true);

        try {
            const data = await listProducts({
                search: deferredSearch.trim() || undefined,
                category_id: categoryFilter || undefined,
            });

            startTransition(() => setProducts(data));
        } finally {
            setProductsLoading(false);
        }
    }

    useEffect(() => {
        async function bootstrap() {
            try {
                const [categoryData, productData] = await Promise.all([listCategories(), listProducts()]);
                startTransition(() => {
                    setCategories(categoryData);
                    setProducts(productData);
                });
            } catch (error) {
                setNotice({ type: 'error', message: resolveMessage(error, 'Không thể tải dữ liệu ban đầu.') });
            } finally {
                setCategoriesLoading(false);
                setProductsLoading(false);
                hasBootstrapped.current = true;
            }
        }

        void bootstrap();
    }, []);

    useEffect(() => {
        if (!hasBootstrapped.current) {
            return;
        }

        void refreshProducts();
    }, [deferredSearch, categoryFilter]);

    async function submitCategory(event) {
        event.preventDefault();

        const payload = { name: categoryForm.name.trim() };

        if (!payload.name) {
            setNotice({ type: 'error', message: 'Tên danh mục không được để trống.' });
            return;
        }

        setSavingCategory(true);

        try {
            if (editingCategoryId) {
                await updateCategory(editingCategoryId, payload);
            } else {
                await createCategory(payload);
            }

            await refreshCategories();
            setCategoryForm(initialCategoryForm);
            setEditingCategoryId(null);
            setNotice({
                type: 'success',
                message: editingCategoryId ? 'Đã cập nhật danh mục thành công.' : 'Đã thêm danh mục mới.',
            });
        } catch (error) {
            setNotice({ type: 'error', message: resolveMessage(error, 'Không thể lưu danh mục.') });
        } finally {
            setSavingCategory(false);
        }
    }

    function startCategoryEdit(category) {
        setEditingCategoryId(category.id);
        setCategoryForm({ name: category.name });
    }

    function cancelCategoryEdit() {
        setEditingCategoryId(null);
        setCategoryForm(initialCategoryForm);
    }

    async function removeCategory(category) {
        if (!window.confirm(`Xóa danh mục "${category.name}"?`)) {
            return;
        }

        setDeletingCategoryId(category.id);

        try {
            await deleteCategory(category.id);
            await refreshCategories();
            if (String(category.id) === categoryFilter) {
                setCategoryFilter('');
            }
            setNotice({ type: 'success', message: 'Đã xóa danh mục.' });
        } catch (error) {
            setNotice({ type: 'error', message: resolveMessage(error, 'Không thể xóa danh mục.') });
        } finally {
            setDeletingCategoryId(null);
        }
    }

    async function submitProduct(event) {
        event.preventDefault();

        const payload = {
            name: productForm.name.trim(),
            price: Number(productForm.price),
            category_id: Number(productForm.category_id),
        };

        if (!payload.name || Number.isNaN(payload.price) || Number.isNaN(payload.category_id)) {
            setNotice({ type: 'error', message: 'Cần nhập đầy đủ tên, giá và danh mục cho sản phẩm.' });
            return;
        }

        setSavingProduct(true);

        try {
            if (editingProductId) {
                await updateProduct(editingProductId, payload);
            } else {
                await createProduct(payload);
            }

            await refreshProducts();
            setProductForm(initialProductForm);
            setEditingProductId(null);
            setNotice({
                type: 'success',
                message: editingProductId ? 'Đã cập nhật sản phẩm thành công.' : 'Đã thêm sản phẩm mới.',
            });
        } catch (error) {
            setNotice({ type: 'error', message: resolveMessage(error, 'Không thể lưu sản phẩm.') });
        } finally {
            setSavingProduct(false);
        }
    }

    function startProductEdit(product) {
        setEditingProductId(product.id);
        setProductForm({
            name: product.name,
            price: String(Number(product.price)),
            category_id: String(product.category_id),
        });
    }

    function cancelProductEdit() {
        setEditingProductId(null);
        setProductForm(initialProductForm);
    }

    async function removeProduct(product) {
        if (!window.confirm(`Xóa sản phẩm "${product.name}"?`)) {
            return;
        }

        setDeletingProductId(product.id);

        try {
            await deleteProduct(product.id);
            await refreshProducts();

            if (editingProductId === product.id) {
                cancelProductEdit();
            }

            setNotice({ type: 'success', message: 'Đã xóa sản phẩm.' });
        } catch (error) {
            setNotice({ type: 'error', message: resolveMessage(error, 'Không thể xóa sản phẩm.') });
        } finally {
            setDeletingProductId(null);
        }
    }

    return {
        categories,
        products,
        categoryUsage,
        categoryForm,
        productForm,
        editingCategoryId,
        editingProductId,
        deletingCategoryId,
        deletingProductId,
        search,
        categoryFilter,
        categoriesLoading,
        productsLoading,
        savingCategory,
        savingProduct,
        notice,
        setCategoryForm,
        setProductForm,
        setSearch,
        setCategoryFilter,
        submitCategory,
        startCategoryEdit,
        cancelCategoryEdit,
        removeCategory,
        submitProduct,
        startProductEdit,
        cancelProductEdit,
        removeProduct,
        refreshProducts,
        refreshCategories,
    };
}