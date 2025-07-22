import { type Control, type FieldValues } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import type { Item } from '@/types/json'
import type { ItemType } from '@/types/items'

import { itemComponentMap } from './itemComponentMap'

type ResultItemProps = {
  item: Item
  control: Control<FieldValues>
  isSubmitted: boolean
}

const ResultItem = ({ item, control, isSubmitted }: ResultItemProps) => {
  if (!item || typeof item !== 'object' || !('type' in item)) {
    return <div className="text-sm text-destructive italic">Invalid 'item' configuration.</div>
  }

  const { id, label, type } = item

  const Component = itemComponentMap[type as ItemType]

  return (
    <FormField
      control={control}
      name={id}
      disabled={isSubmitted}
      render={({ field: controllerField }) => (
        <FormItem className="flex items-center gap-2 mb-2 last:mb-4">
          <FormLabel htmlFor={id} className="block capitalize truncate w-36">
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex-auto">
              {Component ? (
                <Component item={item} controllerField={controllerField} />
              ) : (
                `Unknown item type: ${type || 'No item type'}`
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ResultItem
