import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { itemComponentMap } from './itemComponentMap'
import { vi } from 'vitest'
import { fireEvent } from '@testing-library/react'

const mockControllerField = (
  overrides: Partial<ControllerRenderProps<FieldValues, string>> = {},
): ControllerRenderProps<FieldValues, string> => ({
  name: 'test',
  value: '',
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
  ...overrides,
})

describe('itemComponentMap', () => {
  it('renders and updates string input', async () => {
    const onChange = vi.fn()
    render(
      itemComponentMap.string({
        item: { id: 'string-id', label: 'String', type: 'string' },
        controllerField: mockControllerField({ onChange }),
      }),
    )
    const input = screen.getByPlaceholderText('Enter text value')
    await userEvent.type(input, 'hello')
    expect(onChange).toHaveBeenCalledTimes(5)
  })

  it('renders and updates numeric input', async () => {
    const onChange = vi.fn()
    render(
      itemComponentMap.numeric({
        item: { id: 'num-id', label: 'Number', type: 'numeric' },
        controllerField: mockControllerField({ onChange }),
      }),
    )
    const input = screen.getByPlaceholderText('Enter numeric value')
    await userEvent.type(input, '123')
    expect(onChange).toHaveBeenCalledTimes(3)
  })

  it('renders and updates multi-line textarea', async () => {
    const onChange = vi.fn()
    render(
      itemComponentMap['multi-line']({
        item: { id: 'multi-id', label: 'Multi-line', type: 'multi-line' },
        controllerField: mockControllerField({ onChange }),
      }),
    )
    const textarea = screen.getByPlaceholderText('Enter multi-line value')
    await userEvent.type(textarea, 'test')
    expect(onChange).toHaveBeenCalledTimes(4)
  })

  it('renders and toggles boolean checkbox', async () => {
    const onChange = vi.fn()
    render(
      itemComponentMap.boolean({
        item: { id: 'bool-id', label: 'Boolean', type: 'boolean' },
        controllerField: mockControllerField({ value: false, onChange }),
      }),
    )
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(onChange).toHaveBeenCalled()
  })

  it('renders and updates date input', async () => {
    const onChange = vi.fn()
    render(
      itemComponentMap.date({
        item: { id: 'date-id', label: 'Date', type: 'date' },
        controllerField: mockControllerField({ onChange }),
      }),
    )
    const input = screen.getByDisplayValue('')
    fireEvent.change(input, { target: { value: '2023-01-01' } })
    expect(onChange).toHaveBeenCalledWith(expect.anything())
  })

  it('renders enum radio group and selects option', async () => {
    const onChange = vi.fn()
    const options = ['Option A', 'Option B']
    render(
      itemComponentMap.enum({
        item: { id: 'enum-id', label: 'Enum', type: 'enum', options },
        controllerField: mockControllerField({ value: 'Option A', onChange }),
      }),
    )
    const radio = screen.getByLabelText('Option B')
    await userEvent.click(radio)
    expect(onChange).toHaveBeenCalled()
  })
})
