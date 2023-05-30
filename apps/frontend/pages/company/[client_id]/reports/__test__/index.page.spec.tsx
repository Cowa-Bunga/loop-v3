import Reports from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('Reports', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Reports />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
