import { Stack, Alert, Box, TextField, Input } from '@mui/material'
import ui from './style'

const Drivers = () => (
  <Box sx={ui.container}>
    <Input
      sx={ui.searchDriver}
      fullWidth
      placeholder="Search driver name or code"
    />
    <Stack sx={ui.stack} spacing={2}>
      <Alert severity="warning">Available</Alert>
      <Alert severity="success">Busy</Alert>
    </Stack>
  </Box>
)

export default Drivers
