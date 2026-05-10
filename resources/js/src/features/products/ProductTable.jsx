import Button from '../../components/ui/Button.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export default function ProductTable({
    products,
    isLoading,
    editingProductId,
    deletingProductId,
    onEdit,
    onDelete,
}) {
    return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-accent)' }}>
                Danh sách sản phẩm
            </h3>

            {isLoading ? <p className="text-sm text-slate-500">Đang tải sản phẩm...</p> : null}

            {!isLoading && products.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-500">
                    Chưa có sản phẩm khớp bộ lọc hiện tại.
                </div>
            ) : null}

            <div className="overflow-hidden rounded-3xl border border-slate-200">
                <div className="hidden grid-cols-[minmax(0,1.7fr)_minmax(140px,0.9fr)_minmax(160px,0.9fr)_180px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-500 md:grid">
                    <span>Tên sản phẩm</span>
                    <span>Danh mục</span>
                    <span>Giá</span>
                    <span className="text-right">Thao tác</span>
                </div>

                <div className="divide-y divide-slate-200 bg-white">
                    {products.map((product) => (
                        <article
                            key={product.id}
                            className={`grid gap-4 px-4 py-4 md:grid-cols-[minmax(0,1.7fr)_minmax(140px,0.9fr)_minmax(160px,0.9fr)_180px] md:items-center md:px-5 ${editingProductId === product.id ? 'bg-slate-50' : 'bg-white'}`}
                        >
                            <div>
                                <p className="text-base font-semibold text-slate-900">{product.name}</p>
                            </div>

                            <div>
                                <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700">
                                    {product.category?.name ?? `Category #${product.category_id}`}
                                </span>
                            </div>

                            <div className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-accent)' }}>
                                {formatCurrency(product.price)}
                            </div>

                            <div className="flex gap-2 md:justify-end">
                                <Button type="button" variant="secondary" className="px-3 py-2 text-xs" onClick={() => onEdit(product)}>
                                    Sửa
                                </Button>
                                <Button
                                    type="button"
                                    variant="danger"
                                    className="px-3 py-2 text-xs"
                                    disabled={deletingProductId === product.id}
                                    onClick={() => onDelete(product)}
                                >
                                    Xóa
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}