import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { JsonSchema, UISchemaElement, ValidationMode } from '@jsonforms/core'
import {
  AutoCompleteControl,
  autoCompleteControlTester,
  CheckboxControl,
  checkboxControlTester,
  DateTimeControl,
  dateTimeControlTester,
  DropdownControl,
  dropdownControlTester,
  GooglePlacesControl,
  googlePlacesControlTester,
  MultiSelectControl,
  multiSelectControlTester,
  PhoneNumberControl,
  phoneNumberControlTester,
  TextInputControl,
  textInputControlTester
} from './controls'
import {
  ChildGroupLayout,
  childGroupTester,
  GroupLayout,
  groupTester
} from './layouts'

interface IProps {
  schema: JsonSchema
  ui: UISchemaElement
  model: unknown
  validationMode?: ValidationMode
  onChange: (data: unknown) => void
}

const renderers = [
  ...materialRenderers,
  // register custom renderers
  { tester: multiSelectControlTester, renderer: MultiSelectControl },
  { tester: dropdownControlTester, renderer: DropdownControl },
  { tester: autoCompleteControlTester, renderer: AutoCompleteControl },
  { tester: textInputControlTester, renderer: TextInputControl },
  { tester: dateTimeControlTester, renderer: DateTimeControl },
  { tester: checkboxControlTester, renderer: CheckboxControl },
  { tester: phoneNumberControlTester, renderer: PhoneNumberControl },
  { tester: googlePlacesControlTester, renderer: GooglePlacesControl },
  // Custom layouts
  { tester: groupTester, renderer: GroupLayout },
  { tester: childGroupTester, renderer: ChildGroupLayout }
]

export default function JsonForm({
  schema,
  ui,
  model,
  validationMode = 'ValidateAndShow',
  onChange = (_data: unknown) => ''
}: IProps) {
  return (
    <JsonForms
      schema={schema}
      uischema={ui}
      data={model}
      renderers={renderers}
      cells={materialCells}
      onChange={({ data, errors }) => onChange(data)}
      validationMode={validationMode}
    />
  )
}
