import { Map, LayoutBase } from '@components'
import { Box, Drawer, Stack } from '@mui/material'
import Filter from './components/Filter'
import Drivers from './components/Drivers'

const Dashboard = () => (
  <LayoutBase>
    <Stack direction="column">
      <Drawer anchor="left" variant="permanent" open={true}>
        <Filter />
      </Drawer>
      <Box sx={{ mx: '360px' }}>
        <Map />
      </Box>
      <Drawer anchor="right" variant="permanent" open={true}>
        <Drivers />
      </Drawer>
    </Stack>
  </LayoutBase>
)

export default Dashboard
