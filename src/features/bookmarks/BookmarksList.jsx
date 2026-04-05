import useStore from '../../app/store'
import { MODULES, RESOURCE_TYPES } from '../../data/modules'
import { EmptyState } from '../../components/common/EmptyState'

function BookmarkCard({ module }) {
  const toggleBookmark = useStore((s) => s.toggleBookmark)

  const availableLinks = RESOURCE_TYPES.filter((r) => module.links[r.key])

  return (
    <div
      data-anim
      className="bg-bg-card border border-border rounded-card p-4 relative overflow-hidden transition-all duration-200 hover:border-brand/35 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.2)]"
    >
      {/* Glow orb */}
      <div
        className="absolute top-0 right-0 w-[90px] h-[90px] rounded-full opacity-10 transition-opacity duration-300 hover:opacity-20 pointer-events-none"
        style={{ background: module.color }}
      />

      <div className="flex items-start gap-2.5 mb-2">
        <span className="text-2xl leading-none">{module.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm leading-snug">{module.name}</div>
          <div className="flex gap-1.5 mt-1">
            <span className="text-[10px] font-mono bg-brand-dark/12 text-brand-light px-1.5 py-0.5 rounded-[5px]">
              Coef {module.coef}
            </span>
            {module.tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-bg-muted text-text-dim px-1.5 py-0.5 rounded-[5px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => toggleBookmark(module.id)}
          title="Retirer des favoris"
          className="bg-red-500/10 text-red-500 p-1.5 rounded-[7px] flex items-center text-xs transition-all duration-150 hover:bg-red-500/25 hover:scale-[1.15] hover:rotate-[5deg]"
        >
          ✕
        </button>
      </div>

      <p className="text-xs text-text-dim mb-3 leading-relaxed">{module.desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {availableLinks.map((res) => (
          <a
            key={res.key}
            href={module.links[res.key]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-bg-muted border border-border rounded-[7px] font-medium transition-all duration-150 hover:-translate-y-0.5 hover:scale-[1.05] hover:border-brand/30"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: res.textColor }}
            />
            {res.label} ↗
          </a>
        ))}
      </div>
    </div>
  )
}

export function BookmarksList() {
  const bookmarks = useStore((s) => s.bookmarks)
  const bookmarkedModules = MODULES.filter((m) => bookmarks.includes(m.id))

  if (bookmarkedModules.length === 0) {
    return (
      <EmptyState
        emoji="🔖"
        title="Aucun favori pour l'instant"
        subtitle="Ajoute des modules depuis l'onglet Ressources pour les retrouver ici."
      />
    )
  }

  return (
    <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
      {bookmarkedModules.map((mod) => (
        <BookmarkCard key={mod.id} module={mod} />
      ))}
    </div>
  )
}
