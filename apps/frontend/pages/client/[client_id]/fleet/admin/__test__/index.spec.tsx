import FleetAdmin from '../index.page'
import { renderWithProviders } from '@test/helpers'

describe('FleetAdmin', function () {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<FleetAdmin />)

    expect(baseElement).toBeTruthy()
    expect(baseElement).toMatchSnapshot()
  })
})
