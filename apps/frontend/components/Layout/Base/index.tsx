import { Box } from '@mui/material'
import NavBar from '../../AppBar'

export default function LayoutBase({ children }) {
  return (
    <Box>
      <NavBar />
      <Box sx={{ pt: '60px' }}>{children}</Box>
    </Box>
  )
}
