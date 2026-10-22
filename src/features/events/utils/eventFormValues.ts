import { localDateTime } from '../../../shared/utils/date'
import type { EventInput, EventRecord } from '../types'
import type { EventFormValues } from '../validation/eventSchema'

export function getEventFormValues(event?: EventRecord): EventFormValues {
  if (event) {
    const { title, date, category, status, location, owner, description } =
      event
    return {
      title,
      date: localDateTime(date),
      category,
      status,
      location,
      owner,
      description,
    }
  }

  return {
    title: '',
    date: '',
    category: 'Access control',
    status: 'Scheduled',
    location: '',
    owner: '',
    description: '',
  }
}

export function toEventInput(values: EventFormValues): EventInput {
  return { ...values, date: new Date(values.date).toISOString() }
}
