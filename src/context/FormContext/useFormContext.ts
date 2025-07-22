import { useContext } from 'react'

import { FormContext } from './FormContext'

export const useFormCtx = () => {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('useFormCtx must be used within FormProvider')
  return ctx
}
