import { formSchema } from '@/schema/formSchema'

describe('formSchema', () => {
  it('accepts valid enum item', () => {
    const data = {
      title: 'Form',
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      items: [{ type: 'enum', label: 'Choose', options: ['A', 'B'] }],
    }

    const result = formSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('rejects enum without options', () => {
    const data = {
      title: 'Form',
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      items: [{ type: 'enum', label: 'Choose', options: [] }],
    }

    const result = formSchema.safeParse(data)
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toMatch('at least one option')
  })

  it('rejects non-enum item that has options', () => {
    const data = {
      title: 'Form',
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      items: [{ type: 'string', label: 'Name', options: ['should not be here'] }],
    }

    const result = formSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('rejects missing fields', () => {
    const result = formSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  const baseForm = {
    title: 'Test Form',
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
  }

  const validItem = (type: string) => ({
    type,
    label: `${type} label`,
  })

  const nonEnumTypes = ['string', 'numeric', 'multi-line', 'boolean', 'date'] as const

  it.each(nonEnumTypes)('accepts item type "%s" with required fields only', (type) => {
    const result = formSchema.safeParse({
      ...baseForm,
      items: [validItem(type)],
    })
    expect(result.success).toBe(true)
  })

  it.each(nonEnumTypes)('rejects item type "%s" if label is missing', (type) => {
    const result = formSchema.safeParse({
      ...baseForm,
      items: [{ type }],
    })
    expect(result.success).toBe(false)
  })

  it.each(nonEnumTypes)('rejects item type "%s" if unexpected "options" is provided', (type) => {
    const result = formSchema.safeParse({
      ...baseForm,
      items: [{ type, label: 'test', options: ['invalid'] }],
    })
    expect(result.success).toBe(false)
  })
})
