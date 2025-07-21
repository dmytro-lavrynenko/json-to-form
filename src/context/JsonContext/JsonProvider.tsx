import { useState } from 'react'
import type { ReactNode } from 'react'
import { JsonContext } from './JsonContext'

export const JsonProvider = ({ children }: { children: ReactNode }) => {
  const [jsonInput, setJsonInput] = useState('')
  const [parsedJson, setParsedJson] = useState<any>('')
  const [error, setError] = useState<string | null>(null)

  return (
    <JsonContext.Provider
      value={{ jsonInput, setJsonInput, parsedJson, setParsedJson, error, setError }}
    >
      {children}
    </JsonContext.Provider>
  )
}
