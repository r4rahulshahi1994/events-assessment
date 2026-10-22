import { useDeferredValue, useMemo, useState } from 'react'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import type { DataGridProps } from './types'

export function useDataGrid<T>({
  data,
  columns,
  getRowId,
  initialPageSize = 10,
}: DataGridProps<T>) {
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () =>
      Object.fromEntries(columns.map((column) => [column.id, !column.hidden])),
  )
  const deferredSearch = useDeferredValue(search)
  const deferredFilters = useDeferredValue(columnFilters)
  const definitions = useMemo<ColumnDef<T>[]>(
    () =>
      columns.map((column) => ({
        id: column.id,
        header: column.label,
        accessorFn: column.accessor,
        filterFn: 'includesString',
        cell: (context) =>
          column.cell ? column.cell(context.row.original) : context.getValue(),
      })),
    [columns],
  )

  const table = useReactTable({
    data,
    columns: definitions,
    getRowId,
    state: {
      globalFilter: deferredSearch,
      sorting,
      columnFilters: deferredFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: initialPageSize } },
  })

  function clearFilters() {
    setSearch('')
    setColumnFilters([])
  }

  return {
    table,
    search,
    setSearch,
    clearFilters,
    filterCount: columnFilters.length,
    isFiltering: search !== deferredSearch || columnFilters !== deferredFilters,
  }
}
