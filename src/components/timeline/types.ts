import type { ReactNode } from 'react'

export interface TimelineProps<T> {
  events: T[]
  getId: (event: T) => string
  getDate: (event: T) => string
  getTitle: (event: T) => string
  renderDetail?: (event: T) => ReactNode
  onSelect?: (event: T) => void
  label?: string
  emptyState?: ReactNode
  formatGroupLabel?: (date: string) => string
  formatTime?: (date: string) => string
  itemHeight?: number
  groupHeight?: number
  overscan?: number
}

export interface TimelineDayRow {
  kind: 'day'
  key: string
  date: string
}

export interface TimelineEventRow<T> {
  kind: 'event'
  key: string
  id: string
  event: T
  date: string
  group: number
  position: number
}

export type TimelineRow<T> = TimelineDayRow | TimelineEventRow<T>

export interface TimelineModel<T> {
  rows: TimelineRow<T>[]
  eventIndices: number[]
  groupIndices: number[][]
  indexById: Map<string, number>
}
