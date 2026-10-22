import { useMemo } from 'react'
import { Button } from '@mui/material'
import { Download, LayoutList, Plus, Workflow } from 'lucide-react'
import { WorkspaceFooter } from '../../app/layout/WorkspaceFooter'
import { WorkspaceLayout } from '../../app/layout/WorkspaceLayout'
import { DataGrid, EventFormDialog } from '../../components'
import { NotificationRegion } from '../../shared/components/NotificationRegion'
import { PageHeader } from '../../shared/components/PageHeader'
import { EventStats } from './components/EventStats'
import { EventTimelinePanel } from './components/EventTimelinePanel'
import { EventViewToolbar } from './components/EventViewToolbar'
import { createEventColumns } from './components/eventColumns'
import { useEventWorkspace } from './hooks/useEventWorkspace'
import { getEventId } from './utils/eventAccessors'
import type { EventView } from './workspace.types'
import './events.css'

const demoUser = {
  name: 'Rahul Shahi',
  role: 'Workspace admin',
  initials: 'RS',
}

export function EventWorkspace() {
  const {
    events,
    timelineEvents,
    statistics,
    view,
    setView,
    editor,
    setEditor,
    dataState,
    setDataState,
    showContext,
    setShowContext,
    notification,
    dismiss,
    handleSave,
    exporting,
    exportCsv,
  } = useEventWorkspace()
  const columns = useMemo(
    () => createEventColumns((event) => setEditor({ mode: 'edit', event })),
    [setEditor],
  )
  const expandedTimeline = view === 'timeline'

  return (
    <>
      <WorkspaceLayout<EventView>
        activeItem={view}
        onNavigate={setView}
        user={demoUser}
        navigation={[
          {
            id: 'events',
            label: 'Events',
            icon: LayoutList,
            count: statistics.total.toLocaleString('en-US', {
              notation: 'compact',
            }),
          },
          { id: 'timeline', label: 'Timeline', icon: Workflow },
        ]}
      >
        <PageHeader
          title={expandedTimeline ? 'Event timeline' : 'Events'}
          eyebrow="YOUR OPERATIONS, IN FOCUS"
          description="A clear view of what’s happening, and what’s next."
          actions={
            <>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<Download size={16} />}
                onClick={exportCsv}
                disabled={exporting}
              >
                {exporting ? 'Exporting...' : 'Export'}
              </Button>
              <Button
                variant="contained"
                startIcon={<Plus size={18} />}
                onClick={() => setEditor({ mode: 'create' })}
              >
                New event
              </Button>
            </>
          }
        />
        <EventStats statistics={statistics} />
        <EventViewToolbar
          view={view}
          onViewChange={setView}
          total={statistics.total}
          dataState={dataState}
          onDataStateChange={setDataState}
          showContext={showContext}
          onToggleContext={() => setShowContext(!showContext)}
        />
        <div
          id="event-view"
          role="tabpanel"
          aria-labelledby={`event-view-${view}-tab`}
          className={`content-layout${expandedTimeline ? ' timeline-view' : ''}${!showContext ? ' no-context' : ''}`}
        >
          {!expandedTimeline && (
            <DataGrid
              data={events}
              columns={columns}
              getRowId={getEventId}
              loading={dataState === 'loading'}
              error={
                dataState === 'error'
                  ? 'The mock connection was interrupted.'
                  : undefined
              }
              onRetry={() => setDataState('ready')}
            />
          )}
          {(showContext || expandedTimeline) && (
            <EventTimelinePanel
              events={timelineEvents}
              expanded={expandedTimeline}
              onSelect={(event) => setEditor({ mode: 'edit', event })}
              onExpand={() => setView('timeline')}
            />
          )}
        </div>
        <WorkspaceFooter />
      </WorkspaceLayout>
      {editor.mode !== 'closed' && (
        <EventFormDialog
          key={editor.mode === 'edit' ? editor.event.id : 'new'}
          event={editor.mode === 'edit' ? editor.event : undefined}
          onSave={handleSave}
          onCancel={() => setEditor({ mode: 'closed' })}
        />
      )}
      <NotificationRegion notification={notification} onDismiss={dismiss} />
    </>
  )
}
