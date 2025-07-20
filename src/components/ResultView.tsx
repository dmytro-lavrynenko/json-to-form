import { useJson } from '../context/JsonContext/useJson'

const ResultForm = () => {
  const { parsedJson } = useJson()

  return (
    <div className="w-full h-full">
      <h4>Result Form</h4>
      <div>{String(parsedJson)}</div>
    </div>
  )
}

export default ResultForm
