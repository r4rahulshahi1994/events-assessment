import type { EventRecord } from './types'

export type EventView = 'events' | 'timeline'
export type DataPreviewState = 'ready' | 'loading' | 'empty' | 'error'

export type EventEditorState =
  { mode: 'closed' } | { mode: 'create' } | { mode: 'edit'; event: EventRecord }
