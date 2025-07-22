import { useForm } from 'react-hook-form'

import { FormContext } from './FormContext'

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useForm()
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>
}
