import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type JsonContextType = {
  jsonInput: string
  setJsonInput: Dispatch<SetStateAction<string>>
  parsedJson: any
  setParsedJson: Dispatch<SetStateAction<any>>
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
}

export const JsonContext = createContext<JsonContextType | undefined>(undefined)
