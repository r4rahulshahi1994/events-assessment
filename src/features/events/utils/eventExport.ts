import type { CsvColumn } from '../../../shared/utils/csv'
import type { EventRecord } from '../types'

export const eventExportColumns: readonly CsvColumn<EventRecord>[] = [
  { label: 'ID', accessor: (event) => event.id },
  { label: 'Title', accessor: (event) => event.title },
  { label: 'Status', accessor: (event) => event.status },
  { label: 'Date', accessor: (event) => event.date },
  { label: 'Category', accessor: (event) => event.category },
  { label: 'Location', accessor: (event) => event.location },
  { label: 'Owner', accessor: (event) => event.owner },
]
