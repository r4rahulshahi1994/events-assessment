import type { ReactNode } from 'react'
import { CircularProgress } from '@mui/material'

interface CollectionStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  loading?: boolean
  error?: boolean
  className?: string
}

export function CollectionState({
  title,
  description,
  icon,
  action,
  loading,
  error,
  className,
}: Readonly<CollectionStateProps>) {
  return (
    <div className={className} role={error ? 'alert' : 'status'}>
      {loading ? <CircularProgress size={26} /> : icon}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  )
}
