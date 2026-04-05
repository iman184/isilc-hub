import { useState } from 'react'
import useStore from '../../app/store'
import { RESOURCE_TYPES } from '../../data/modules'
import { ButtonIcon } from '../../components/ui/Button'

function ProgressCheck({ checked, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-3.5 h-3.5 rounded-[3px] flex items-center justify-center flex-shrink-0
        transition-all duration-200 hover:scale-110
        ${checked
          ? 'border-transparent scale-[1.05]'
          : 'border-[1.5px] border-border hover:border-brand bg-transparent'
        }
      `}
      style={checked ? { background: color } : {}}
    >
      {checked && <span className="text-white leading-none" style={{ fontSize: '8px' }}>✓</span>}
    </button>
  )
}

export function ModuleCard({ module }) {
  const [noteOpen, setNoteOpen] = useState(false)

  const isBookmarked = useStore((s) => s.isBookmarked(module.id))
  const toggleBookmark = useStore((s) => s.toggleBookmark)
  const getProgress = useStore((s) => s.getProgress)
  const toggleProgress = useStore((s) => s.toggleProgress)
  const notes = useStore((s) => s.notes)
  const setNote = useStore((s) => s.setNote)

  const doneCount = RESOURCE_TYPES.filter((r) => getProgress(module.id, r.key)).length
  const progressPct = (doneCount / RESOURCE_TYPES.length) * 100

  return (
    <div
      data-anim
      className="
        bg-bg-card border border-border rounded-card overflow-hidden
        transition-all duration-250
        hover:border-brand/45 hover:shadow-[0_12px_32px_rgba(97,114,243,0.1)] hover:-translate-y-1
      "
    >
      {/* Color bar */}
      <div
        className="h-[3px] transition-all duration-200 hover:h-1"
        style={{ background: module.color }}
      />

      <div className="p-4 pb-4">
        {/* Header */}
        <div className="flex items-start gap-2.5 mb-2.5">
          <span
            className="text-[26px] leading-none flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          >
            {module.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-1.5">
              <div className="font-bold text-sm leading-snug flex-1">{module.name}</div>
              <div className="flex items-center gap-0 flex-shrink-0">
                <ButtonIcon onClick={() => setNoteOpen((o) => !o)} title="Notes">📝</ButtonIcon>
                <ButtonIcon
                  onClick={() => toggleBookmark(module.id)}
                  active={isBookmarked}
                  title={isBookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                >
                  {isBookmarked ? '🔖' : '🏷️'}
                </ButtonIcon>
              </div>
            </div>
            <div className="flex gap-1.5 flex-wrap mt-1">
              <span className="text-[10px] font-mono bg-brand-dark/12 text-brand-light px-1.5 py-0.5 rounded-[5px]">
                Coef {module.coef}
              </span>
              {module.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-bg-muted text-text-dim px-1.5 py-0.5 rounded-[5px] transition-colors duration-150 hover:bg-brand/12 hover:text-brand-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-text-dim mb-3 leading-relaxed">{module.desc}</p>

        {/* Progress */}
        <div className="flex justify-between mb-1 text-[11px] text-text-faint">
          <span>Progression</span>
          <span className="font-mono">{doneCount}/4</span>
        </div>
        <div className="h-[3px] bg-bg-muted rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%`, background: module.color }}
          />
        </div>

        {/* Resource chips */}
        <div className="flex flex-wrap gap-1.5">
          {RESOURCE_TYPES.map((res) => {
            const url = module.links[res.key]
            const done = getProgress(module.id, res.key)

            if (!url) {
              return (
                <span
                  key={res.key}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-[7px] font-medium bg-bg-muted text-text-faint cursor-default"
                >
                  {res.label}
                </span>
              )
            }

            return (
              <div key={res.key} className="flex items-center gap-1">
                <ProgressCheck
                  checked={done}
                  color={module.color}
                  onClick={() => toggleProgress(module.id, res.key)}
                />
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-[7px] font-medium transition-all duration-150 hover:opacity-85 hover:-translate-y-0.5 hover:scale-[1.05]"
                  style={{ background: res.color, color: res.textColor }}
                >
                  {res.label} ↗
                </a>
              </div>
            )
          })}
        </div>

        {/* Note area */}
        {noteOpen && (
          <div className="mt-2.5">
            <textarea
              rows={2}
              placeholder="Tes notes personnelles..."
              defaultValue={notes[module.id] ?? ''}
              onChange={(e) => setNote(module.id, e.target.value)}
              className="
                w-full bg-bg-muted border border-border rounded-[8px]
                px-2.5 py-2 text-xs text-text-muted
                resize-y outline-none font-[inherit] leading-relaxed
                transition-all duration-150
                focus:border-brand focus:shadow-[0_0_0_3px_rgba(97,114,243,0.1)]
              "
            />
          </div>
        )}
      </div>
    </div>
  )
}
