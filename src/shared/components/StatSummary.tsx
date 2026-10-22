import type { LucideIcon } from 'lucide-react'
import '../styles/components.css'

export interface SummaryMetric {
  id: string
  label: string
  value: number
  note: string
  icon: LucideIcon
  indicatorClassName?: string
  showNoteIndicator?: boolean
}

interface StatSummaryProps {
  metrics: readonly SummaryMetric[]
  label: string
}

export function StatSummary({ metrics, label }: Readonly<StatSummaryProps>) {
  return (
    <section className="stats-band" aria-label={label}>
      {metrics.map(
        ({
          id,
          label: metricLabel,
          value,
          note,
          icon: Icon,
          indicatorClassName,
          showNoteIndicator,
        }) => (
          <div className="stat" key={id}>
            <span className="stat-label">
              {metricLabel}
              <Icon size={16} />
            </span>
            <div>
              <strong>{value.toLocaleString()}</strong>
              <span className="stat-note">
                {showNoteIndicator && <span className="tiny-dot" />}
                {note}
              </span>
            </div>
            <div className={`stat-baseline ${indicatorClassName ?? ''}`} />
          </div>
        ),
      )}
    </section>
  )
}
