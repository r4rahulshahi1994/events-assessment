import type { ReactNode } from 'react'
import '../styles/components.css'

interface PageHeaderProps {
  title: string
  eyebrow?: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({
  title,
  eyebrow,
  description,
  actions,
}: Readonly<PageHeaderProps>) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>
          {title}
          <span className="heading-dot" />
        </h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="heading-actions">{actions}</div>}
    </div>
  )
}
