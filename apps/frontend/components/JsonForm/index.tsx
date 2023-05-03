import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonSchema, UISchemaElement, ValidationMode } from '@jsonforms/core'

interface IProps {
  schema: JsonSchema
  ui: UISchemaElement
  model: any
  validationMode?: ValidationMode
  onChange: (data: any) => void
}

export default function JsonForm({
  schema,
  ui,
  model,
  validationMode = 'ValidateAndHide',
  onChange = (_data: unknown) => ''
}: IProps) {
  return (
    <div className="App">
      <JsonForms
        schema={schema}
        uischema={ui}
        data={model}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => onChange(data)}
        validationMode={validationMode}
      />
    </div>
  )
}
