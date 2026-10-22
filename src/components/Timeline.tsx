import { CalendarDays } from 'lucide-react'
import { CollectionState } from '../shared/components/CollectionState'
import { dayLabel, timeLabel } from '../shared/utils/date'
import { TimelineItem } from './timeline/TimelineItem'
import { useTimeline } from './timeline/useTimeline'
import type { TimelineProps } from './timeline/types'
import './timeline/timeline.css'

export type { TimelineProps } from './timeline/types'

export function Timeline<T>({
  label = 'Event timeline',
  formatGroupLabel = dayLabel,
  formatTime = timeLabel,
  emptyState,
  ...props
}: Readonly<TimelineProps<T>>) {
  const {
    scrollRef,
    virtualizer,
    model,
    selectedId,
    announcement,
    registerItem,
    moveFocus,
    announceFocus,
  } = useTimeline({ ...props, formatGroupLabel, formatTime })

  return (
    <section className="timeline" aria-label={label}>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </div>
      {!props.events.length ? (
        (emptyState ?? (
          <CollectionState
            className="timeline-empty"
            title="No events scheduled"
            description="New events will appear here."
            icon={<CalendarDays size={28} />}
          />
        ))
      ) : (
        <div className="timeline-scroll" ref={scrollRef}>
          <div
            role="list"
            aria-label={label}
            style={{ height: virtualizer.getTotalSize(), position: 'relative' }}
          >
            {virtualizer.getVirtualItems().map((item) => {
              const row = model.rows[item.index]
              return (
                <div
                  key={row.key}
                  className={
                    row.kind === 'day' ? 'timeline-day' : 'timeline-item'
                  }
                  role={row.kind === 'event' ? 'listitem' : 'presentation'}
                  aria-setsize={
                    row.kind === 'event' ? props.events.length : undefined
                  }
                  aria-posinset={
                    row.kind === 'event' ? row.position + 1 : undefined
                  }
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: item.size,
                    transform: `translateY(${item.start}px)`,
                  }}
                >
                  {row.kind === 'day' ? (
                    <h3>{formatGroupLabel(row.date)}</h3>
                  ) : (
                    <TimelineItem
                      row={row}
                      active={row.id === selectedId}
                      getTitle={props.getTitle}
                      renderDetail={props.renderDetail}
                      onSelect={props.onSelect}
                      formatGroupLabel={formatGroupLabel}
                      formatTime={formatTime}
                      registerItem={registerItem}
                      onKeyDown={(event) => moveFocus(event, item.index)}
                      onFocus={() => announceFocus(row)}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </section>
  )
}
