import { useState } from 'react'
import { useCsvExport } from '../../../shared/hooks/useCsvExport'
import { useNotification } from '../../../shared/hooks/useNotification'
import { useEventStore } from '../store/eventStore'
import type { EventInput, EventRecord } from '../types'
import { eventExportColumns } from '../utils/eventExport'
import type {
  DataPreviewState,
  EventEditorState,
  EventView,
} from '../workspace.types'

const emptyEvents: EventRecord[] = []

export function useEventWorkspace() {
  const events = useEventStore((state) => state.events)
  const timelineEvents = useEventStore((state) => state.timelineEvents)
  const statistics = useEventStore((state) => state.statistics)
  const saveEvent = useEventStore((state) => state.saveEvent)
  const [view, setView] = useState<EventView>('events')
  const [editor, setEditor] = useState<EventEditorState>({ mode: 'closed' })
  const [dataState, setDataState] = useState<DataPreviewState>('ready')
  const [showContext, setShowContext] = useState(true)
  const { notification, notify, dismiss } = useNotification()
  const exportAction = useCsvExport({
    records: events,
    columns: eventExportColumns,
    filename: 'fieldnote-events.csv',
    onSuccess: (count) => notify(`Exported ${count.toLocaleString()} events`),
    onError: () =>
      notify('Export could not be completed. Please try again.', 'error'),
  })

  function handleSave(input: EventInput, id?: string) {
    const event = saveEvent(input, id)
    setEditor({ mode: 'closed' })
    setDataState('ready')
    notify(`${id ? 'Changes saved' : 'Event created'}: ${event.title}`)
  }

  return {
    events: dataState === 'empty' ? emptyEvents : events,
    timelineEvents: dataState === 'empty' ? emptyEvents : timelineEvents,
    statistics,
    view,
    setView,
    editor,
    setEditor,
    dataState,
    setDataState,
    showContext,
    setShowContext,
    notification,
    dismiss,
    handleSave,
    ...exportAction,
  }
}
