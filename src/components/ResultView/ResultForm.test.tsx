import { render, screen, fireEvent } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { JsonContext } from '@/context/JsonContext/JsonContext'
import { FormContext } from '@/context/FormContext/FormContext'
import ResultForm from './ResultForm'

const mockParsedJson = {
  title: 'Test Title',
  confirmButtonText: 'Submit',
  cancelButtonText: 'Cancel',
  items: [
    {
      id: 'string-id',
      label: 'Name',
      type: 'string',
    },
  ],
}

function renderResultForm(parsedJson = mockParsedJson) {
  let formRef: ReturnType<typeof useForm> | null = null

  const Wrapper = () => {
    const form = useForm()
    formRef = form

    return (
      <FormContext.Provider value={form}>
        <JsonContext.Provider
          value={{
            parsedJson,
            jsonInput: '',
            setJsonInput: vi.fn(),
            setParsedJson: vi.fn(),
            error: null,
            setError: vi.fn(),
            isDisabled: false,
            setIsDisabled: vi.fn(),
          }}
        >
          <FormProvider {...form}>
            <ResultForm />
          </FormProvider>
        </JsonContext.Provider>
      </FormContext.Provider>
    )
  }

  const utils = render(<Wrapper />)
  return { ...utils, form: formRef! }
}

describe('ResultForm', () => {
  it('renders title and buttons', () => {
    renderResultForm()

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders item inputs', () => {
    renderResultForm()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('calls reset on cancel click', () => {
    const { form } = renderResultForm()
    const resetSpy = vi.spyOn(form, 'reset')

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(resetSpy).toHaveBeenCalled()
  })

  it('shows message after submit', async () => {
    renderResultForm()

    fireEvent.submit(screen.getByTestId('form'))
    expect(
      await screen.findByText('Form is submitted, to reset form click Cancel button.'),
    ).toBeInTheDocument()
  })

  it('shows "No items." if items are missing', () => {
    renderResultForm({ ...mockParsedJson, items: [] })
    expect(screen.getByText('No items.')).toBeInTheDocument()
  })
})
