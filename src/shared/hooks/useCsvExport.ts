import { useState } from 'react'
import { serializeCsv } from '../utils/csv'
import type { CsvColumn } from '../utils/csv'
import { downloadFile } from '../utils/download'

interface CsvExportOptions<T> {
  records: readonly T[]
  columns: readonly CsvColumn<T>[]
  filename: string
  onSuccess?: (count: number) => void
  onError?: (error: unknown) => void
}

export function useCsvExport<T>({
  records,
  columns,
  filename,
  onSuccess,
  onError,
}: CsvExportOptions<T>) {
  const [exporting, setExporting] = useState(false)

  async function exportCsv() {
    if (exporting) return
    setExporting(true)

    try {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      )
      downloadFile(
        serializeCsv(records, columns),
        filename,
        'text/csv;charset=utf-8;',
      )
      onSuccess?.(records.length)
    } catch (error) {
      onError?.(error)
    } finally {
      setExporting(false)
    }
  }

  return { exporting, exportCsv }
}
