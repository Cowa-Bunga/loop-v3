import type { JsonSchema, Layout } from '@jsonforms/core'

interface IForm {
  // The name/reference of the form
  reference: string
  // The schema of the form, what fields exist and the configs around their functionality
  schema: JsonSchema
  // The layout of the form, how the fields are arranged
  ui: Layout
  // The data of the form, what is doing to be submitted to the API.
  data: any
}
