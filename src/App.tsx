import JsonConfig from './components/JsonConfig'
import Tabs from './components/Tabs'
import ResultView from './components/ResultView'
import { JsonProvider } from './context/JsonContext/JsonProvider'

function App() {
  return (
    <JsonProvider>
      <div className="max-w-[600px] max-h-[800px] p-10">
        <Tabs
          tabs={[
            {
              id: 'config',
              label: 'Config',
              content: <JsonConfig />,
            },
            { id: 'result', label: 'Result', content: <ResultView /> },
          ]}
        />
      </div>
    </JsonProvider>
  )
}

export default App
