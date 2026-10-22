import { ChevronRight } from 'lucide-react'
import { Avatar } from '../../shared/components/Avatar'
import type { WorkspaceUser } from './types'

interface TopbarProps {
  title: string
  user: WorkspaceUser
}

export function Topbar({ title, user }: Readonly<TopbarProps>) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>Workspace</span>
        <ChevronRight size={13} />
        <strong>{title}</strong>
      </div>
      <div className="topbar-right">
        <span className="demo-indicator">
          <span />
          Demo workspace
        </span>
        <Avatar initials={user.initials} name={user.name} small />
      </div>
    </header>
  )
}
