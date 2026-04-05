import { TimetableGrid } from '../features/timetable/TimetableGrid'
import { PageHeader } from '../components/common/PageHeader'

export function TimetablePage() {
  return (
    <section className="max-w-[1100px] mx-auto px-5 py-7">
      <PageHeader
        title="Emploi du temps"
        subtitle="Semestre 2 · ISIL-C 2025/2026 — Sélectionne ton groupe"
      />
      <TimetableGrid />
    </section>
  )
}
