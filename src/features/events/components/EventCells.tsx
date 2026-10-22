import {
  Activity,
  ArrowDownLeft,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { dateLabel, timeLabel } from '../../../shared/utils/date'
import { toCssToken } from '../../../shared/utils/string'
import type { EventCategory, EventRecord, EventStatus } from '../types'

const categoryIcons: Record<EventCategory, LucideIcon> = {
  'Access control': ArrowDownLeft,
  Maintenance: SlidersHorizontal,
  System: Activity,
  Security: ShieldCheck,
}

interface EventTitleCellProps {
  event: EventRecord
  onEdit: (event: EventRecord) => void
}

export function EventTitleCell({
  event,
  onEdit,
}: Readonly<EventTitleCellProps>) {
  const Icon = categoryIcons[event.category]

  return (
    <button className="event-title" onClick={() => onEdit(event)}>
      <span className={`event-symbol category-${toCssToken(event.category)}`}>
        <Icon size={16} />
      </span>
      <span>
        <strong>{event.title}</strong>
        <small>{event.id}</small>
      </span>
    </button>
  )
}

export function EventStatusBadge({
  status,
}: Readonly<{ status: EventStatus }>) {
  return (
    <span className={`status-badge ${toCssToken(status)}`}>
      <span />
      {status}
    </span>
  )
}

export function EventDateCell({ date }: Readonly<{ date: string }>) {
  return (
    <span className="date-cell">
      {dateLabel(date)}
      <small>{timeLabel(date)}</small>
    </span>
  )
}

export function EventLocationCell({
  location,
}: Readonly<{ location: string }>) {
  return (
    <span className="location-cell">
      <MapPin size={13} />
      {location || 'Not assigned'}
    </span>
  )
}

export function EventTimelineDetail({
  event,
}: Readonly<{ event: EventRecord }>) {
  return (
    <>
      <span>{event.category}</span>
      <span className={`status-dot ${toCssToken(event.status)}`} />
    </>
  )
}
