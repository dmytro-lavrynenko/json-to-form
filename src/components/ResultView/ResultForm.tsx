import { useFormState } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useFormCtx } from '@/context/FormContext/useFormContext'
import { useJson } from '@/context/JsonContext/useJson'

import ResultItem from './ResultItem'

const ResultForm = () => {
  const { parsedJson } = useJson()
  const { items, confirmButtonText, cancelButtonText, title } = parsedJson || {}
  const form = useFormCtx()
  const { isSubmitted } = useFormState({ control: form.control })

  return (
    <Form {...form}>
      <form
        className="flex flex-1 flex-col"
        onSubmit={form.handleSubmit((data) => {
          console.log(data)
        })}
      >
        {title && (
          <span className="scroll-m-20 text-xl font-semibold tracking-tight mb-2">{title}</span>
        )}
        {!items?.length ? (
          <span className="text-center text-sm text-muted-foreground italic">No items.</span>
        ) : (
          items.map((item) => (
            <ResultItem
              key={item.id}
              item={item}
              control={form.control}
              isSubmitted={isSubmitted}
            />
          ))
        )}
        {isSubmitted && (
          <span className="text-green-700 scroll-m-20 text-l font-semibold tracking-tight mb-2">
            Form is submitted, to reset form click Cancel button.
          </span>
        )}
        {(confirmButtonText || cancelButtonText) && ( // fix buttons
          <div className="flex gap-2 flex-col mt-auto mb-0">
            {confirmButtonText && (
              <Button disabled={isSubmitted} type="submit">
                {confirmButtonText}
              </Button>
            )}
            {cancelButtonText && (
              <Button
                onClick={() =>
                  form.reset(Object.fromEntries(items?.map(({ id }) => [id, undefined]) || []))
                }
                type="button"
                variant="outline"
              >
                {cancelButtonText}
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  )
}

export default ResultForm
