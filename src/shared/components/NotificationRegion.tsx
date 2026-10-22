import { Alert, IconButton, Snackbar } from '@mui/material'
import { X } from 'lucide-react'
import type { Notification } from '../hooks/useNotification'

interface NotificationRegionProps {
  notification: Notification | null
  onDismiss: () => void
}

export function NotificationRegion({
  notification,
  onDismiss,
}: Readonly<NotificationRegionProps>) {
  return (
    <>
      <div
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {notification?.message}
      </div>
      <Snackbar
        key={notification?.id}
        open={Boolean(notification)}
        autoHideDuration={6000}
        onClose={onDismiss}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          role="presentation"
          severity={notification?.severity}
          action={
            <IconButton
              size="small"
              aria-label="Dismiss notification"
              onClick={onDismiss}
            >
              <X size={16} />
            </IconButton>
          }
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </>
  )
}
