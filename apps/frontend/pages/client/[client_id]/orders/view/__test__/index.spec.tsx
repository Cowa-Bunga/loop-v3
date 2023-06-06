import Orders from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('Orders', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Orders />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
