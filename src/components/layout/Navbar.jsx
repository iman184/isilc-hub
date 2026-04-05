import useStore from '../../app/store'
import { Badge } from '../ui/Badge'

const NAV_TABS = [
  { id: 'resources', label: 'Ressources', icon: '📚' },
  { id: 'timetable', label: 'Emploi du temps', icon: '🗓️' },
  { id: 'calculator', label: 'Calculatrice', icon: '🧮' },
  { id: 'bookmarks', label: 'Favoris', icon: '🔖' },
  { id: 'profile', label: 'Profil', icon: '👤' },
]

export function Navbar() {
  const activeTab = useStore((s) => s.activeTab)
  const setActiveTab = useStore((s) => s.setActiveTab)
  const bookmarks = useStore((s) => s.bookmarks)

  return (
    <nav className="
      flex items-center gap-6 px-5 h-14
      bg-bg/90 border-b border-border
      sticky top-0 z-50 backdrop-blur-[16px]
      animate-fadeIn
    ">
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div
          className="
            w-[34px] h-[34px] rounded-[9px]
            flex items-center justify-center text-[17px]
            transition-transform duration-300
            hover:-rotate-[8deg] hover:scale-115
            cursor-default select-none
          "
          style={{ background: 'linear-gradient(135deg,#4a4de7,#8098f9)' }}
        >
          🎓
        </div>
        <div>
          <div className="font-bold text-[15px] tracking-tight">ISIL-C Hub</div>
          <div className="text-[10px] text-text-dim font-mono">2025/2026</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 overflow-x-auto scrollbar-thin">
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab.id
          const showBadge = tab.id === 'bookmarks' && bookmarks.length > 0

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-1.5 px-3.5 py-1.5 rounded-[9px]
                text-[13px] font-medium whitespace-nowrap flex-shrink-0
                transition-all duration-200
                ${isActive
                  ? 'bg-brand/15 text-brand'
                  : 'bg-transparent text-text-muted hover:bg-bg-muted hover:text-text hover:-translate-y-px'
                }
                active:scale-[0.96]
              `}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              {showBadge && <Badge>{bookmarks.length}</Badge>}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
