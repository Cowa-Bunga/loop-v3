import CreateJob from '../index'
import { renderWithProviders } from '@test/helpers'

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

describe('CreateJob', () => {
  it('should render open', () => {
    const { baseElement } = renderWithProviders(
      <CreateJob handleClose={console.log} isOpen={true} />
    )

    expect(baseElement).toMatchSnapshot()
  })

  it('should render closed', () => {
    const { baseElement } = renderWithProviders(
      <CreateJob handleClose={console.log} isOpen={false} />
    )
    expect(baseElement).toMatchSnapshot()
  })
})
