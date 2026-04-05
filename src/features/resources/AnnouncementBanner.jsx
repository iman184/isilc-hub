import useStore from '../../app/store'
import { ANNOUNCEMENTS } from '../../data/announcements'

const TYPE_STYLES = {
  exam:     { wrapper: 'bg-red-500/[0.06] border-red-500/20' },
  info:     { wrapper: 'bg-brand/[0.06] border-brand/20' },
  resource: { wrapper: 'bg-emerald-500/[0.06] border-emerald-500/20' },
}

export function AnnouncementBanner() {
  const dismissed = useStore((s) => s.dismissedAnnouncements)
  const dismiss = useStore((s) => s.dismissAnnouncement)

  const visible = ANNOUNCEMENTS.filter((a) => !dismissed.includes(a.id))
  if (visible.length === 0) return null

  return (
    <div className="max-w-[1100px] mx-auto px-5 pb-3 flex flex-col gap-1.5">
      {visible.map((ann) => (
        <div
          key={ann.id}
          className={`
            flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[13px]
            border animate-slideLeft
            transition-transform duration-200 hover:translate-x-1
            ${TYPE_STYLES[ann.type]?.wrapper ?? ''}
          `}
        >
          <span>{ann.icon}</span>
          <span className="font-semibold text-[13px]" style={{ color: ann.color }}>
            {ann.title}
          </span>
          <span className="text-text-dim text-xs">{ann.body}</span>
          <button
            onClick={() => dismiss(ann.id)}
            className="ml-auto text-text-faint text-[13px] p-0.5 rounded transition-all hover:text-text hover:scale-110"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
