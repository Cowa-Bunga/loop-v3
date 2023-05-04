import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonSchema, UISchemaElement, ValidationMode } from '@jsonforms/core'
import { useTranslation } from '@hooks'
import { getI18n } from 'react-i18next'

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
  validationMode = 'ValidateAndShow',
  onChange = (_data: unknown) => ''
}: IProps) {
  const { t } = useTranslation()

  const createTranslator = (key, defaultMessage) => {
    const translated = t(key)
    return !translated.startsWith(key) ? translated : defaultMessage
  }

  return (
    <div className="App">
      <JsonForms
        i18n={{
          locale: getI18n().resolvedLanguage,
          translate: createTranslator
        }}
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
