import { Box } from '@mui/material'
import NavBar from '../../NavBar'
import { ui } from './style'

export default function LayoutBase({ children }) {
  return (
    <Box>
      <NavBar />
      <Box sx={ui.box}>{children}</Box>
    </Box>
  )
}
