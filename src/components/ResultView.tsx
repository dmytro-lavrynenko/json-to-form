import type { ReactNode } from 'react'
import { Input } from '@/components/ui/input'
import { useJson } from '../context/JsonContext/useJson'
import { Button } from './ui/button'

const fieldRenderMap: Record<string, ReactNode> = {
  string: <Input />,
  numeric: <div></div>,
  'multi-line': <div></div>,
  boolean: <div></div>,
  date: <div></div>,
  enum: <div></div>,
}

const ResultForm = () => {
  const { parsedJson: { items, confirmButtonText, cancelButtonText, title } = {} } = useJson()

  return (
    <div className="h-full">
      {title && <span className="scroll-m-20 text-xl font-semibold tracking-tight">{title}</span>}
      {!items?.length && (
        <span className="text-center text-sm text-muted-foreground italic">No items.</span>
      )}
      {items?.map((field: any) => (
        <div className="flex mt-2 items-center gap-2">
          {field.label && <div className="capitalize truncate w-64">{field.label}</div>}
          {fieldRenderMap[field.type] || `Unknown field type: ${field.type || 'No field type'}`}
        </div>
      ))}
      {(confirmButtonText || cancelButtonText) && (
        <div className="flex gap-2 flex-col mt-4">
          {confirmButtonText && <Button>{confirmButtonText}</Button>}
          {cancelButtonText && <Button variant="outline">{cancelButtonText}</Button>}
        </div>
      )}
    </div>
  )
}

export default ResultForm
