import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useJson } from '@/context/JsonContext/useJson'
import { parseFormConfig } from '@/utils/parseFormConfig'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { JSON_EXAMPLE } from '@/contants'

const JsonConfig = () => {
  const { jsonInput, setJsonInput, setParsedJson, error, setError, isDisabled, setIsDisabled } =
    useJson()

  const handleChange = () => {
    try {
      const result = parseFormConfig(jsonInput)

      if (!result.success) {
        setError('Invalid JSON: ' + result.error)
        return
      }

      setError(null)
      setIsDisabled(true)
      setParsedJson(result.data)
    } catch (err) {
      setError(
        'Invalid JSON: ' +
          (err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'),
      )
    }
  }

  return (
    <>
      <Textarea
        id="json-textarea"
        className="resize-none h-96 font-mono text-sm"
        value={jsonInput}
        placeholder="Input your JSON"
        onChange={(e) => {
          setJsonInput(e.target.value)
          setError(null)
          setIsDisabled(false)
        }}
      />
      <Accordion type="single" collapsible className="w-full text-sm">
        <AccordionItem value="json-example">
          <AccordionTrigger className="text-muted-foreground">
            Show example JSON structure
          </AccordionTrigger>
          <AccordionContent>
            <pre className="whitespace-pre-wrap font-mono text-xs bg-muted rounded-md p-4 mt-2">
              {JSON_EXAMPLE}
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <Button onClick={handleChange} disabled={!jsonInput.length || isDisabled}>
        Apply
      </Button>
    </>
  )
}

export default JsonConfig
