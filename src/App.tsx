import Tabs from './components/Tabs'

function App() {
  return (
    <div className="max-w-[600px] max-h-[800px] p-10">
      <Tabs
        tabs={[
          { id: 'config', label: 'Config', content: <div>first tab</div> },
          { id: 'result', label: 'Result', content: <div>second tab</div> },
        ]}
      />
    </div>
  )
}

export default App
