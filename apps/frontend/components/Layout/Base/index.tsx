import FirebaseWrapper from '../../Firebase'
import { Box } from '@mui/material'
import { NavBar } from '@components'
import { ui } from './style'

const LayoutBase = ({ children }) => {
  return (
    <FirebaseWrapper>
      <NavBar />
      <Box sx={ui.box}>{children}</Box>
    </FirebaseWrapper>
  )
}

export default LayoutBase
