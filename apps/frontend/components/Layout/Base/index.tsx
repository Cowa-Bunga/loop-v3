import FirebaseWrapper from '../../Firebase'
import { Box } from '@mui/material'
import { NavBar, Menu as MenuDrawer } from '@components'
import { useMergeState } from '@hooks'
import { ui } from './style'
import { UserWrapper } from '@util/context/user'

const LayoutBase = ({ children }) => {
  const [state, setState] = useMergeState({
    open: false as boolean
  })

  return (
    // <UserWrapper>
    //   <FirebaseWrapper>
    <>
      <NavBar open={state.open} setOpen={(open) => setState({ open })} />
      <MenuDrawer open={state.open} />
      <Box sx={{ ...ui.box }}>{children}</Box>
    </>
    //   </FirebaseWrapper>
    // </UserWrapper>
  )
}

export default LayoutBase
