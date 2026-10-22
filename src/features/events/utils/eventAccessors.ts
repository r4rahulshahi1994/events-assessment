import type { EventRecord } from '../types'

export const getEventId = (event: EventRecord) => event.id
export const getEventDate = (event: EventRecord) => event.date
export const getEventTitle = (event: EventRecord) => event.title
