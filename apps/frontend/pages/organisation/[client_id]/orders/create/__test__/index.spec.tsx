import CreateOrder from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('CreateOrder', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<CreateOrder />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
