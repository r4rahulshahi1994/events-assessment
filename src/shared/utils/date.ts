const dayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})
const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export const dayLabel = (date: string) => dayFormatter.format(new Date(date))
export const dateLabel = (date: string) => dateFormatter.format(new Date(date))
export const timeLabel = (date: string) => timeFormatter.format(new Date(date))

export function localDay(value: string): string {
  const date = new Date(value)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function localDateTime(value: string): string {
  const date = new Date(value)
  return `${localDay(value)}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export function isValidLocalDateTime(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return false

  const date = new Date(value)
  return (
    Number.isFinite(date.getTime()) &&
    date.getFullYear() >= 1900 &&
    date.getFullYear() <= 2100 &&
    localDateTime(value) === value
  )
}
