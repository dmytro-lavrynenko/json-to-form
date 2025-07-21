import { useJson } from '../context/JsonContext/useJson'

const ResultForm = () => {
  const { parsedJson } = useJson()

  return (
    <>
      <div className="h-full">Result Form</div>
    </>
  )
}

export default ResultForm
