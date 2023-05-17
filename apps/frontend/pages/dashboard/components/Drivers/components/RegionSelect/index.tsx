import { Alert, Box, Stack } from '@mui/material'
import ui from '../../style'

export default function RegionSelect() {
  return (
    <Box sx={ui.container}>
      <Stack sx={ui.stack} spacing={2}>
        <Alert severity="info">Select a region to view drivers</Alert>
      </Stack>
    </Box>
  )
}
