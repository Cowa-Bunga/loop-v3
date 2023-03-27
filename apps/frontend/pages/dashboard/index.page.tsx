import { Map, LayoutBase } from '../../components'
import Filter from './components/Filter'
import Drivers from './components/Drivers'

export default () => {
  return (
    <LayoutBase>
      <Filter />
      <Map />
      <Drivers />
    </LayoutBase>
  )
}
