/**
 * Centered empty-state block with emoji, title and subtitle.
 */
export function EmptyState({ emoji = '📭', title, subtitle }) {
  return (
    <div className="text-center py-16 px-5 animate-fadeUp">
      <span className="block text-5xl mb-3.5" style={{ animationDelay: '0.1s' }}>
        {emoji}
      </span>
      <div className="font-bold text-lg mb-1.5">{title}</div>
      {subtitle && <div className="text-text-dim text-sm">{subtitle}</div>}
    </div>
  )
}
