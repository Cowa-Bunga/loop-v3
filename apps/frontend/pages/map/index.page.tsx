import dynamic from 'next/dynamic'
import { LayoutBase } from '@components'
import Filter from '../dashboard/components/Filter'
import Drivers from '../dashboard/components/Drivers'

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
const Cesium = dynamic(() => import('apps/frontend/components/Cesium'), {
  ssr: false
})

export default function CesiumMap() {
  return (
    <LayoutBase>
      <Filter />
      <Cesium />
      <Drivers />
    </LayoutBase>
  )
}
