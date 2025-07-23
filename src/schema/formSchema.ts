import { z } from 'zod'

const baseItem = z.object({
  label: z.string(),
})

const enumItem = baseItem.extend({
  type: z.literal('enum'),
  options: z.array(z.string()).min(1, 'Enum must have at least one option'),
})

const otherItem = baseItem.extend({
  type: z.enum(['string', 'numeric', 'multi-line', 'boolean', 'date']),
  options: z.undefined().optional(),
})

export const itemSchema = z.discriminatedUnion('type', [enumItem, otherItem])

export const formSchema = z.object({
  title: z.string(),
  confirmButtonText: z.string(),
  cancelButtonText: z.string(),
  items: z.array(itemSchema),
})
