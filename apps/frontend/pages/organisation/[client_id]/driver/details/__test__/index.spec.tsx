import Fleet from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('Fleet', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Fleet />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
