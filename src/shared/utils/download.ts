export function downloadFile(
  contents: BlobPart,
  filename: string,
  type: string,
): void {
  const url = URL.createObjectURL(new Blob([contents], { type }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename

  try {
    link.click()
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 0)
  }
}
