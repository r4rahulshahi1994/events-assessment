import { useMemo } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { ArrowUpRight, CalendarDays, ChevronDown } from 'lucide-react'
import { Timeline } from '../../../components/Timeline'
import { dateLabel } from '../../../shared/utils/date'
import type { EventRecord } from '../types'
import {
  getEventDate,
  getEventId,
  getEventTitle,
} from '../utils/eventAccessors'
import { EventTimelineDetail } from './EventCells'

interface EventTimelinePanelProps {
  events: EventRecord[]
  expanded: boolean
  onSelect: (event: EventRecord) => void
  onExpand: () => void
}

const renderDetail = (event: EventRecord) => (
  <EventTimelineDetail event={event} />
)

export function EventTimelinePanel({
  events,
  expanded,
  onSelect,
  onExpand,
}: Readonly<EventTimelinePanelProps>) {
  const latestDate = useMemo(
    () =>
      events.reduce<string | null>(
        (latest, event) =>
          !latest || event.date > latest ? event.date : latest,
        null,
      ),
    [events],
  )

  return (
    <aside className="timeline-panel">
      <div className="timeline-panel-heading">
        <div>
          <span className="panel-eyebrow">THE BIG PICTURE</span>
          <h2>{expanded ? 'Event timeline' : 'Activity timeline'}</h2>
        </div>
        {!expanded && (
          <Tooltip title="Open full timeline">
            <IconButton
              size="small"
              aria-label="Open full timeline"
              onClick={onExpand}
            >
              <ArrowUpRight size={19} />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div className="timeline-meta">
        <span>
          <span className="tiny-dot" />
          {events.length.toLocaleString()} events
        </span>
        <span>
          Grouped by day
          <ChevronDown size={12} />
        </span>
      </div>
      <Timeline
        events={events}
        getId={getEventId}
        getDate={getEventDate}
        getTitle={getEventTitle}
        renderDetail={renderDetail}
        onSelect={onSelect}
      />
      <div className="timeline-footer">
        <CalendarDays size={14} />
        <span>
          {latestDate
            ? `Latest activity · ${dateLabel(latestDate)}`
            : 'No activity'}
        </span>
        <span className="live-dot" />
      </div>
    </aside>
  )
}
