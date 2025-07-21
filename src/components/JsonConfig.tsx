import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useJson } from '../context/JsonContext/useJson'

const JsonConfig = () => {
  const { jsonInput, setJsonInput, setParsedJson, error, setError } = useJson()

  const handleChange = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setError(null)
      setParsedJson(parsed)
    } catch (err) {
      setError('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <>
      <Textarea
        className="resize-none h-full font-mono text-sm"
        value={jsonInput}
        placeholder="Input your JSON"
        onChange={(e) => {
          setJsonInput(e.target.value)
          setError(null)
        }}
      />
      {error && <div className="text-sm text-red-600">{error ?? ''}</div>}
      <Button onClick={handleChange} disabled={!jsonInput.length}>
        Apply
      </Button>
    </>
  )
}

export default JsonConfig
