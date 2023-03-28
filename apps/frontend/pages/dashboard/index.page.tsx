import { Map, LayoutBase } from '../../components'
import Filter from './components/Filter'
import Drivers from './components/Drivers'

const Dashboard = () => {
  return (
    <LayoutBase>
      <Filter />
      <Map />
      <Drivers />
    </LayoutBase>
  )
}

export default Dashboard