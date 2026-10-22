import type { ReactNode } from 'react'
import { flexRender } from '@tanstack/react-table'
import type { Table } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

interface GridTableProps<T> {
  table: Table<T>
  label: string
  showFilters: boolean
  state?: ReactNode
}

export function GridTable<T>({
  table,
  label,
  showFilters,
  state,
}: Readonly<GridTableProps<T>>) {
  return (
    <div className="table-scroll">
      <table aria-label={label}>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                const sortDirection = {
                  asc: 'ascending',
                  desc: 'descending',
                } as const
                const SortIcon = sorted
                  ? { asc: ArrowUp, desc: ArrowDown }[sorted]
                  : ArrowUpDown
                return (
                  <th
                    key={header.id}
                    scope="col"
                    aria-sort={sorted ? sortDirection[sorted] : 'none'}
                  >
                    <button
                      className="column-sort"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      <SortIcon size={13} />
                    </button>
                    {showFilters && (
                      <input
                        className="column-filter"
                        aria-label={`Filter ${String(header.column.columnDef.header)}`}
                        placeholder="Filter..."
                        value={String(header.column.getFilterValue() ?? '')}
                        onChange={(event) =>
                          header.column.setFilterValue(event.target.value)
                        }
                      />
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {state ? (
            <tr>
              <td colSpan={table.getVisibleLeafColumns().length}>{state}</td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
