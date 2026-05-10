export default function Field({ label, hint, error, children }) {
    return (
        <label className="block space-y-2">
            <div className="flex items-end justify-between gap-3">
                <span className="text-sm font-semibold text-slate-700">{label}</span>
                {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
            </div>
            {children}
            {error ? <p className="text-xs text-rose-600">{error}</p> : null}
        </label>
    );
}