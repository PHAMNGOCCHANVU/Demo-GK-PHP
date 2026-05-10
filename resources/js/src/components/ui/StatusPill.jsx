export default function StatusPill({ tone = 'info', children }) {
    const tones = {
        success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
        error: 'border-rose-200 bg-rose-50 text-rose-700',
        info: 'border-slate-200 bg-slate-50 text-slate-700',
    };

    return (
        <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${tones[tone] ?? tones.info}`}>
            {children}
        </div>
    );
}