import { Map, LayoutBase } from '@components'
import { Box, Stack } from '@mui/material'
import Filter from './components/Filter'
import Drivers from './components/Drivers'

const Dashboard = () => (
  <LayoutBase>
    <Stack direction="column">
      <Filter />
      <Box sx={{ mx: '360px' }}>
        <Map />
      </Box>
      <Drivers />
    </Stack>
  </LayoutBase>
)

export default Dashboard
