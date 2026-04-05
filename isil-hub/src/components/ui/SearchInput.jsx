/**
 * Search input with magnifier icon and focus expand effect.
 */
export function SearchInput({ value, onChange, placeholder = 'Rechercher...' }) {
  return (
    <div className="relative">
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-faint text-xs pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          bg-bg-card border border-border rounded-[10px]
          pl-8 pr-3 py-2 text-[13px] text-text
          w-[190px] outline-none
          transition-all duration-300
          focus:border-brand focus:shadow-[0_0_0_3px_rgba(97,114,243,0.12)] focus:w-[220px]
          placeholder:text-text-faint
          font-[inherit]
        "
      />
    </div>
  )
}
