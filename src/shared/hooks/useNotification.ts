import { useState } from 'react'
import type { AlertColor } from '@mui/material'

export interface Notification {
  message: string
  severity: AlertColor
  id: number
}

export function useNotification() {
  const [notification, setNotification] = useState<Notification | null>(null)

  function notify(message: string, severity: AlertColor = 'success') {
    setNotification({ message, severity, id: Date.now() })
  }

  return { notification, notify, dismiss: () => setNotification(null) }
}
