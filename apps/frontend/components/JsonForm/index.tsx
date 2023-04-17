import { JsonForms } from '@jsonforms/react'
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'

export default function JsonForm({
  schema,
  ui,
  model,
  onChange = (_data: unknown) => ''
}) {
  return (
    <div className="App">
      <JsonForms
        schema={schema}
        uischema={ui}
        data={model}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => onChange(data)}
      />
    </div>
  )
}
