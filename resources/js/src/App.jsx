import { useState } from 'react';
import AppShell from './components/layout/AppShell.jsx';
import StatusPill from './components/ui/StatusPill.jsx';
import { useCatalogManager } from './hooks/useCatalogManager.js';
import CategoryManager from './features/categories/CategoryManager.jsx';
import ProductFilters from './features/products/ProductFilters.jsx';
import ProductForm from './features/products/ProductForm.jsx';
import ProductTable from './features/products/ProductTable.jsx';

export default function App() {
    const [activeSection, setActiveSection] = useState('categories');
    const {
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
    } = useCatalogManager();

    const navigationItems = [
        {
            id: 'categories',
            label: 'Danh Mục',
        },
        {
            id: 'products',
            label: 'Thêm sản phẩm',
        },
    ];

    return (
        <AppShell
            activeSection={activeSection}
            navigationItems={navigationItems}
            onSectionChange={setActiveSection}
        >
            {notice ? <StatusPill tone={notice.type}>{notice.message}</StatusPill> : null}

            {activeSection === 'categories' ? (
                <div className="space-y-6">
                    <CategoryManager
                        categories={categories}
                        categoryUsage={categoryUsage}
                        form={categoryForm}
                        isLoading={categoriesLoading}
                        isSaving={savingCategory}
                        editingCategoryId={editingCategoryId}
                        deletingCategoryId={deletingCategoryId}
                        onChange={setCategoryForm}
                        onSubmit={submitCategory}
                        onEdit={startCategoryEdit}
                        onCancelEdit={cancelCategoryEdit}
                        onDelete={removeCategory}
                    />
                </div>
            ) : (
                <div className="space-y-6 rounded-[28px] border border-slate-900/10 bg-white/80 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
                    <ProductFilters
                        search={search}
                        categoryFilter={categoryFilter}
                        categories={categories}
                        onSearchChange={setSearch}
                        onCategoryFilterChange={setCategoryFilter}
                        onRefresh={refreshProducts}
                        isRefreshing={productsLoading}
                    />
                    <ProductTable
                        products={products}
                        isLoading={productsLoading}
                        editingProductId={editingProductId}
                        deletingProductId={deletingProductId}
                        onEdit={startProductEdit}
                        onDelete={removeProduct}
                    />
                    <ProductForm
                        categories={categories}
                        form={productForm}
                        isSaving={savingProduct}
                        editingProductId={editingProductId}
                        onChange={setProductForm}
                        onSubmit={submitProduct}
                        onCancelEdit={cancelProductEdit}
                    />
                </div>
            )}
        </AppShell>
    );
}