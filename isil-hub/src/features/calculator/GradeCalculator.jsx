import { useRef } from 'react'
import useStore from '../../app/store'
import { MODULES } from '../../data/modules'
import {
  computeModuleAverage,
  computeSemesterAverage,
  getMention,
  gradeStatus,
} from '../../utils/gradeCalculator'

function GradeInput({ value, onChange, placeholder }) {
  const status = gradeStatus(value)
  return (
    <input
      type="number"
      min="0"
      max="20"
      step="0.5"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`
        w-full bg-bg-muted border rounded-[7px] px-2 py-1.5 text-[13px] text-text text-center
        outline-none font-mono
        transition-all duration-150
        focus:border-brand focus:shadow-[0_0_0_3px_rgba(97,114,243,0.12)] focus:scale-[1.04]
        ${status === 'pass' ? 'border-emerald-500/40' : ''}
        ${status === 'fail' ? 'border-red-500/35' : ''}
        ${!status ? 'border-border' : ''}
      `}
    />
  )
}

export function GradeCalculator() {
  const grades = useStore((s) => s.grades)
  const setGrade = useStore((s) => s.setGrade)
  const avgRef = useRef(null)

  const result = computeSemesterAverage(grades)
  const mention = result ? getMention(result.average) : null

  const handleGradeChange = (moduleId, field, value) => {
    setGrade(moduleId, field, value)
    // bump animation
    if (avgRef.current) {
      avgRef.current.classList.remove('animate-countUp')
      void avgRef.current.offsetWidth
      avgRef.current.classList.add('animate-countUp')
    }
  }

  const failingModules = MODULES.filter((m) => {
    const g = grades[m.id]
    if (!g) return false
    const avg = computeModuleAverage(g.td, g.exam)
    return avg !== null && avg < 10
  })

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_280px] items-start">
      {/* Table */}
      <div className="bg-bg-card border border-border rounded-card overflow-hidden animate-fadeUp" style={{ animationDelay: '0.1s' }}>
        {/* Table header */}
        <div
          className="grid bg-bg-muted border-b border-border px-3.5 py-2.5 gap-2"
          style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr 1fr' }}
        >
          {['Module', 'Coef', 'TD (40%)', 'Exam (60%)', 'Moy'].map((h) => (
            <div key={h} className="text-[10px] font-semibold text-text-faint font-mono uppercase tracking-[0.04em]">
              {h}
            </div>
          ))}
        </div>

        {MODULES.map((mod) => {
          const g = grades[mod.id] ?? {}
          const avg = computeModuleAverage(g.td, g.exam)
          const avgMention = avg !== null ? getMention(avg) : null

          return (
            <div
              key={mod.id}
              className="grid px-3.5 py-3 gap-2 items-center border-b border-border last:border-b-0 transition-colors hover:bg-bg-muted"
              style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1.1fr 1fr' }}
            >
              <div>
                <div className="text-[13px] font-semibold">{mod.name}</div>
                <div className="text-[10px] font-mono text-text-faint">{mod.emoji} {mod.short}</div>
              </div>
              <div className="text-[13px] font-mono text-text-faint">{mod.coef}</div>
              <GradeInput
                value={g.td ?? ''}
                onChange={(v) => handleGradeChange(mod.id, 'td', v)}
                placeholder="—"
              />
              <GradeInput
                value={g.exam ?? ''}
                onChange={(v) => handleGradeChange(mod.id, 'exam', v)}
                placeholder="—"
              />
              <div
                className="font-mono font-bold text-sm text-center transition-all duration-200"
                style={{ color: avgMention?.color ?? 'var(--tw-color-text-faint, #475569)' }}
              >
                {avg !== null ? avg.toFixed(2) : '—'}
              </div>
            </div>
          )
        })}
      </div>

      {/* Sidebar */}
      <div className="flex flex-col gap-3.5 animate-slideLeft" style={{ animationDelay: '0.2s' }}>
        {/* Average card */}
        <div className="bg-bg-card border border-border rounded-card p-5 text-center relative overflow-hidden transition-all duration-300 hover:border-brand/30 hover:shadow-[0_8px_32px_rgba(97,114,243,0.08)]">
          <div className="text-[11px] text-text-faint font-mono uppercase tracking-[0.08em] mb-3">
            Moyenne générale
          </div>
          <div
            ref={avgRef}
            className="text-[50px] font-extrabold leading-none mb-2.5 font-mono"
            style={{ color: mention?.color ?? '#475569' }}
          >
            {result ? result.average.toFixed(2) : '—'}
          </div>
          {mention && (
            <div className="text-[13px] font-semibold mb-3.5" style={{ color: mention.color }}>
              {mention.label}
            </div>
          )}
          <div className="h-1 bg-bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: result ? `${(result.average / 20) * 100}%` : '0%',
                background: mention?.color ?? '#64748b',
              }}
            />
          </div>
          {result && (
            <div className="text-[11px] text-text-faint mt-2 font-mono">
              {result.filledCount}/{MODULES.length} modules saisis
            </div>
          )}
        </div>

        {/* Module details */}
        <div className="bg-bg-card border border-border rounded-card p-3.5">
          <div className="text-xs font-bold text-text-muted mb-3">Détail par module</div>
          {MODULES.map((mod) => {
            const g = grades[mod.id] ?? {}
            const avg = computeModuleAverage(g.td, g.exam)
            const m = avg !== null ? getMention(avg) : null
            return (
              <div
                key={mod.id}
                className="flex items-center justify-between mb-2 last:mb-0 transition-transform duration-150 hover:translate-x-0.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: mod.color }} />
                  <span className="text-xs text-text-muted">{mod.emoji} {mod.short}</span>
                </div>
                <span className="text-xs font-mono font-bold" style={{ color: m?.color ?? '#475569' }}>
                  {avg !== null ? avg.toFixed(2) : '—'}
                </span>
              </div>
            )
          })}
        </div>

        {/* Failing modules alert */}
        {failingModules.length > 0 && (
          <div className="bg-red-500/[0.07] border border-red-500/[0.18] rounded-[10px] p-3 text-xs text-red-400 leading-relaxed animate-pop">
            ⚠️ <strong>Modules en dessous de 10 :</strong>{' '}
            {failingModules.map((m) => m.short).join(', ')}. Concentre-toi sur ces matières !
          </div>
        )}
      </div>
    </div>
  )
}
