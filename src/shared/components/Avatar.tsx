import { Tooltip } from '@mui/material'
import '../styles/components.css'

interface AvatarProps {
  initials: string
  name: string
  small?: boolean
}

export function Avatar({ initials, name, small }: Readonly<AvatarProps>) {
  return (
    <Tooltip title={name}>
      <span
        className={`avatar${small ? ' small-avatar' : ''}`}
        aria-label={name}
      >
        {initials}
      </span>
    </Tooltip>
  )
}
