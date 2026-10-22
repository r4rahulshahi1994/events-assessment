import type { GridColumn } from '../../../components/data-grid/types'
import type { EventRecord } from '../types'
import {
  EventDateCell,
  EventLocationCell,
  EventStatusBadge,
  EventTitleCell,
} from './EventCells'

export function createEventColumns(
  onEdit: (event: EventRecord) => void,
): GridColumn<EventRecord>[] {
  return [
    {
      id: 'title',
      label: 'Event name',
      accessor: (event) => event.title,
      cell: (event) => <EventTitleCell event={event} onEdit={onEdit} />,
    },
    {
      id: 'status',
      label: 'Status',
      accessor: (event) => event.status,
      cell: (event) => <EventStatusBadge status={event.status} />,
    },
    {
      id: 'date',
      label: 'Date & time',
      accessor: (event) => event.date,
      cell: (event) => <EventDateCell date={event.date} />,
    },
    {
      id: 'location',
      label: 'Location',
      accessor: (event) => event.location,
      cell: (event) => <EventLocationCell location={event.location} />,
    },
    {
      id: 'category',
      label: 'Category',
      accessor: (event) => event.category,
      hidden: true,
    },
    {
      id: 'owner',
      label: 'Assigned to',
      accessor: (event) => event.owner,
      hidden: true,
    },
  ]
}
