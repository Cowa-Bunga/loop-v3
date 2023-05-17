import Drivers from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('Drivers', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<Drivers />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
