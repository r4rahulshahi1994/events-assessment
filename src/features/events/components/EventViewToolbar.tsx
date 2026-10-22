import { IconButton, MenuItem, Select, Tooltip } from '@mui/material'
import { LayoutList, Workflow } from 'lucide-react'
import { ViewTabs } from '../../../shared/components/ViewTabs'
import type { DataPreviewState, EventView } from '../workspace.types'

interface EventViewToolbarProps {
  view: EventView
  onViewChange: (view: EventView) => void
  total: number
  dataState: DataPreviewState
  onDataStateChange: (state: DataPreviewState) => void
  showContext: boolean
  onToggleContext: () => void
}

const previewOptions: { value: DataPreviewState; label: string }[] = [
  { value: 'ready', label: 'Live data' },
  { value: 'loading', label: 'Loading' },
  { value: 'empty', label: 'Empty' },
  { value: 'error', label: 'Error' },
]

export function EventViewToolbar({
  view,
  onViewChange,
  total,
  dataState,
  onDataStateChange,
  showContext,
  onToggleContext,
}: Readonly<EventViewToolbarProps>) {
  const contextLabel = showContext
    ? 'Hide timeline panel'
    : 'Show timeline panel'

  return (
    <div className="section-toolbar">
      <ViewTabs<EventView>
        value={view}
        onChange={onViewChange}
        panelId="event-view"
        label="Event view"
        tabs={[
          {
            id: 'events',
            label: 'All events',
            icon: LayoutList,
            count: total.toLocaleString(),
          },
          { id: 'timeline', label: 'Timeline', icon: Workflow },
        ]}
      />
      <div className="section-settings">
        <label htmlFor="data-state">Data preview</label>
        <Select
          id="data-state"
          value={dataState}
          size="small"
          onChange={(event) => {
            const option = previewOptions.find(
              (item) => item.value === event.target.value,
            )
            if (option) onDataStateChange(option.value)
          }}
          inputProps={{ 'aria-label': 'Data preview state' }}
        >
          {previewOptions.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {view === 'events' && (
          <Tooltip title={contextLabel}>
            <IconButton
              size="small"
              aria-label={contextLabel}
              onClick={onToggleContext}
            >
              <Workflow size={17} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  )
}
