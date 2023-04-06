import { Map, LayoutBase } from '@components'
import { Stack } from '@mui/material'
import Filter from './components/Filter'
import Drivers from './components/Drivers'

const Dashboard = () => {
  return (
    <LayoutBase>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Filter />
        <Map />
        <Drivers />
      </Stack>
    </LayoutBase>
  )
}

export default Dashboard
