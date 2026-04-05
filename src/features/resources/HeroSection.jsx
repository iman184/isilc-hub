import { MODULES } from '../../data/modules'
import { ButtonPrimary, ButtonGhost } from '../../components/ui/Button'
import useStore from '../../app/store'

const HERO_STATS = [
  { icon: '📚', num: MODULES.length, label: 'Modules' },
  { icon: '🔗', num: MODULES.reduce((acc, m) => acc + Object.values(m.links).filter(Boolean).length, 0), label: 'Ressources' },
  { icon: '⚡', num: MODULES.reduce((acc, m) => acc + m.coef, 0), label: 'Crédits total' },
]

export function HeroSection() {
  const setActiveTab = useStore((s) => s.setActiveTab)

  return (
    <section className="text-center px-5 pt-14 pb-7 max-w-[1100px] mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 bg-brand-dark/10 border border-brand-dark/30 rounded-full px-3.5 py-1.5 mb-5 text-xs text-brand-light font-mono animate-fadeUp">
        <span
          className="w-1.5 h-1.5 rounded-full bg-brand animate-blink"
          style={{ flexShrink: 0 }}
        />
        ISIL-C · Semestre 2 · 2025/2026
      </div>

      {/* Title */}
      <h1
        className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-[-0.03em] leading-[1.1] mb-3.5 animate-fadeUp"
        style={{ animationDelay: '0.1s' }}
      >
        Tous tes cours,{' '}
        <span className="gradient-text">au même endroit.</span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-text-muted text-[15px] max-w-[440px] mx-auto mb-7 animate-fadeUp"
        style={{ animationDelay: '0.2s' }}
      >
        Ressources, emploi du temps, calculatrice de moyenne — tout ce dont tu as besoin pour L2 ISIL-C.
      </p>

      {/* CTA buttons */}
      <div
        className="flex gap-2.5 justify-center flex-wrap mb-10 animate-fadeUp"
        style={{ animationDelay: '0.3s' }}
      >
        <ButtonPrimary onClick={() => setActiveTab('resources')}>
          📚 Explorer les ressources
        </ButtonPrimary>
        <ButtonGhost onClick={() => setActiveTab('timetable')}>
          🗓️ Voir l'emploi du temps
        </ButtonGhost>
      </div>

      {/* Stats row */}
      <div
        className="flex gap-4 justify-center flex-wrap animate-fadeUp"
        style={{ animationDelay: '0.4s' }}
      >
        {HERO_STATS.map((stat) => (
          <div
            key={stat.label}
            className="
              flex items-center gap-2.5 bg-bg-card border border-border rounded-[11px] px-4 py-2.5
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_8px_24px_rgba(97,114,243,0.1)]
            "
          >
            <div className="w-[30px] h-[30px] rounded-[7px] bg-brand-dark/15 flex items-center justify-center text-[13px] transition-transform duration-300 hover:-rotate-[10deg] hover:scale-110">
              {stat.icon}
            </div>
            <div>
              <div className="font-extrabold text-lg font-mono leading-none">{stat.num}</div>
              <div className="text-[11px] text-text-dim">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
