import RegionSelect from '..'
import { renderWithProviders } from '@test/helpers'

describe('RegionSelect', () => {
  it('should render', () => {
    const { baseElement } = renderWithProviders(<RegionSelect />)
    expect(baseElement).toMatchSnapshot()
  })
})
