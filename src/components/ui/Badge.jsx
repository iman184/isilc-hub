/**
 * A small pill badge, commonly used for counts or status labels.
 */
export function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[9px] font-bold text-white bg-brand-dark animate-pop ${className}`}
    >
      {children}
    </span>
  )
}
