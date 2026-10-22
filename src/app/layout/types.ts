import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface NavigationItem<T extends string> {
  id: T
  label: string
  icon: LucideIcon
  count?: string
}

export interface WorkspaceUser {
  name: string
  role: string
  initials: string
}

export interface WorkspaceLayoutProps<T extends string> {
  navigation: readonly NavigationItem<T>[]
  activeItem: T
  onNavigate: (item: T) => void
  user: WorkspaceUser
  children: ReactNode
}
