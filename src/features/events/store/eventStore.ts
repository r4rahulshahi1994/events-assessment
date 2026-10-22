import { create } from 'zustand'
import { MOCK_GRID_SIZE, MOCK_TIMELINE_SIZE } from '../constants'
import { createMockEvents } from '../data/mockEvents'
import type { EventRecord, EventStore } from '../types'
import { getEventStatistics } from '../utils/eventStatistics'

function upsertEvent(events: EventRecord[], event: EventRecord): EventRecord[] {
  const index = events.findIndex((item) => item.id === event.id)
  if (index === -1) return [event, ...events]

  const updated = events.slice()
  updated[index] = event
  return updated
}

export function createEventStore(
  initialEvents: EventRecord[],
  timelineSize = MOCK_TIMELINE_SIZE,
) {
  return create<EventStore>((set) => ({
    events: initialEvents,
    timelineEvents: initialEvents.slice(0, timelineSize),
    statistics: getEventStatistics(initialEvents),
    saveEvent: (input, id) => {
      const event: EventRecord = {
        ...input,
        id: id ?? `EVT-${crypto.randomUUID().toUpperCase()}`,
      }

      set((state) => {
        const events = upsertEvent(state.events, event)
        return {
          events,
          timelineEvents: upsertEvent(state.timelineEvents, event),
          statistics: getEventStatistics(events),
        }
      })

      return event
    },
  }))
}

export const useEventStore = createEventStore(createMockEvents(MOCK_GRID_SIZE))
