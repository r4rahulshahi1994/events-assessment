import { useState } from 'react'
import { GridState } from './data-grid/GridState'
import { GridTable } from './data-grid/GridTable'
import { GridToolbar } from './data-grid/GridToolbar'
import { useDataGrid } from './data-grid/useDataGrid'
import type { DataGridProps } from './data-grid/types'
import { Pagination } from '../shared/components/Pagination'
import './data-grid/data-grid.css'

export type { DataGridProps, GridColumn } from './data-grid/types'

const defaultPageSizes = [10, 25, 50, 100]

export function DataGrid<T>({
  label = 'Events',
  itemLabel = 'events',
  pageSizeOptions = defaultPageSizes,
  searchPlaceholder = `Search ${itemLabel}...`,
  ...props
}: Readonly<DataGridProps<T>>) {
  const { table, search, setSearch, clearFilters, filterCount, isFiltering } =
    useDataGrid(props)
  const [showFilters, setShowFilters] = useState(false)
  const { loading, error, onRetry } = props
  const count = table.getFilteredRowModel().rows.length
  const { pageIndex, pageSize } = table.getState().pagination
  const hasFilters = Boolean(search || filterCount)
  const state =
    loading || error || !count ? (
      <GridState
        loading={loading}
        error={error}
        onRetry={onRetry}
        itemLabel={itemLabel}
        onClearFilters={hasFilters ? clearFilters : undefined}
      />
    ) : undefined

  return (
    <section
      className="data-grid"
      aria-label={label}
      aria-busy={loading || isFiltering}
    >
      <GridToolbar
        table={table}
        search={search}
        onSearchChange={setSearch}
        label={label}
        searchPlaceholder={searchPlaceholder}
        filterCount={filterCount}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      {filterCount > 0 && (
        <div className="filter-summary">
          <span>
            {count.toLocaleString()} matching {itemLabel}
          </span>
          <button onClick={() => table.resetColumnFilters()}>
            Clear filters
          </button>
        </div>
      )}
      <GridTable
        table={table}
        label={label}
        showFilters={showFilters}
        state={state}
      />
      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        total={loading || error ? 0 : count}
        itemLabel={itemLabel}
        pageSizeOptions={pageSizeOptions}
        disabled={loading || Boolean(error)}
        onPageChange={(page) => table.setPageIndex(page)}
        onPageSizeChange={(size) => table.setPageSize(size)}
      />
    </section>
  )
}
