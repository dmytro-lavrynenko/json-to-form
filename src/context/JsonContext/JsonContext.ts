import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type JsonContextType = {
  jsonInput: string
  setJsonInput: Dispatch<SetStateAction<string>>
  parsedJson: any
  setParsedJson: Dispatch<SetStateAction<any>>
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
  isDisabled: boolean
  setIsDisabled: Dispatch<SetStateAction<boolean>>
}

export const JsonContext = createContext<JsonContextType | undefined>(undefined)
