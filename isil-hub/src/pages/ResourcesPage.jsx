import { useEffect } from 'react'
import useStore from '../app/store'
import { MODULES } from '../data/modules'
import { HeroSection } from '../features/resources/HeroSection'
import { AnnouncementBanner } from '../features/resources/AnnouncementBanner'
import { ModuleCard } from '../features/resources/ModuleCard'
import { PageHeader } from '../components/common/PageHeader'
import { EmptyState } from '../components/common/EmptyState'
import { SearchInput } from '../components/ui/SearchInput'
import { FilterGroup } from '../components/ui/FilterGroup'
import { useStaggerAnimation } from '../hooks/useStaggerAnimation'

const FILTER_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: '3', label: 'Coef 3' },
  { value: '2', label: 'Coef 2' },
  { value: '1', label: 'Coef 1' },
]

export function ResourcesPage() {
  const search = useStore((s) => s.resourceSearch)
  const filter = useStore((s) => s.resourceFilter)
  const setSearch = useStore((s) => s.setResourceSearch)
  const setFilter = useStore((s) => s.setResourceFilter)
  const gridRef = useStaggerAnimation('[data-anim]', 70)

  const filtered = MODULES.filter((m) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q || m.name.toLowerCase().includes(q) || m.tags.some((t) => t.toLowerCase().includes(q))
    const matchFilter = filter === 'all' || m.coef === parseInt(filter, 10)
    return matchSearch && matchFilter
  })

  useEffect(() => {
    // Re-trigger stagger when filter/search changes
  }, [search, filter])

  return (
    <div>
      <HeroSection />
      <AnnouncementBanner />

      <section className="max-w-[1100px] mx-auto px-5 py-7">
        <PageHeader
          title="Ressources"
          subtitle={`${filtered.length} module${filtered.length !== 1 ? 's' : ''} disponible${filtered.length !== 1 ? 's' : ''}`}
          actions={
            <>
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Rechercher un module..."
              />
              <FilterGroup
                options={FILTER_OPTIONS}
                active={filter}
                onChange={setFilter}
              />
            </>
          }
        />

        {filtered.length === 0 ? (
          <EmptyState
            emoji="🔍"
            title="Aucun résultat"
            subtitle="Essaie un autre mot-clé ou filtre."
          />
        ) : (
          <div
            ref={gridRef}
            className="grid gap-3.5"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
          >
            {filtered.map((mod) => (
              <ModuleCard key={mod.id} module={mod} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
