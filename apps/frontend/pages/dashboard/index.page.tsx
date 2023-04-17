import { Map, LayoutBase } from '@components'
import { Box, Stack } from '@mui/material'

const Dashboard = () => (
  <LayoutBase>
    <Stack direction="column">
      <Box>
        <Map />
      </Box>
    </Stack>
  </LayoutBase>
)

export default Dashboard
