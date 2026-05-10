export default function Panel({ children, className = '' }) {
    return (
        <section className={`relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ${className}`}>
            {children}
        </section>
    );
}