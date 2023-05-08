import { rankWith, uiTypeIs } from '@jsonforms/core'

export { default as MultiSelectControl } from './MultiSelectControl'
export { default as DropdownControl } from './DropdownControl'
export { default as AutoCompleteControl } from './AutoCompleteControl'
export { default as TextInputControl } from './TextInputControl'
export { default as DateTimeControl } from './DateTimeControl'
export { default as CheckboxControl } from './CheckboxControl'
export { default as PhoneNumberControl } from './PhoneNumberControl'
export { default as GooglePlacesControl } from './GooglePlacesControl'

const RANK = 3

export const multiSelectControlTester = rankWith(
  RANK,
  uiTypeIs('MultiSelectControl')
)
export const dropdownControlTester = rankWith(RANK, uiTypeIs('DropdownControl'))
export const autoCompleteControlTester = rankWith(
  RANK,
  uiTypeIs('AutoCompleteControl')
)
export const textInputControlTester = rankWith(
  RANK,
  uiTypeIs('TextInputControl')
)
export const dateTimeControlTester = rankWith(RANK, uiTypeIs('DateTimeControl'))
export const checkboxControlTester = rankWith(RANK, uiTypeIs('CheckboxControl'))
export const phoneNumberControlTester = rankWith(
  RANK,
  uiTypeIs('PhoneNumberControl')
)
export const googlePlacesControlTester = rankWith(
  RANK,
  uiTypeIs('GooglePlacesControl')
)
