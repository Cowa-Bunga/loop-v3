import IntelTools from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('IntelTools', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<IntelTools />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
