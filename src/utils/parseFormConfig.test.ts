import { parseFormConfig } from './parseFormConfig'

vi.mock('uuid', () => ({
  v4: () => 'mock-uuid',
}))

describe('parseFormConfig', () => {
  it('parses valid JSON with enum type', () => {
    const json = `
      {
        "title": "Test Form",
        "confirmButtonText": "Submit",
        "cancelButtonText": "Cancel",
        "items": [
          {
            "label": "Choose one",
            "type": "enum",
            "options": ["Option 1", "Option 2"]
          }
        ]
      }
    `
    const result = parseFormConfig(json)

    expect(result).toEqual({
      success: true,
      data: {
        title: 'Test Form',
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        items: [
          {
            id: 'mock-uuid',
            label: 'Choose one',
            type: 'enum',
            options: ['Option 1', 'Option 2'],
          },
        ],
      },
    })
  })

  it('parses valid JSON with non-enum type', () => {
    const json = `
      {
        "title": "Test Form",
        "confirmButtonText": "OK",
        "cancelButtonText": "Back",
        "items": [
          {
            "label": "Enter name",
            "type": "string"
          }
        ]
      }
    `
    const result = parseFormConfig(json)

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.items[0].id).toBe('mock-uuid')
      expect(result.data.items[0].label).toBe('Enter name')
      expect(result.data.items[0].type).toBe('string')
    }
  })

  it('returns error for invalid JSON', () => {
    const json = `{ title: "Oops" `

    const result = parseFormConfig(json) as { success: false; error: string }

    expect(result.success).toBe(false)
    expect(result.error).toContain('JSON5: invalid end of input at 1:17')
  })

  it('returns error for missing required fields', () => {
    const json = `
      {
        "title": "Missing buttons",
        "items": []
      }
    `
    const result = parseFormConfig(json) as { success: false; error: string }

    expect(result.success).toBe(false)
    expect(result.error).toContain('confirmButtonText')
    expect(result.error).toContain('cancelButtonText')
  })

  it('returns error if enum is missing options', () => {
    const json = `
      {
        "title": "Bad Enum",
        "confirmButtonText": "Submit",
        "cancelButtonText": "Cancel",
        "items": [
          {
            "label": "Should fail",
            "type": "enum"
          }
        ]
      }
    `
    const result = parseFormConfig(json) as { success: false; error: string }

    expect(result.success).toBe(false)
    expect(result.error).toMatch('items.0.options')
  })
})
