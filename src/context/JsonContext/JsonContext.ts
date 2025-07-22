import { createContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type { ParsedJson } from '@/types/json'

type JsonContextType = {
  jsonInput: string
  setJsonInput: Dispatch<SetStateAction<string>>
  parsedJson: ParsedJson | null
  setParsedJson: Dispatch<SetStateAction<ParsedJson | null>>
  error: string | null
  setError: Dispatch<SetStateAction<string | null>>
  isDisabled: boolean
  setIsDisabled: Dispatch<SetStateAction<boolean>>
}

export const JsonContext = createContext<JsonContextType | undefined>(undefined)
