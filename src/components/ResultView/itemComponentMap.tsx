import { type ControllerRenderProps, type FieldValues } from 'react-hook-form'
import { type JSX } from 'react'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import type { Item } from '@/types/json'
import type { ItemType } from '@/types/items'

type ItemRenderProps = {
  item: Item
  controllerField: ControllerRenderProps<FieldValues, string>
}

export const itemComponentMap: Record<ItemType, (props: ItemRenderProps) => JSX.Element> = {
  string: ({ item: { id }, controllerField }) => (
    <Input id={id} placeholder="Enter text value" {...controllerField} />
  ),
  numeric: ({ item: { id }, controllerField }) => (
    <Input id={id} placeholder="Enter numeric value" type="number" {...controllerField} />
  ),
  'multi-line': ({ item: { id }, controllerField }) => (
    <Textarea id={id} placeholder="Enter multi-line value" {...controllerField} />
  ),
  boolean: ({ item: { id }, controllerField }) => (
    <Checkbox
      {...controllerField}
      id={id}
      checked={controllerField.value}
      onCheckedChange={controllerField.onChange}
    />
  ),
  date: ({ item: { id }, controllerField }) => <Input id={id} type="date" {...controllerField} />,
  enum: ({ item, controllerField }) => (
    <RadioGroup onValueChange={controllerField.onChange} value={controllerField.value}>
      {(item.options ?? []).map((option: string) => (
        <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem {...controllerField} value={option} id={option} />
          <Label className="block truncate w-36" htmlFor={option}>
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
}
