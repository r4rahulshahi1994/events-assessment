import { localDay } from '../../shared/utils/date'
import type { TimelineModel } from './types'

export function groupEventsByDay<T>(
  events: readonly T[],
  getId: (event: T) => string,
  getDate: (event: T) => string,
): TimelineModel<T> {
  const sorted = events
    .map((event) => {
      const date = getDate(event)
      return {
        event,
        date,
        day: localDay(date),
        timestamp: new Date(date).getTime(),
      }
    })
    .sort(
      (first, second) =>
        second.day.localeCompare(first.day) ||
        first.timestamp - second.timestamp,
    )

  const model: TimelineModel<T> = {
    rows: [],
    eventIndices: [],
    groupIndices: [],
    indexById: new Map(),
  }
  let previousDay = ''

  for (const { event, date, day } of sorted) {
    if (day !== previousDay) {
      model.rows.push({ kind: 'day', key: `day:${day}`, date })
      model.groupIndices.push([])
      previousDay = day
    }

    const id = getId(event)
    const index = model.rows.length
    const group = model.groupIndices.length - 1
    const position = model.eventIndices.length

    model.indexById.set(id, index)
    model.groupIndices[group].push(index)
    model.eventIndices.push(index)
    model.rows.push({
      kind: 'event',
      key: `event:${id}`,
      id,
      event,
      date,
      group,
      position,
    })
  }

  return model
}
