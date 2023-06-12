import { renderWithProviders } from '@test/helpers'
import DashboardFilter from '../index'

describe('DashboardFilter', () => {
  it('should render', () => {
    const component = <DashboardFilter />
    const { baseElement } = renderWithProviders(component)

    expect(baseElement).toMatchSnapshot()
  })
})
