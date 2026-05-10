import Field from '../../components/ui/Field.jsx';
export default function ProductFilters({
    search,
    categoryFilter,
    categories,
    onSearchChange,
    onCategoryFilterChange,
}) {
    return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-accent)' }}>
                Tìm kiếm sản phẩm
            </h3>

            <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
                <Field label="Tên sản phẩm">
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Nhập tên sản phẩm"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                    />
                </Field>

                <Field label="Danh mục">
                    <select
                        value={categoryFilter}
                        onChange={(event) => onCategoryFilterChange(event.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>
        </div>
    );
}