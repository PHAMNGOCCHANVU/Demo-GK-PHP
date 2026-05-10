export default function Button({
    children,
    className = '',
    type = 'button',
    variant = 'primary',
    disabled = false,
    ...props
}) {
    const variants = {
        primary: 'bg-slate-950 text-white hover:bg-slate-800 shadow-sm',
        secondary: 'bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-50',
        ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
        danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-sm',
    };

    return (
        <button
            type={type}
            disabled={disabled}
            className={`inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}