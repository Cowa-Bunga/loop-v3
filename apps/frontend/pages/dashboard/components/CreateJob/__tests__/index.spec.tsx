import { render } from '@testing-library/react'

import CreateJob from '../index'

jest.mock('react-i18next', () => ({
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
    const { baseElement } = render(
      <CreateJob handleClose={console.log} isOpen={true} />
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should render closed', () => {
    const { baseElement } = render(
      <CreateJob handleClose={console.log} isOpen={false} />
    )
    expect(baseElement).toMatchSnapshot()
  })
})
