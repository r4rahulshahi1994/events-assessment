export interface CsvColumn<T> {
  label: string
  accessor: (record: T) => string | number | null | undefined
}

export function escapeCsvCell(
  value: string | number | null | undefined,
): string {
  const text = String(value ?? '')
  const safe = /^[=+@\-\t\r]/.test(text) ? `'${text}` : text
  return `"${safe.replaceAll('"', '""')}"`
}

export function serializeCsv<T>(
  records: readonly T[],
  columns: readonly CsvColumn<T>[],
): string {
  const header = columns.map((column) => escapeCsvCell(column.label)).join(',')
  const rows = records.map((record) =>
    columns.map((column) => escapeCsvCell(column.accessor(record))).join(','),
  )
  return [header, ...rows].join('\r\n')
}
