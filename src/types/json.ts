export interface Item {
  id: string
  type: string
  label: string
  options?: string[]
}

export interface ParsedJson {
  items: Item[]
  confirmButtonText?: string
  cancelButtonText?: string
  title?: string
  [key: string]: unknown
}
