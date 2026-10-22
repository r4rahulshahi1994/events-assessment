import type { KeyboardEvent } from 'react'
import type { TimelineEventRow, TimelineProps } from './types'

interface TimelineItemProps<T> extends Pick<
  TimelineProps<T>,
  'getTitle' | 'renderDetail' | 'onSelect'
> {
  row: TimelineEventRow<T>
  active: boolean
  formatGroupLabel: (date: string) => string
  formatTime: (date: string) => string
  registerItem: (id: string, node: HTMLButtonElement | null) => void
  onKeyDown: (event: KeyboardEvent) => void
  onFocus: () => void
}

export function TimelineItem<T>({
  row,
  active,
  getTitle,
  renderDetail,
  onSelect,
  formatGroupLabel,
  formatTime,
  registerItem,
  onKeyDown,
  onFocus,
}: Readonly<TimelineItemProps<T>>) {
  return (
    <>
      <span className="timeline-dot" />
      <button
        ref={(node) => registerItem(row.id, node)}
        className="timeline-event"
        tabIndex={active ? 0 : -1}
        aria-label={`${getTitle(row.event)}, ${formatGroupLabel(row.date)}, ${formatTime(row.date)}`}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onClick={() => onSelect?.(row.event)}
      >
        <span className="timeline-time">{formatTime(row.date)}</span>
        <strong>{getTitle(row.event)}</strong>
        {renderDetail && (
          <span className="timeline-detail">{renderDetail(row.event)}</span>
        )}
      </button>
    </>
  )
}
