import { Box } from '@mui/material'
import { NavBar, Menu as MenuDrawer } from '@components'
import { useMergeState } from '@hooks'
import { ui } from './style'

const LayoutBase = ({ children }) => {
  const [state, setState] = useMergeState({
    open: false as boolean
  })

  return (
    <>
      <NavBar open={state.open} setOpen={(open) => setState({ open })} />
      <MenuDrawer open={state.open} />
      <Box sx={{ ...ui.box }}>{children}</Box>
    </>
  )
}

export default LayoutBase
