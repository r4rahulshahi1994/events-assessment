import { useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual'
import { dayLabel, timeLabel } from '../../shared/utils/date'
import { groupEventsByDay } from './groupEventsByDay'
import { getTimelineTarget } from './keyboardNavigation'
import type { TimelineEventRow, TimelineProps } from './types'

export function useTimeline<T>({
  events,
  getId,
  getDate,
  getTitle,
  formatGroupLabel = dayLabel,
  formatTime = timeLabel,
  itemHeight = 106,
  groupHeight = 54,
  overscan = 6,
}: TimelineProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>())
  const pendingFocus = useRef<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const model = useMemo(
    () => groupEventsByDay(events, getId, getDate),
    [events, getId, getDate],
  )
  const activeIndex =
    activeId === null ? undefined : model.indexById.get(activeId)
  const selectedIndex = activeIndex ?? model.eventIndices[0]
  const selectedRow = model.rows[selectedIndex]
  const selectedId = selectedRow?.kind === 'event' ? selectedRow.id : null

  const virtualizer = useVirtualizer({
    count: model.rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) =>
      model.rows[index].kind === 'day' ? groupHeight : itemHeight,
    getItemKey: (index) => model.rows[index].key,
    overscan,
    rangeExtractor: (range) => {
      const indices = defaultRangeExtractor(range)
      return selectedIndex === undefined
        ? indices
        : [...new Set([...indices, selectedIndex])].sort(
            (first, second) => first - second,
          )
    },
  })

  function registerItem(id: string, node: HTMLButtonElement | null) {
    if (!node) {
      buttonRefs.current.delete(id)
      return
    }

    buttonRefs.current.set(id, node)
    if (pendingFocus.current === id) {
      node.focus({ preventScroll: true })
      pendingFocus.current = null
    }
  }

  function moveFocus(event: KeyboardEvent, index: number) {
    const target = getTimelineTarget(
      model,
      index,
      event.key,
      event.ctrlKey || event.metaKey,
    )
    if (target === undefined) return

    event.preventDefault()
    const row = model.rows[target]
    if (row.kind !== 'event') return

    setActiveId(row.id)
    pendingFocus.current = row.id
    virtualizer.scrollToIndex(target, { align: 'auto' })
    const button = buttonRefs.current.get(row.id)
    if (button) {
      button.focus({ preventScroll: true })
      pendingFocus.current = null
    }
  }

  function announceFocus(row: TimelineEventRow<T>) {
    setActiveId(row.id)
    setAnnouncement(
      `${formatGroupLabel(row.date)}. ${getTitle(row.event)}, ${formatTime(row.date)}. Event ${row.position + 1} of ${events.length}.`,
    )
  }

  return {
    scrollRef,
    virtualizer,
    model,
    selectedId,
    announcement,
    registerItem,
    moveFocus,
    announceFocus,
  }
}
