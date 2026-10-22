export function toCssToken(value: string): string {
  return value.toLowerCase().replaceAll(' ', '-')
}
