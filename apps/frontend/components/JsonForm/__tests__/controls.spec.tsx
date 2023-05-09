/* eslint-disable @typescript-eslint/ban-ts-comment */
import { renderWithProviders } from '@test/helpers'
import {
  AutoCompleteControl,
  CheckboxControl,
  DateTimeControl,
  DropdownControl,
  GooglePlacesControl,
  MultiSelectControl,
  PhoneNumberControl,
  TextInputControl
} from '../controls'
import { UISchemaElement } from '@jsonforms/core/src/models/uischema'
import { fireEvent } from '@testing-library/react'

const mockControlData = {
  data: [],
  handleChange: jest.fn(),
  path: 'test',
  id: 'test-id',
  schema: {
    enum: ['test1', 'test2'],
    options: { api_key: '' }
  },
  label: 'test-label',
  required: true,
  visible: true,
  uischema: {
    type: 'Control',
    scope: '#/properties/test',
    options: {},
    label: 'test-label',
    rule: {
      effect: 'SHOW',
      condition: {
        type: 'LEAF'
      }
    }
  } as UISchemaElement
}

jest.mock('@jsonforms/react', () => ({
  withJsonFormsControlProps: jest
    .fn()
    .mockImplementation((Component) => Component)
}))

describe('JsonForm Controls', () => {
  describe('AutoCompleteControl', () => {
    it('should render', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <AutoCompleteControl {...mockControlData} />
      )

      expect(baseElement).toMatchSnapshot()
    })
  })

  describe('CheckboxControl', () => {
    it('should render', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <CheckboxControl {...mockControlData} />
      )

      expect(baseElement).toMatchSnapshot()
    })

    it('should trigger handleChange', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <CheckboxControl {...mockControlData} />
      )

      const checkbox = baseElement.querySelector('input[type="checkbox"]')
      fireEvent.click(checkbox)
      expect(mockControlData.handleChange).toHaveBeenCalled()
    })
  })

  describe('DateTimeControl', () => {
    it('should render', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <DateTimeControl {...mockControlData} />
      )

      expect(baseElement).toMatchSnapshot()
    })
  })

  describe('DropdownControl', () => {
    it('should render', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <DropdownControl {...mockControlData} />
      )

      expect(baseElement).toMatchSnapshot()
    })
  })

  xdescribe('GooglePlacesControl', () => {
    it('should render', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <GooglePlacesControl {...mockControlData} />
      )

      expect(baseElement).toMatchSnapshot()
    })
  })

  describe('MultiSelectControl', () => {
    it('should render', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <MultiSelectControl {...mockControlData} />
      )

      expect(baseElement).toMatchSnapshot()
    })
  })

  describe('PhoneNumberControl', () => {
    it('should render', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <PhoneNumberControl {...mockControlData} />
      )

      expect(baseElement).toMatchSnapshot()
    })
  })

  describe('TextInputControl', () => {
    it('should render', () => {
      const { baseElement } = renderWithProviders(
        // @ts-ignore
        <TextInputControl {...mockControlData} />
      )

      expect(baseElement).toMatchSnapshot()
    })
  })
})
