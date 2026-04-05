import { GradeCalculator } from '../features/calculator/GradeCalculator'
import { PageHeader } from '../components/common/PageHeader'

export function CalculatorPage() {
  return (
    <section className="max-w-[1100px] mx-auto px-5 py-7">
      <PageHeader
        title="Calculatrice de moyenne"
        subtitle="Saisis tes notes TD et examen. La moyenne est calculée automatiquement (TD × 0.4 + Exam × 0.6)."
      />
      <GradeCalculator />
    </section>
  )
}
