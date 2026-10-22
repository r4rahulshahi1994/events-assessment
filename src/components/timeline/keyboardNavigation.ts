import type { TimelineModel } from './types'

export function getTimelineTarget<T>(
  model: TimelineModel<T>,
  index: number,
  key: string,
  controlKey = false,
): number | undefined {
  const row = model.rows[index]
  if (row?.kind !== 'event') return undefined

  const { eventIndices, groupIndices } = model

  switch (key) {
    case 'ArrowDown':
      return eventIndices[Math.min(row.position + 1, eventIndices.length - 1)]
    case 'ArrowUp':
      return eventIndices[Math.max(row.position - 1, 0)]
    case 'ArrowRight':
      return groupIndices[Math.min(row.group + 1, groupIndices.length - 1)][0]
    case 'ArrowLeft':
      return groupIndices[Math.max(row.group - 1, 0)][0]
    case 'Home':
      return controlKey ? eventIndices[0] : groupIndices[row.group][0]
    case 'End':
      return controlKey ? eventIndices.at(-1) : groupIndices[row.group].at(-1)
    default:
      return undefined
  }
}
