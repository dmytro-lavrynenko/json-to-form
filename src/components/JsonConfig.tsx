import { v4 } from 'uuid'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useJson } from '@/context/JsonContext/useJson'

const JsonConfig = () => {
  const { jsonInput, setJsonInput, setParsedJson, error, setError, isDisabled, setIsDisabled } =
    useJson()

  const handleChange = () => {
    try {
      const input = jsonInput
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":') // json5?
        .replace(/'([^']*)'/g, '"$1"')
      const parsed = JSON.parse(input)
      if (!Array.isArray(parsed.items) || !parsed.items.length) {
        throw new Error('Items should be an array and contain elements')
      }
      setError(null)
      setIsDisabled(true)
      setParsedJson({
        ...parsed,
        items: parsed.items.map((item: unknown) =>
          typeof item === 'object' ? { ...item, id: v4() } : item,
        ),
      })
    } catch (err) {
      setError('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <>
      <Textarea
        id="json-textarea"
        className="resize-none h-full font-mono text-sm"
        value={jsonInput}
        placeholder="Input your JSON"
        onChange={(e) => {
          setJsonInput(e.target.value)
          setError(null)
          setIsDisabled(false)
        }}
      />
      <span className="-mt-4 text-sm text-muted-foreground italic">
        Tip: JSON should contain 'items: Array
        {'<{ type: string, label: string, options?: string[] }>'}', 'title: string',
        'confirmButtonText: string' and 'cancelButtonText: string'{' '}
      </span>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <Button onClick={handleChange} disabled={!jsonInput.length || isDisabled}>
        Apply
      </Button>
    </>
  )
}

export default JsonConfig
