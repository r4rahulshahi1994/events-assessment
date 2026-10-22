import { useRef } from 'react'
import type { KeyboardEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import '../styles/components.css'

export interface ViewTab<T extends string> {
  id: T
  label: string
  icon: LucideIcon
  count?: string
}

interface ViewTabsProps<T extends string> {
  tabs: readonly ViewTab<T>[]
  value: T
  onChange: (value: T) => void
  panelId: string
  label: string
}

export function ViewTabs<T extends string>({
  tabs,
  value,
  onChange,
  panelId,
  label,
}: Readonly<ViewTabsProps<T>>) {
  const refs = useRef(new Map<T, HTMLButtonElement>())

  function handleKeyDown(event: KeyboardEvent, index: number) {
    let target: number
    switch (event.key) {
      case 'ArrowRight':
        target = (index + 1) % tabs.length
        break
      case 'ArrowLeft':
        target = (index - 1 + tabs.length) % tabs.length
        break
      case 'Home':
        target = 0
        break
      case 'End':
        target = tabs.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    onChange(tabs[target].id)
    refs.current.get(tabs[target].id)?.focus()
  }

  return (
    <div className="view-tabs" role="tablist" aria-label={label}>
      {tabs.map(({ id, label: tabLabel, icon: Icon, count }, index) => (
        <button
          key={id}
          ref={(node) => {
            if (node) refs.current.set(id, node)
            else refs.current.delete(id)
          }}
          role="tab"
          id={`${panelId}-${id}-tab`}
          aria-selected={value === id}
          aria-controls={panelId}
          tabIndex={value === id ? 0 : -1}
          onClick={() => onChange(id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          <Icon size={16} />
          {tabLabel}
          {count && <span>{count}</span>}
        </button>
      ))}
    </div>
  )
}
