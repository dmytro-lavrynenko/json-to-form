import JSON5 from 'json5'
import { v4 as uuidv4 } from 'uuid'
import { formSchema } from '@/schema/formSchema'
import type { ParsedJson } from '@/types/json'

export type ParseResult = { success: true; data: ParsedJson } | { success: false; error: string }

export function parseFormConfig(input: string): ParseResult {
  try {
    const raw = JSON5.parse(input)

    const validated = formSchema.safeParse(raw)

    if (!validated.success) {
      const message = validated.error.issues
        .map((issue) => {
          const path = issue.path?.length ? issue.path.join('.') : '(root)'
          const note = 'note' in issue ? issue.note : ''
          return `${path}: ${note || issue.message}`
        })
        .join('; ')
      return { success: false, error: message }
    }

    const withIds: ParsedJson = {
      ...validated.data,
      items: validated.data.items.map((item) => ({
        ...item,
        id: uuidv4(),
      })),
    }

    return { success: true, data: withIds }
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown parse error',
    }
  }
}
