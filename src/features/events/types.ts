import type { eventCategories, eventStatuses } from './constants'

export type EventStatus = (typeof eventStatuses)[number]
export type EventCategory = (typeof eventCategories)[number]

export interface EventRecord {
  id: string
  title: string
  date: string
  category: EventCategory
  status: EventStatus
  location: string
  owner: string
  description: string
}

export type EventInput = Omit<EventRecord, 'id'>

export interface EventStatistics {
  total: number
  scheduled: number
  progress: number
  completed: number
}

export interface EventStore {
  events: EventRecord[]
  timelineEvents: EventRecord[]
  statistics: EventStatistics
  saveEvent: (input: EventInput, id?: string) => EventRecord
}
