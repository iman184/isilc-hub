import useStore from '../../app/store'
import { DAYS, TIMES, TIMETABLE, SESSION_COLORS, GROUPS } from '../../data/timetable'
import { MODULES } from '../../data/modules'

function getModuleColor(short) {
  const mod = MODULES.find((m) => m.short === short)
  return mod?.color ?? '#64748b'
}

function SessionBadge({ session }) {
  const color = SESSION_COLORS[session.type] ?? '#64748b'

  return (
    <div
      className="rounded-[6px] px-1.5 py-1 mb-1 last:mb-0 transition-all duration-150 hover:scale-[1.04] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
      style={{ background: `${color}18`, border: `1px solid ${color}40` }}
    >
      <div className="flex items-center gap-1">
        <span className="text-[10px] font-bold font-mono" style={{ color }}>
          {session.type}
        </span>
        <span
          className="w-1 h-1 rounded-full flex-shrink-0"
          style={{ background: getModuleColor(session.mod) }}
        />
      </div>
      <div className="text-xs font-semibold leading-snug">{session.mod}</div>
      {session.groups[0] !== 'ALL' && (
        <div className="text-[10px] text-text-faint mt-0.5">
          {session.groups.join(', ')}
        </div>
      )}
    </div>
  )
}

export function TimetableGrid() {
  const selectedGroup = useStore((s) => s.selectedGroup)
  const setSelectedGroup = useStore((s) => s.setSelectedGroup)

  const daySummaries = DAYS.map((day) => {
    const sessions = TIMES.flatMap((_, ti) => {
      const slots = (TIMETABLE[day] ?? [])[ti] ?? []
      return slots.filter((s) => s.groups.includes(selectedGroup) || s.groups.includes('ALL'))
    })
    return { day, count: sessions.length }
  })

  return (
    <div>
      {/* Group selector + Legend */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex gap-0.5 bg-bg-card border border-border rounded-[11px] p-0.5">
          {GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`
                rounded-[8px] px-4 py-1.5 text-[13px] font-semibold
                transition-all duration-200
                ${selectedGroup === g
                  ? 'text-white scale-[1.05] shadow-[0_2px_10px_rgba(74,77,231,0.35)]'
                  : 'bg-transparent text-text-dim hover:text-text-muted hover:scale-[1.03]'
                }
              `}
              style={selectedGroup === g ? { background: 'linear-gradient(135deg,#4a4de7,#6172f3)' } : {}}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex gap-3.5 flex-wrap">
          {Object.entries(SESSION_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5 text-xs text-text-dim">
              <span className="w-2 h-2 rounded-[2px]" style={{ background: color }} />
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin animate-fadeUp" style={{ animationDelay: '0.15s' }}>
        <div
          className="min-w-[640px] bg-bg-card border border-border rounded-card overflow-hidden w-full"
        >
          {/* Head */}
          <div
            className="grid bg-bg-muted border-b border-border"
            style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}
          >
            <div className="p-2.5 pl-3.5 text-[11px] font-mono text-text-faint">Horaire</div>
            {DAYS.map((day) => (
              <div key={day} className="p-2.5 text-xs font-semibold text-text-muted text-center">
                {day}
              </div>
            ))}
          </div>

          {/* Rows */}
          {TIMES.map((time, ti) => (
            <div
              key={time}
              className="grid border-b border-border last:border-b-0 min-h-[56px] transition-colors hover:bg-brand/[0.03]"
              style={{ gridTemplateColumns: '110px repeat(5, 1fr)' }}
            >
              <div className="px-3.5 py-2.5 flex items-center border-r border-border">
                <span className="text-[10px] font-mono text-text-faint leading-snug">{time}</span>
              </div>
              {DAYS.map((day) => {
                const slots = (TIMETABLE[day] ?? [])[ti] ?? []
                const mySessions = slots.filter(
                  (s) => s.groups.includes(selectedGroup) || s.groups.includes('ALL')
                )
                return (
                  <div
                    key={day}
                    className="px-1.5 py-1.5 border-r border-border/50 last:border-r-0"
                  >
                    {mySessions.map((s, i) => (
                      <SessionBadge key={i} session={s} />
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Day summary cards */}
      <div
        className="mt-4 bg-bg-card border border-border rounded-card p-4 animate-fadeUp"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="font-bold text-sm mb-3 text-brand-light">Résumé de la semaine — {selectedGroup}</div>
        <div className="flex flex-wrap gap-2">
          {daySummaries.map(({ day, count }) => (
            <div
              key={day}
              className="bg-bg-muted border border-border rounded-[9px] px-3 py-2.5 min-w-[100px] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_6px_18px_rgba(0,0,0,0.2)]"
            >
              <div className="font-bold text-xs mb-1">{day}</div>
              <div className="text-[11px] text-text-dim font-mono">{count} séance{count !== 1 ? 's' : ''}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
