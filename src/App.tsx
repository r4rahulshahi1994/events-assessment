import { AppProviders } from './app/AppProviders'
import { EventWorkspace } from './features/events/EventWorkspace'

export default function App() {
  return (
    <AppProviders>
      <EventWorkspace />
    </AppProviders>
  )
}
