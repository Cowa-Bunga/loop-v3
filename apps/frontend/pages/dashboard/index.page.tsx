import { memo } from 'react'
import { LayoutBase } from '@components'
import { Box, Drawer, Card } from '@mui/material'
import Filter from './components/Filter'
import Drivers from './components/Drivers'
import dynamic from 'next/dynamic'
import { useMergeState } from '@hooks'
import { Actions } from './actions'
import { ui } from './style'
import {
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowLeft
} from '@mui/icons-material'

const DeckMap = dynamic(() => import('../../components/MapGL'), {
  ssr: false
})

const Dashboard = () => {
  const [state, setState] = useMergeState({
    right: false,
    left: false
  })

  const { toggleLeft, toggleRight } = Actions(state, setState)

  const MemFilter = memo(Filter)

  return (
    <LayoutBase>
      <Drawer
        sx={ui.leftDrawer}
        anchor="left"
        variant="persistent"
        open={state.left}
      >
        <Box sx={ui.filter}>
          <Box sx={ui.closedBox} onClick={toggleLeft}>
            <KeyboardDoubleArrowLeft sx={ui.closedBoxIcon} />
          </Box>
          <MemFilter hubs={[]} regions={[]} onChange={() => ''} regionHub="" />
        </Box>
      </Drawer>

      <Box
        sx={{
          height: 'calc(100vh-60px)',
          overflow: 'hidden'
        }}
      >
        <Box sx={ui.openBox} onClick={toggleLeft}>
          <KeyboardDoubleArrowRight />
        </Box>
        <Card
          sx={{
            ml: state.left ? '560px' : '30px',
            mr: state.right ? '440px' : '30px'
          }}
        >
          <DeckMap />
        </Card>
        <Box sx={ui.openBoxR} onClick={toggleRight}>
          <KeyboardDoubleArrowLeft />
        </Box>
      </Box>

      <Drawer
        sx={ui.rightDrawer}
        anchor="right"
        variant="persistent"
        open={state.right}
      >
        <Box sx={ui.filter}>
          <Box sx={ui.closedBoxIconR} onClick={toggleRight}>
            <KeyboardDoubleArrowRight sx={ui.closedBoxIcon} />
          </Box>
          <Drivers hubs={[]} />
        </Box>
      </Drawer>
    </LayoutBase>
  )
}
export default Dashboard
