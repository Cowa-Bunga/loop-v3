import { rankWith, uiTypeIs } from '@jsonforms/core'

export { default as MultiSelectControl } from './MultiSelectControl'
export { default as DropdownControl } from './DropdownControl'
export { default as AutoCompleteControl } from './AutoCompleteControl'
export { default as TextInputControl } from './TextInputControl'
export { default as DateTimeControl } from './DateTimeControl'
export { default as CheckboxControl } from './CheckboxControl'

export const multiSelectControlTester = rankWith(
  3,
  uiTypeIs('MultiSelectControl')
)
export const dropdownControlTester = rankWith(3, uiTypeIs('DropdownControl'))
export const autoCompleteControlTester = rankWith(
  3,
  uiTypeIs('AutoCompleteControl')
)
export const textInputControlTester = rankWith(3, uiTypeIs('TextInputControl'))
export const dateTimeControlTester = rankWith(3, uiTypeIs('DateTimeControl'))
export const checkboxControlTester = rankWith(3, uiTypeIs('CheckboxControl'))
