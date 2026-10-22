import type { EventRecord, EventStatistics } from '../types'

export function getEventStatistics(
  events: readonly EventRecord[],
): EventStatistics {
  const statistics: EventStatistics = {
    total: events.length,
    scheduled: 0,
    progress: 0,
    completed: 0,
  }

  for (const event of events) {
    if (event.status === 'Scheduled') statistics.scheduled += 1
    if (event.status === 'In progress') statistics.progress += 1
    if (event.status === 'Completed') statistics.completed += 1
  }

  return statistics
}
