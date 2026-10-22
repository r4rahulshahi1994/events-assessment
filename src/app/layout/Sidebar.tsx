import { Check, Database, Workflow } from 'lucide-react'
import { Avatar } from '../../shared/components/Avatar'
import type { WorkspaceLayoutProps } from './types'

type SidebarProps<T extends string> = Omit<WorkspaceLayoutProps<T>, 'children'>

export function Sidebar<T extends string>({
  navigation,
  activeItem,
  onNavigate,
  user,
}: Readonly<SidebarProps<T>>) {
  return (
    <aside className="sidebar">
      <a
        href="#main-content"
        className="brand"
        aria-label="Fieldnote home"
        onClick={() => onNavigate(navigation[0].id)}
      >
        <span className="brand-mark">
          <Workflow size={23} />
        </span>
        Fieldnote<span className="brand-period">.</span>
      </a>
      <div className="workspace-label">WORKSPACE</div>
      <nav aria-label="Main navigation">
        {navigation.map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            className={`nav-item${activeItem === id ? ' selected' : ''}`}
            aria-current={activeItem === id ? 'page' : undefined}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} />
            {label}
            {count && <span className="nav-count">{count}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="local-indicator">
          <span />
          Local workspace
          <Database size={13} />
        </div>
        <div className="user-profile">
          <Avatar initials={user.initials} name={user.name} />
          <div>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
          <span className="profile-check">
            <Check size={14} />
          </span>
        </div>
      </div>
    </aside>
  )
}
