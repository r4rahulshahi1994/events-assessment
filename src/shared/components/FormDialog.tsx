import { useId } from 'react'
import type { ReactNode } from 'react'
import { Dialog, DialogTitle, IconButton } from '@mui/material'
import { X } from 'lucide-react'
import '../styles/components.css'

interface FormDialogProps {
  open: boolean
  title: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
  onClose: () => void
}

export function FormDialog({
  open,
  title,
  subtitle,
  icon,
  children,
  onClose,
}: Readonly<FormDialogProps>) {
  const titleId = useId()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby={titleId}
    >
      <DialogTitle id={titleId} className="form-heading">
        {icon && <span className="form-icon">{icon}</span>}
        <span>
          {title}
          {subtitle && <small>{subtitle}</small>}
        </span>
        <IconButton aria-label="Close form" onClick={onClose}>
          <X size={20} />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  )
}
