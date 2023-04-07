import FirebaseWrapper from '../../Firebase'
import { UserWrapper } from '@context/user'
import { Box } from '@mui/material'
import { NavBar } from '@components'
import { ui } from './style'

const LayoutBase = ({ children }) => {
  return (
    <UserWrapper>
      <FirebaseWrapper>
        <NavBar />
        <Box sx={ui.box}>{children}</Box>
      </FirebaseWrapper>
    </UserWrapper>
  )
}

export default LayoutBase
