import { useMemo, useState } from 'react';
import Button from '../../components/ui/Button.jsx';
import Field from '../../components/ui/Field.jsx';
import Panel from '../../components/ui/Panel.jsx';

export default function CategoryManager({
    categories,
    categoryUsage,
    form,
    isLoading,
    isSaving,
    editingCategoryId,
    deletingCategoryId,
    onChange,
    onSubmit,
    onEdit,
    onCancelEdit,
    onDelete,
}) {
    const [search, setSearch] = useState('');

    const filteredCategories = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase();

        if (!normalizedSearch) {
            return categories;
        }

        return categories.filter((category) => category.name.toLocaleLowerCase().includes(normalizedSearch));
    }, [categories, search]);

    return (
        <Panel className="space-y-5">
            <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: 'var(--font-accent)' }}>
                Quản lý danh mục
            </h2>

            <form className="grid gap-4 border-b border-slate-200 pb-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end" onSubmit={onSubmit}>
                <Field label="Tên danh mục">
                    <input
                        type="text"
                        value={form.name}
                        onChange={(event) => onChange({ name: event.target.value })}
                        placeholder="Nhập tên danh mục"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                    />
                </Field>
                <div className="flex flex-wrap gap-3">
                    <Button type="submit" disabled={isSaving}>
                        {editingCategoryId ? 'Cập nhật danh mục' : 'Thêm danh mục'}
                    </Button>
                    {editingCategoryId ? (
                        <Button type="button" variant="secondary" onClick={onCancelEdit}>
                            Hủy sửa
                        </Button>
                    ) : null}
                </div>
            </form>

            <div className="space-y-3">
                <Field label="Tìm kiếm danh mục">
                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Nhập tên danh mục"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-200"
                    />
                </Field>

                {isLoading ? <p className="text-sm text-slate-500">Đang tải danh mục...</p> : null}
                {!isLoading && categories.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                        Chưa có danh mục nào. Thêm một mục để bắt đầu gắn sản phẩm.
                    </div>
                ) : null}
                {!isLoading && categories.length > 0 && filteredCategories.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                        Không có danh mục phù hợp với từ khóa tìm kiếm.
                    </div>
                ) : null}
                {filteredCategories.length > 0 ? (
                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <div className="grid grid-cols-[minmax(0,1.5fr)_140px_180px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-500">
                            <span>Tên danh mục</span>
                            <span>Sản phẩm</span>
                            <span className="text-right">Thao tác</span>
                        </div>
                        <div className="divide-y divide-slate-200 bg-white">
                            {filteredCategories.map((category) => {
                                const usage = categoryUsage[category.id] ?? 0;

                                return (
                                    <div
                                        key={category.id}
                                        className={`grid grid-cols-[minmax(0,1.5fr)_140px_180px] items-center gap-4 px-5 py-4 ${editingCategoryId === category.id ? 'bg-slate-50' : 'bg-white'}`}
                                    >
                                        <p className="text-base font-semibold text-slate-900">{category.name}</p>
                                        <p className="text-sm font-semibold text-slate-800">{usage} sản phẩm</p>
                                        <div className="flex gap-2 justify-end">
                                            <Button type="button" variant="secondary" className="px-3 py-2 text-xs" onClick={() => onEdit(category)}>
                                                Sửa
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="danger"
                                                className="px-3 py-2 text-xs"
                                                disabled={deletingCategoryId === category.id}
                                                onClick={() => onDelete(category)}
                                            >
                                                Xóa
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </div>
        </Panel>
    );
}