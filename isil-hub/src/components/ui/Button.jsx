/**
 * Primary filled button with hover lift effect.
 */
export function ButtonPrimary({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[10px]
        bg-brand-dark text-white text-sm font-semibold
        transition-all duration-200
        hover:bg-brand hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(97,114,243,0.35)]
        active:scale-[0.97]
        relative overflow-hidden
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Ghost/outline button.
 */
export function ButtonGhost({ children, onClick, className = '', ...props }) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[10px]
        bg-transparent text-text-muted text-sm font-medium
        border border-border
        transition-all duration-200
        hover:text-text hover:border-[#2d3748] hover:-translate-y-0.5
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Icon-only action button (small, subtle).
 */
export function ButtonIcon({ children, onClick, active = false, className = '', title = '' }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        p-1.5 rounded-md text-xs
        transition-all duration-150
        hover:bg-bg-muted hover:text-text hover:scale-110
        active:scale-95
        ${active ? 'text-amber-400 hover:rotate-12 hover:scale-125' : 'text-text-faint'}
        ${className}
      `}
    >
      {children}
    </button>
  )
}
