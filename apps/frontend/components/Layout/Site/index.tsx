import { Box } from '@mui/material'
import { UserWrapper } from '@util/context/user'
import NavBar from '../../NavBar'
import { ui } from './style'

export default function LayoutBase({ children }) {
  return (
    <Box>
      <NavBar open={false} setOpen={() => ''} />
      <Box sx={ui.box}>{children}</Box>
    </Box>
  )
}
