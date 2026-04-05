import { useEffect, useRef } from 'react'
import { PROFILE } from '../../data/profile'
import { useTypingEffect } from '../../hooks/useTypingEffect'

function SkillBar({ name, pct, gradient }) {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    bar.style.width = '0'
    const t = setTimeout(() => { bar.style.width = `${pct}%` }, 120)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between mb-1 text-xs">
        <span className="text-text-muted">{name}</span>
        <span className="text-text-faint font-mono">{pct}%</span>
      </div>
      <div className="h-1.5 bg-bg-muted rounded-full overflow-hidden">
        <div ref={barRef} className="h-full rounded-full transition-all duration-700 ease-out" style={{ background: gradient, width: 0 }} />
      </div>
    </div>
  )
}

function TimelineItem({ item, isLast }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5" style={{ background: item.color }} />
        {!isLast && <div className="w-px flex-1 bg-border mt-1.5" />}
      </div>
      <div className="pb-4">
        <div className="text-[11px] text-text-faint font-mono mb-0.5">{item.year}</div>
        <div className="text-sm font-semibold leading-snug mb-0.5">{item.title}</div>
        {item.sub && <div className="text-xs text-text-dim">{item.sub}</div>}
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="bg-bg-muted border border-border rounded-card p-3.5 transition-all duration-200 hover:border-brand/30 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
      <div className="font-bold text-[13px] mb-1.5">{project.icon} {project.title}</div>
      <div className="text-xs text-text-dim leading-relaxed mb-2">{project.desc}</div>
      <div className="flex gap-1.5 flex-wrap">
        {project.techs.map((tech) => (
          <span key={tech.label} className="text-[10px] px-2 py-0.5 rounded-[5px] font-mono" style={{ background: tech.bg, color: tech.color }}>
            {tech.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function ProfileView() {
  const role = useTypingEffect(PROFILE.roleCycle)

  return (
    <div className="max-w-[820px] mx-auto">
      <div className="border border-border bg-bg-card" style={{ borderRadius: '12px' }}>

        {/* Banner + avatar overlap container */}
        <div className="relative" style={{ marginBottom: '32px' }}>
          {/* Banner */}
          <div
            className="h-28 overflow-hidden"
            style={{
              borderRadius: '12px 12px 0 0',
              background: 'linear-gradient(135deg, #1a1f35 0%, #0f1117 40%, #1a1a2e 100%)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 30% 50%, rgba(97,114,243,0.35) 0%, transparent 60%), ' +
                  'radial-gradient(ellipse at 80% 20%, rgba(236,72,153,0.25) 0%, transparent 50%)',
              }}
            />
          </div>

          {/* Avatar — absolute, sits on the banner bottom edge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-32px',
              left: '24px',
              width: '64px',
              height: '64px',
              borderRadius: '14px',
              border: '3px solid #161b27',
              background: 'linear-gradient(135deg, #4a4de7, #6172f3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
            }}
          >
            👩‍💻
          </div>

          {/* LinkedIn button — top-right of the banner area */}
          <div style={{ position: 'absolute', bottom: '-20px', right: '24px' }}>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[9px] bg-[#0a66c2] text-white text-xs font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(10,102,194,0.4)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Body content */}
        <div className="px-6 pb-6">
          <div className="font-extrabold text-xl tracking-tight mb-1">{PROFILE.name}</div>
          <div className="text-xs font-mono text-brand-light mb-3 min-h-[18px]">
            {role}<span className="opacity-70 animate-blink">|</span>
          </div>

          <p className="text-sm text-text-dim leading-relaxed mb-3">{PROFILE.bio}</p>

          <div className="flex gap-4 flex-wrap mb-4">
            <span className="flex items-center gap-1.5 text-xs text-text-dim">📍 {PROFILE.location}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {PROFILE.tags.map((tag) => (
              <span key={tag.label} className="text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: tag.bg, color: tag.color }}>
                {tag.label}
              </span>
            ))}
          </div>

          <div className="border-t border-border mb-5" />

          <div className="grid gap-6 md:grid-cols-2 mb-5">
            <div>
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Compétences techniques</div>
              {PROFILE.skills.map((skill) => <SkillBar key={skill.name} {...skill} />)}
            </div>
            <div>
              <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">Parcours & Expérience</div>
              {PROFILE.timeline.map((item, i) => (
                <TimelineItem key={i} item={item} isLast={i === PROFILE.timeline.length - 1} />
              ))}
            </div>
          </div>

          <div className="border-t border-border mb-5" />

          <div className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3">🚀 Projets</div>
          <div className="grid gap-2.5 mb-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {PROFILE.projects.map((p) => <ProjectCard key={p.title} project={p} />)}
          </div>

          <div className="border-t border-border mb-4" />

          <div className="flex items-center justify-between flex-wrap gap-3 bg-bg-muted border border-border rounded-card p-4">
            <div className="text-sm">
              <strong className="text-text">💬 Ouverte aux échanges</strong>
              <span className="text-text-dim ml-1.5">Envie de collaborer ou partager des ressources ?</span>
            </div>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[9px] bg-[#0a66c2] text-white text-xs font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5">
              Me contacter sur LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-7 mb-10 text-text-faint text-xs font-mono">
        Ce hub a été créé et est maintenu par <span className="text-brand">Zighed Imen</span> · ISIL-C 2025/2026
      </div>
    </div>
  )
}