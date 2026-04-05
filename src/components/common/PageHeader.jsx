/**
 * Page-level header with title, subtitle and optional right-side actions slot.
 */
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3.5 mb-5 animate-fadeUp">
      <div>
        <h2 className="font-extrabold text-[22px] tracking-tight">{title}</h2>
        {subtitle && <p className="text-text-dim text-[13px] mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  )
}
