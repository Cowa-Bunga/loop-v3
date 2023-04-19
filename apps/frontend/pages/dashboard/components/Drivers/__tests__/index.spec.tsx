import { renderWithProviders } from '@test/helpers'
import Drivers from '../'

jest.mock('./region-select', () => ({
  __esModule: true,
  default: () => <div>RegionSelect</div>
}))
jest.mock('./regions-selected', () => ({
  __esModule: true,
  default: () => <div>RegionsSelected</div>
}))
describe('Drivers', () => {
  it('should render without hubs', () => {
    const { baseElement } = renderWithProviders(<Drivers hubs={[]} />)
    expect(baseElement).toMatchSnapshot()
  })

  it('should render with hubs', () => {
    const { baseElement } = renderWithProviders(<Drivers hubs={['hub']} />)
    expect(baseElement).toMatchSnapshot()
  })
})
