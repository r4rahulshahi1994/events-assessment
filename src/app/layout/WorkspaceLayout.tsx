import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import type { WorkspaceLayoutProps } from './types'
import './layout.css'

export function WorkspaceLayout<T extends string>({
  navigation,
  activeItem,
  onNavigate,
  user,
  children,
}: Readonly<WorkspaceLayoutProps<T>>) {
  const title = navigation.find((item) => item.id === activeItem)?.label ?? ''

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="app-shell">
        <Sidebar
          navigation={navigation}
          activeItem={activeItem}
          onNavigate={onNavigate}
          user={user}
        />
        <div className="workspace">
          <Topbar title={title} user={user} />
          <main id="main-content">{children}</main>
        </div>
      </div>
    </>
  )
}
