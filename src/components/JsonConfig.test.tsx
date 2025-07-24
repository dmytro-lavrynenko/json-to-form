import { render, screen, fireEvent } from '@testing-library/react'
import JsonConfig from './JsonConfig'
import { useJson } from '@/context/JsonContext/useJson'
import { parseFormConfig } from '@/utils/parseFormConfig'
import { JSON_EXAMPLE } from '@/contants'

vi.mock('@/context/JsonContext/useJson')
vi.mock('@/utils/parseFormConfig')

const mockSetJsonInput = vi.fn()
const mockSetParsedJson = vi.fn()
const mockSetError = vi.fn()
const mockSetIsDisabled = vi.fn()

const defaultJsonState = {
  parsedJson: null,
  jsonInput: '',
  setJsonInput: mockSetJsonInput,
  setParsedJson: mockSetParsedJson,
  error: null,
  setError: mockSetError,
  isDisabled: false,
  setIsDisabled: mockSetIsDisabled,
}

describe('JsonConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useJson).mockReturnValue({ ...defaultJsonState })
  })

  it('renders textarea and button', () => {
    render(<JsonConfig />)
    expect(screen.getByPlaceholderText('Input your JSON')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled()
  })

  it('disables button if json is applied', () => {
    vi.mocked(useJson).mockReturnValue({
      ...defaultJsonState,
      jsonInput: 'abc',
      isDisabled: true,
    })
    render(<JsonConfig />)
    expect(screen.getByRole('button', { name: 'Apply' })).toBeDisabled()
  })

  it('updates jsonInput and resets error on change', () => {
    render(<JsonConfig />)
    const textarea = screen.getByPlaceholderText('Input your JSON')
    fireEvent.change(textarea, { target: { value: '{"foo":"bar"}' } })

    expect(mockSetJsonInput).toHaveBeenCalledWith('{"foo":"bar"}')
    expect(mockSetError).toHaveBeenCalledWith(null)
    expect(mockSetIsDisabled).toHaveBeenCalledWith(false)
  })

  it('calls setParsedJson if parse is successful', () => {
    const parsed = { title: 'Test', confirmButtonText: 'Ok', cancelButtonText: 'Cancel', items: [] }
    vi.mocked(parseFormConfig).mockReturnValue({ success: true, data: parsed })
    vi.mocked(useJson).mockReturnValue({
      ...defaultJsonState,
      jsonInput: '{"title":"Test","confirmButtonText":"Ok","cancelButtonText":"Cancel","items":[]}',
    })

    render(<JsonConfig />)
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    expect(mockSetParsedJson).toHaveBeenCalledWith(parsed)
    expect(mockSetError).toHaveBeenCalledWith(null)
    expect(mockSetIsDisabled).toHaveBeenCalledWith(true)
  })

  it('shows error if parse fails (Zod error)', () => {
    vi.mocked(parseFormConfig).mockReturnValue({
      success: false,
      error: 'title is required',
    })
    vi.mocked(useJson).mockReturnValue({
      ...defaultJsonState,
      jsonInput: '{}',
    })

    render(<JsonConfig />)
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    expect(mockSetError).toHaveBeenCalledWith('Invalid JSON: title is required')
  })

  it('renders error message if error exists', () => {
    vi.mocked(useJson).mockReturnValue({
      ...defaultJsonState,
      error: 'Invalid JSON: oops!',
    })

    render(<JsonConfig />)
    expect(screen.getByText('Invalid JSON: oops!')).toBeInTheDocument()
  })

  it('renders example JSON in accordion', () => {
    render(<JsonConfig />)
    expect(screen.getByText('Show example JSON structure')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Show example JSON structure'))
    const pre = screen.getByRole('region').querySelector('pre')
    expect(pre?.textContent?.trim()).toBe(JSON_EXAMPLE.trim())
  })
})
