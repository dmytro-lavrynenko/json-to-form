import { createContext } from 'react'
import { type FieldValues, type UseFormReturn } from 'react-hook-form'

export const FormContext = createContext<UseFormReturn<FieldValues> | null>(null)
