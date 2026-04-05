import { MODULES } from '../data/modules'

/**
 * Compute the weighted module average from td + exam grades.
 * Module average = (td * 0.4) + (exam * 0.6), capped to [0, 20].
 */
export function computeModuleAverage(td, exam) {
  const tdVal = parseFloat(td)
  const examVal = parseFloat(exam)
  const hasTd = !isNaN(tdVal)
  const hasExam = !isNaN(examVal)

  if (!hasTd && !hasExam) return null
  if (hasTd && !hasExam) return tdVal * 0.4
  if (!hasTd && hasExam) return examVal * 0.6
  return tdVal * 0.4 + examVal * 0.6
}

/**
 * Compute the overall semester average from grades state.
 * Returns { average, mention, filledCount } | null if no grades.
 */
export function computeSemesterAverage(grades) {
  let totalWeight = 0
  let weightedSum = 0
  let filledCount = 0

  for (const mod of MODULES) {
    const g = grades[mod.id]
    const avg = g ? computeModuleAverage(g.td, g.exam) : null
    if (avg !== null) {
      weightedSum += avg * mod.coef
      totalWeight += mod.coef
      filledCount++
    }
  }

  if (filledCount === 0) return null

  const average = weightedSum / totalWeight
  return { average, mention: getMention(average), filledCount }
}

export function getMention(avg) {
  if (avg >= 16) return { label: 'Très Bien', color: '#10b981' }
  if (avg >= 14) return { label: 'Bien', color: '#06b6d4' }
  if (avg >= 12) return { label: 'Assez Bien', color: '#6172f3' }
  if (avg >= 10) return { label: 'Passable', color: '#f59e0b' }
  return { label: 'Insuffisant', color: '#ef4444' }
}

export function gradeStatus(value) {
  const v = parseFloat(value)
  if (isNaN(v)) return ''
  return v >= 10 ? 'pass' : 'fail'
}
