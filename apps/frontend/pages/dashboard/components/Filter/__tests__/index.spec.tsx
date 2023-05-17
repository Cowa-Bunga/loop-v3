import { renderWithProviders } from '@test/helpers'
import DashboardFilter from '../index'

describe('DashboardFilter', () => {
  it('should render', () => {
    // const regions = [
    //   {
    //     id: '1',
    //     name: 'Region 1',
    //     hub_ids: ['1']
    //   }
    // ]
    // const hubs = [
    //   {
    //     id: '1',
    //     name: 'Hub 1',
    //     branches: []
    //   }
    // ]
    const component = <DashboardFilter />
    const { baseElement } = renderWithProviders(component)

    expect(baseElement).toMatchSnapshot()
  })
})
