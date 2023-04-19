import Support from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('Support', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Support />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
