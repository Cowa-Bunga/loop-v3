import Settings from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('Settings', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Settings />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
