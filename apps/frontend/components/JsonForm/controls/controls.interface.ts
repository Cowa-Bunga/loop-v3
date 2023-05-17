import { JsonSchema, UISchemaElement } from '@jsonforms/core'

export interface ISelectControl {
  id: string
  data: unknown | unknown[] | boolean | string | void
  path: string
  label: string
  schema: JsonSchema
  uischema: UISchemaElement
  required?: boolean

  handleChange(path: string, value: unknown): void
}
