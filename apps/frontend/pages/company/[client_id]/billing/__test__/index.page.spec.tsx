import Billing from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('Billing', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Billing />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
