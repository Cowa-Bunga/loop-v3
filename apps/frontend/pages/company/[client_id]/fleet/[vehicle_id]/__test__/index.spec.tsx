import DriverProfilePage from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('DriverProfilePage', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<DriverProfilePage />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
