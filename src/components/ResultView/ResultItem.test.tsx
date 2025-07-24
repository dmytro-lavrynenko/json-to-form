import { render, screen } from '@testing-library/react'
import { useForm, FormProvider, type Control, type FieldValues } from 'react-hook-form'
import type { Item } from '@/types/json'
import ResultItem from './ResultItem'

const renderWithForm = (item: Item, isSubmitted = false) => {
  const Wrapper = () => {
    const methods = useForm()
    return (
      <FormProvider {...methods}>
        <ResultItem item={item} control={methods.control} isSubmitted={isSubmitted} />
      </FormProvider>
    )
  }

  render(<Wrapper />)
}

describe('ResultItem', () => {
  it('renders string input with label', () => {
    renderWithForm({ id: 'test-id', label: 'Name', type: 'string' })
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('renders error for invalid item object', () => {
    // @ts-expect-error: passing null for test
    render(<ResultItem item={null} control={{} as Control<FieldValues>} isSubmitted={false} />)
    expect(screen.getByText("Invalid 'item' configuration.")).toBeInTheDocument()
  })

  it('disables field when submitted', () => {
    renderWithForm({ id: 'test-id', label: 'Disabled', type: 'numeric' }, true)
    const input = screen.getByLabelText('Disabled')
    expect(input).toBeDisabled()
  })

  it('renders unknown item type message', () => {
    renderWithForm({ id: 'bad-id', label: '???', type: 'unknown' }, false)
    expect(screen.getByText('Unknown item type: unknown')).toBeInTheDocument()
  })
})
