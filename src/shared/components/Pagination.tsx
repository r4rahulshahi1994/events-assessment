import { IconButton, Tooltip } from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import '../styles/components.css'

export interface PaginationProps {
  pageIndex: number
  pageSize: number
  total: number
  itemLabel?: string
  pageSizeOptions: readonly number[]
  disabled?: boolean
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function Pagination({
  pageIndex,
  pageSize,
  total,
  itemLabel = 'records',
  pageSizeOptions,
  disabled,
  onPageChange,
  onPageSizeChange,
}: Readonly<PaginationProps>) {
  const lastPage = Math.max(0, Math.ceil(total / pageSize) - 1)
  const previousDisabled = disabled || pageIndex === 0
  const nextDisabled = disabled || pageIndex >= lastPage
  const range = total
    ? `${(pageIndex * pageSize + 1).toLocaleString()}-${Math.min((pageIndex + 1) * pageSize, total).toLocaleString()}`
    : '0'

  return (
    <div className="grid-pagination flex flex-wrap items-center justify-between gap-3">
      <span role="status" aria-live="polite">
        {range} of {total.toLocaleString()} {itemLabel}
      </span>
      <div className="pagination-controls flex items-center gap-2">
        <label>
          <span>Rows</span>
          <select
            aria-label="Rows per page"
            value={pageSize}
            disabled={disabled}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </label>
        <Tooltip title="First page">
          <span>
            <IconButton
              size="small"
              aria-label="First page"
              disabled={previousDisabled}
              onClick={() => onPageChange(0)}
            >
              <ChevronsLeft size={17} />
            </IconButton>
          </span>
        </Tooltip>
        <IconButton
          size="small"
          aria-label="Previous page"
          disabled={previousDisabled}
          onClick={() => onPageChange(pageIndex - 1)}
        >
          <ChevronLeft size={17} />
        </IconButton>
        <span className="page-number">{pageIndex + 1}</span>
        <IconButton
          size="small"
          aria-label="Next page"
          disabled={nextDisabled}
          onClick={() => onPageChange(pageIndex + 1)}
        >
          <ChevronRight size={17} />
        </IconButton>
        <Tooltip title="Last page">
          <span>
            <IconButton
              size="small"
              aria-label="Last page"
              disabled={nextDisabled}
              onClick={() => onPageChange(lastPage)}
            >
              <ChevronsRight size={17} />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </div>
  )
}
