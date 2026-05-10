export default function AppShell({ children, navigationItems, activeSection, onSectionChange }) {
    return (
        <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
            <div className="grid flex-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
                <aside className="rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:p-6">
                    <div className="space-y-6">
                        <div className="border-b border-white/10 pb-5">
                            <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-accent)' }}>
                                Quản lý
                            </h1>
                        </div>

                        <nav className="space-y-2">
                            {navigationItems.map((item) => {
                                const isActive = item.id === activeSection;

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => onSectionChange(item.id)}
                                        className={`w-full rounded-xl border px-4 py-3.5 text-left transition ${isActive ? 'border-slate-700 bg-white text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]' : 'border-transparent bg-slate-900 text-slate-300 hover:border-slate-800 hover:bg-slate-900/70 hover:text-white'}`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${isActive ? 'text-slate-950' : 'text-slate-300'}`}>{item.label}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </nav>

                        <a
                            href="/docs/api"
                            className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                        >
                            Tài liệu API
                        </a>
                    </div>
                </aside>

                <main className="space-y-6 pb-6">{children}</main>
            </div>
        </div>
    );
}