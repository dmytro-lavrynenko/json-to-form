import { useJson } from '../context/JsonContext/useJson'

const JsonConfig = () => {
  const { jsonInput, setJsonInput, setParsedJson, error, setError } = useJson()

  const handleChange = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setError(null)
      setParsedJson(parsed)
    } catch (err) {
      setError('Invalid JSON: ' + (err instanceof Error ? err.message : err))
    }
  }

  return (
    <div className="w-full h-full">
      <h4>JSON Config</h4>
      <textarea
        name="json input"
        className="w-full
          h-96
          p-4
          border
          border-gray-300
          rounded-md
          resize-none
          font-mono
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          bg-white
          text-gray-800
          shadow-sm"
        value={jsonInput}
        placeholder="Input your JSON"
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <div className="text-red-600 h-[24px]">{error}</div>
      <button
        className={`styled-button flex ml-auto mr-0 w-[100px]`}
        onClick={handleChange}
        disabled={!jsonInput.length}
      >
        Apply
      </button>
    </div>
  )
}

export default JsonConfig
