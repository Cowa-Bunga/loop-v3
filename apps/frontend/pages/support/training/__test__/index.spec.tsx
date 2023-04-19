import Training from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('Training', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Training />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
