/**
 * Segmented pill filter group.
 * @param {{ options: {value: string, label: string}[], active: string, onChange: (v:string)=>void }} props
 */
export function FilterGroup({ options, active, onChange }) {
  return (
    <div className="flex gap-0.5 bg-bg-card border border-border rounded-[10px] p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            rounded-[7px] px-3 py-1 text-xs
            transition-all duration-200 cubic-bezier-spring
            ${
              active === opt.value
                ? 'bg-brand-dark text-white scale-[1.05]'
                : 'bg-transparent text-text-dim hover:text-text-muted hover:scale-[1.03]'
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
