import { useState } from 'react'
import type { Table } from '@tanstack/react-table'
import { Button, Checkbox, Menu, MenuItem } from '@mui/material'
import { Columns3, Filter, Search, X } from 'lucide-react'

interface GridToolbarProps<T> {
  table: Table<T>
  search: string
  onSearchChange: (value: string) => void
  label: string
  searchPlaceholder: string
  filterCount: number
  showFilters: boolean
  onToggleFilters: () => void
}

export function GridToolbar<T>({
  table,
  search,
  onSearchChange,
  label,
  searchPlaceholder,
  filterCount,
  showFilters,
  onToggleFilters,
}: Readonly<GridToolbarProps<T>>) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const visibleColumns = table.getVisibleLeafColumns().length

  return (
    <div className="grid-toolbar flex flex-wrap items-center gap-3">
      <label className="search-field">
        <Search size={17} />
        <input
          aria-label={`Search ${label.toLowerCase()}`}
          placeholder={searchPlaceholder}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        {search && (
          <button aria-label="Clear search" onClick={() => onSearchChange('')}>
            <X size={14} />
          </button>
        )}
      </label>
      <div className="toolbar-actions flex items-center gap-2">
        <Button
          className={showFilters ? 'active-filter' : ''}
          startIcon={<Filter size={15} />}
          onClick={onToggleFilters}
          aria-pressed={showFilters}
        >
          Filters{filterCount > 0 ? ` (${filterCount})` : ''}
        </Button>
        <Button
          startIcon={<Columns3 size={16} />}
          onClick={(event) => setAnchor(event.currentTarget)}
          aria-haspopup="menu"
          aria-expanded={Boolean(anchor)}
        >
          Columns
        </Button>
      </div>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        {table.getAllLeafColumns().map((column) => (
          <MenuItem
            key={column.id}
            role="menuitemcheckbox"
            aria-checked={column.getIsVisible()}
            onClick={() => column.toggleVisibility()}
            disabled={column.getIsVisible() && visibleColumns === 1}
          >
            <Checkbox
              checked={column.getIsVisible()}
              size="small"
              tabIndex={-1}
              disableRipple
              slotProps={{
                input: { 'aria-label': String(column.columnDef.header) },
              }}
            />
            {String(column.columnDef.header)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
