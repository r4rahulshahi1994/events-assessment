import type { ReactNode } from 'react'

export interface GridColumn<T> {
  id: string
  label: string
  accessor: (row: T) => string | number
  cell?: (row: T) => ReactNode
  hidden?: boolean
}

export interface DataGridProps<T> {
  data: T[]
  columns: GridColumn<T>[]
  getRowId: (row: T) => string
  loading?: boolean
  error?: string
  onRetry?: () => void
  label?: string
  itemLabel?: string
  initialPageSize?: number
  pageSizeOptions?: readonly number[]
  searchPlaceholder?: string
}
