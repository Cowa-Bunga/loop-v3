import { memo } from 'react'
import { LayoutBase } from '@components'
import Filter from './components/Filter'
import Drivers from './components/Drivers'
import CreateJob from './components/CreateJob'
import dynamic from 'next/dynamic'
import { useMergeState } from '@hooks'
import { Actions } from './actions'
import { ui } from './style'
import { useUserContext } from '@util/context/user'
import DistanceChart from '../../components/charts/RadialChart'
import { Box, Card, Drawer, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, TaskAltTwoTone } from '@mui/icons-material'

const GMapGL = dynamic(() => import('../../components/maps/GMapGL'), {
  ssr: false
})

const Dashboard = () => {
  const user = useUserContext().state
  const [state, setState] = useMergeState({
    right: false,
    left: true,
    data: null,
    create: false,
    mapControls: true
  })

  const { toggleLeft, toggleRight, toggleCreate } = Actions(state, setState)
  const dialActions = [{ icon: <TaskAltTwoTone />, name: 'Create Task', action: toggleCreate }]
  const MemFilter = memo(Filter)

  return (
    <LayoutBase>
      <Drawer elevation={2} sx={ui.leftDrawer} anchor="left" variant="persistent" open={state.left}>
        <Box sx={ui.filter}>
          <Box sx={ui.closedBox} onClick={toggleLeft}>
            <KeyboardDoubleArrowLeft sx={ui.closedBoxIcon} />
          </Box>
          <MemFilter />
        </Box>
      </Drawer>

      <Box sx={ui.map}>
        <Box sx={ui.openBox} onClick={toggleLeft}>
          <KeyboardDoubleArrowRight />
        </Box>
        <Card
          sx={{
            ml: state.left ? '400px' : '30px',
            mr: state.right ? '400px' : '30px'
          }}
        >
          <GMapGL mode="light" />
        </Card>
        <Box sx={ui.openBoxR} onClick={toggleRight}>
          <KeyboardDoubleArrowLeft />
        </Box>
      </Box>

      <Drawer elevation={2} sx={ui.rightDrawer} anchor="right" variant="persistent" open={state.right}>
        <Box sx={ui.filter}>
          <Box sx={ui.closedBoxIconR} onClick={toggleRight}>
            <KeyboardDoubleArrowRight sx={ui.closedBoxIcon} />
          </Box>
          <DistanceChart />
          <br />
          <Drivers hubs={user.hubs} />
        </Box>
      </Drawer>

      <SpeedDial color="primary" direction="right" ariaLabel="loop controls" sx={ui.speedDial} icon={<SpeedDialIcon />}>
        {dialActions.map((dial) => (
          <SpeedDialAction key={dial.name} icon={dial.icon} tooltipTitle={dial.name} onClick={dial.action} />
        ))}
      </SpeedDial>

      {state.create && <CreateJob handleClose={toggleCreate} />}
    </LayoutBase>
  )
}
export default Dashboard
