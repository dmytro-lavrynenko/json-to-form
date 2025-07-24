import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const validJson = JSON.stringify({
  title: 'Test Form',
  confirmButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  items: [
    { type: 'string', label: 'Name' },
    { type: 'boolean', label: 'Agree' },
  ],
})

describe('App integration flow', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('runs full flow: input JSON -> apply -> switch to result -> fill and submit -> cancel', async () => {
    const user = userEvent.setup()
    render(<App />)

    const textarea = screen.getByPlaceholderText('Input your JSON')
    await user.clear(textarea)
    fireEvent.change(textarea, { target: { value: validJson } })

    const applyButton = screen.getByRole('button', { name: 'Apply' })
    expect(applyButton).toBeEnabled()
    await user.click(applyButton)

    const resultTab = screen.getByRole('tab', { name: 'Result' })
    await user.click(resultTab)

    expect(await screen.findByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Agree' })).toBeInTheDocument()

    const nameInput = screen.getByLabelText('Name')
    await user.clear(nameInput)
    await user.type(nameInput, 'Alice')

    const checkbox = screen.getByRole('checkbox', { name: 'Agree' })
    await user.click(checkbox)

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    await user.click(submitButton)

    expect(
      await screen.findByText('Form is submitted, to reset form click Cancel button.'),
    ).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await user.click(cancelButton)

    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('shows error if JSON is invalid', () => {
    render(<App />)

    const textarea = screen.getByPlaceholderText('Input your JSON')
    fireEvent.change(textarea, { target: { value: '{' } })

    const applyButton = screen.getByRole('button', { name: 'Apply' })
    fireEvent.click(applyButton)

    expect(screen.getByText('Invalid JSON: JSON5: invalid end of input at 1:2')).toBeInTheDocument()
  })

  it('shows fallback message if no items', async () => {
    const user = userEvent.setup()
    const noItemsJson = JSON.stringify({
      title: 'Empty Form',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Back',
      items: [],
    })

    render(<App />)

    const textarea = screen.getByPlaceholderText('Input your JSON')
    fireEvent.change(textarea, { target: { value: noItemsJson } })
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))
    const resultTab = screen.getByRole('tab', { name: 'Result' })
    await user.click(resultTab)
    expect(screen.getByText('No items.')).toBeInTheDocument()
  })
})
