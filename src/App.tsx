import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import JsonConfig from '@/components/JsonConfig'
import ResultView from '@/components/ResultView/ResultForm'
import { JsonProvider } from '@/context/JsonContext/JsonProvider'
import { Card } from '@/components/ui/card'
import { FormProvider } from '@/context/FormContext/FormProvider'

const App = () => (
  <FormProvider>
    <JsonProvider>
      <div className="max-w-[600px] p-10">
        <Tabs defaultValue="config">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="config">Config</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="config">
            <Card className="p-4 gap-0">
              <JsonConfig />
            </Card>
          </TabsContent>
          <TabsContent value="result">
            <Card className="p-2">
              <ResultView />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </JsonProvider>
  </FormProvider>
)

export default App
