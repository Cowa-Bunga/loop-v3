import ParcelsForm from '../ParcelsForm'
import { fireEvent, render } from '@testing-library/react'
import { renderWithProviders } from '@test/helpers'
import * as axe from 'axe-core'

const mockSchema = {
  schema: {
    type: 'object',
    properties: {
      qrCode: {
        type: 'string'
      },
      size: {
        type: 'string',
        enum: ['small', 'medium', 'large'] // enums should be localized keys
      }
    }
  },

  ui: {
    type: 'HorizontalLayout',
    elements: [
      {
        type: 'TextInputControl',
        scope: '#/properties/qrCode',
        i18n: 'create_task_form.parcels.qrCode'
      },
      {
        type: 'DropdownControl',
        scope: '#/properties/size',
        i18n: 'create_task_form.parcels.size'
      }
    ]
  },

  data: {
    qrCode: '',
    size: ''
  }
}

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  getI18n: () => ({
    resolvedLanguage: 'en'
  })
}))

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  useTranslation: () => ({
    t: jest.fn().mockImplementation((key) => key)
  })
}))

describe('ParcelsForm', () => {
  it('should render with no parcels', () => {
    const { baseElement } = renderWithProviders(
      <ParcelsForm
        schema={mockSchema.schema}
        model={mockSchema.data}
        ui={mockSchema.ui}
        addParcel={jest.fn()}
        onChange={jest.fn()}
        parcels={[]}
      />
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should render with  parcels', () => {
    const { baseElement } = render(
      <ParcelsForm
        schema={mockSchema.schema}
        model={mockSchema.data}
        ui={mockSchema.ui}
        addParcel={jest.fn()}
        onChange={jest.fn()}
        parcels={[
          {
            size: 'small',
            qrCode: '123'
          }
        ]}
      />
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should call addParcel when IconButton is clicked', () => {
    const mockAddParcel = jest.fn()
    const { baseElement } = renderWithProviders(
      <ParcelsForm
        schema={mockSchema.schema}
        model={mockSchema.data}
        ui={mockSchema.ui}
        addParcel={mockAddParcel}
        onChange={jest.fn()}
        parcels={[
          {
            size: 'small',
            qrCode: '123'
          }
        ]}
      />
    )

    const addButton = baseElement.querySelector(
      "button[aria-label='Add parcel']"
    )

    fireEvent.click(addButton)

    expect(mockAddParcel).toHaveBeenCalled()
  })

  it('Accessibility check', async () => {
    const { container } = renderWithProviders(
      <ParcelsForm
        schema={mockSchema.schema}
        model={mockSchema.data}
        ui={mockSchema.ui}
        addParcel={jest.fn()}
        onChange={jest.fn()}
        parcels={[]}
      />
    )
    const results = await axe.run(container)
    expect(results.violations.length).toBe(0)
  })
})
