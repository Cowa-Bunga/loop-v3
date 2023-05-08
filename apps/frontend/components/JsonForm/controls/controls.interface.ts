import { JsonSchema, UISchemaElement } from '@jsonforms/core'

export interface ISelectControl {
  id: string
  data: any
  path: string
  label: string
  schema: JsonSchema
  uischema: UISchemaElement
  required?: boolean

  handleChange(path: string, value: any): void
}
