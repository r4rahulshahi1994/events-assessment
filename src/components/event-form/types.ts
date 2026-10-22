import type { EventInput, EventRecord } from '../../features/events/types'

export interface EventFormProps {
  event?: EventRecord
  onSave: (event: EventInput, id?: string) => void | Promise<void>
  onCancel: () => void
}
