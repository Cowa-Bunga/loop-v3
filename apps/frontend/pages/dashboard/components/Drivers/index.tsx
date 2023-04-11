import { Stack, Alert, Box, Drawer, TextField } from '@mui/material'
import ui from './style'

const Drivers = () => (
  <Box sx={ui.container}>
    <h4>Driver Activity</h4>
    <Box>
      <TextField fullWidth placeholder="Search driver name or code" />
      <Stack sx={ui.stack} spacing={2}>
        <Alert severity="warning">Available</Alert>
        <Alert severity="success">Busy</Alert>
      </Stack>
    </Box>
  </Box>
)

export default Drivers
