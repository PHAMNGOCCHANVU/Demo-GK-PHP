import Button from '../../components/ui/Button.jsx';
import Field from '../../components/ui/Field.jsx';
export default function ProductForm({
    categories,
    form,
    isSaving,
    editingProductId,
    onChange,
    onSubmit,
    onCancelEdit,
}) {
    return (
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-black text-slate-900" style={{ fontFamily: 'var(--font-accent)' }}>
                {editingProductId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
            </h3>

            <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
                <Field label="Tên sản phẩm">
                    <input
                        type="text"
                        value={form.name}
                        onChange={(event) => onChange({ ...form, name: event.target.value })}
                        placeholder="Nhập tên sản phẩm"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                    />
                </Field>

                <Field label="Giá">
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={(event) => onChange({ ...form, price: event.target.value })}
                        placeholder="Nhập giá sản phẩm"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                    />
                </Field>

                <Field label="Danh mục">
                    <select
                        value={form.category_id}
                        onChange={(event) => onChange({ ...form, category_id: event.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </Field>

                <div className="flex flex-wrap gap-3 md:col-span-2">
                    <Button type="submit" disabled={isSaving || categories.length === 0}>
                        {editingProductId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                    </Button>
                    {editingProductId ? (
                        <Button type="button" variant="secondary" onClick={onCancelEdit}>
                            Hủy sửa
                        </Button>
                    ) : null}
                </div>
            </form>
        </div>
    );
}