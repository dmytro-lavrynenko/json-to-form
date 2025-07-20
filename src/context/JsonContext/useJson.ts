import { useContext } from 'react'
import { JsonContext } from './JsonContext'

export const useJson = () => {
  const context = useContext(JsonContext)
  if (!context) throw new Error('useJson must be used within a JsonProvider')
  return context
}
