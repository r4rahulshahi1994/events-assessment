import { CalendarDays, CheckCheck, Clock3, Radio } from 'lucide-react'
import { StatSummary } from '../../../shared/components/StatSummary'
import type { EventStatistics } from '../types'

export function EventStats({
  statistics,
}: Readonly<{ statistics: EventStatistics }>) {
  return (
    <StatSummary
      label="Event overview"
      metrics={[
        {
          id: 'total',
          label: 'Total events',
          value: statistics.total,
          note: 'All time',
          icon: CalendarDays,
          indicatorClassName: 'total-baseline',
          showNoteIndicator: true,
        },
        {
          id: 'scheduled',
          label: 'Scheduled',
          value: statistics.scheduled,
          note: 'Upcoming',
          icon: Clock3,
          indicatorClassName: 'scheduled-baseline',
        },
        {
          id: 'progress',
          label: 'In progress',
          value: statistics.progress,
          note: 'In motion',
          icon: Radio,
          indicatorClassName: 'progress-baseline',
        },
        {
          id: 'completed',
          label: 'Completed',
          value: statistics.completed,
          note: 'Resolved',
          icon: CheckCheck,
          indicatorClassName: 'completed-baseline',
        },
      ]}
    />
  )
}
