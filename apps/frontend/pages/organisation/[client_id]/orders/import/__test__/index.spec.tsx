import OrdersImport from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('OrdersImport', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<OrdersImport />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
