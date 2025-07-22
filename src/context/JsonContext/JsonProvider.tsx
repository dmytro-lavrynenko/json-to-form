import { useState } from 'react'
import type { ReactNode } from 'react'

import type { ParsedJson } from '@/types/json'
import { JsonContext } from './JsonContext'

export const JsonProvider = ({ children }: { children: ReactNode }) => {
  const [jsonInput, setJsonInput] = useState('')
  const [parsedJson, setParsedJson] = useState<ParsedJson | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  return (
    <JsonContext.Provider
      value={{
        jsonInput,
        setJsonInput,
        parsedJson,
        setParsedJson,
        error,
        setError,
        isDisabled,
        setIsDisabled,
      }}
    >
      {children}
    </JsonContext.Provider>
  )
}
