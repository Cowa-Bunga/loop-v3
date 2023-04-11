import FirebaseWrapper from '../../Firebase'
import { UserWrapper } from '@context/user'
import { Box } from '@mui/material'
import { NavBar, Menu as MenuDrawer } from '@components'
import { useMergeState, useSession } from '@hooks'
import { ui } from './style'

// @see: https://mui.com/blog/mui-x-v6/ - possible upgrade to v6
// TODO: proper layout controls
const LayoutBase = ({ children }) => {
  const { data: session } = useSession()
  const [state, setState] = useMergeState({
    open: false as boolean
  })

  return (
    <UserWrapper>
      <FirebaseWrapper>
        <NavBar open={state.open} setOpen={setState} />
        <MenuDrawer open={state.open} />
        <Box sx={{ ...ui.box }}>{children}</Box>
      </FirebaseWrapper>
    </UserWrapper>
  )
}

export default LayoutBase
