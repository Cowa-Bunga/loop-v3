import { memo } from 'react'
import { LayoutBase } from '@components'
import Filter from './components/Filter'
import Drivers from './components/Drivers'
import CreateJob from './components/CreateJob'
import dynamic from 'next/dynamic'
import { Actions } from './actions'
import { ui } from './style'
import { useMergeState } from '@hooks'
import { useUserContext } from '@util/context/user'
import DistanceChart from './components/Chart'
import {
  Box,
  Card,
  Drawer,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@mui/material'
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  TaskAltTwoTone,
  Map as MapIcon,
  Google as GoogleIcon,
  Route as RouteIcon
} from '@mui/icons-material'

const GMapGL = dynamic(() => import('../../components/maps/GMapGL'), {
  ssr: false
})

const MapGL = dynamic(() => import('../../components/maps/MapGL'), {
  ssr: false
})

const Dashboard = () => {
  const user = useUserContext().state

  const [state, setState] = useMergeState({
    right: false,
    left: false,
    data: null,
    create: false,
    routeView: true
  })

  const { toggleLeft, toggleRight, toggleCreate, toggleMap } = Actions(
    state,
    setState
  )

  const MemFilter = memo(Filter)

  const dialActions = [
    { icon: <TaskAltTwoTone />, name: 'Create Task', action: toggleCreate }
  ]

  const mapActions = [
    {
      icon: state.routeView ? <GoogleIcon /> : <RouteIcon />,
      name: state.routeView ? 'Gmaps' : 'Routing View',
      action: toggleMap
    }
  ]

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

      <Box sx={ui.map}>
        <Box sx={ui.openBox} onClick={toggleLeft}>
          <KeyboardDoubleArrowRight />
        </Box>
        <Card
          sx={{
            ml: state.left ? '560px' : '30px',
            mr: state.right ? '440px' : '30px'
          }}
        >
          {state.routeView ? <MapGL /> : <GMapGL material={null} />}
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
          <DistanceChart />
          <br />
          <Drivers hubs={user.hubs} />
        </Box>
      </Drawer>

      <SpeedDial
        ariaLabel="loop controls"
        sx={ui.speedDial2}
        icon={<SpeedDialIcon />}
      >
        {dialActions.map((dial) => (
          <SpeedDialAction
            key={dial.name}
            icon={dial.icon}
            tooltipTitle={dial.name}
            onClick={dial.action}
          />
        ))}
      </SpeedDial>

      <SpeedDial
        ariaLabel="map controls"
        sx={{
          ...ui.speedDial,
          right: state.routeView ? 50 : 100,
          bottom: state.routeView ? 16 : 20
        }}
        icon={<MapIcon />}
      >
        {mapActions.map((dial) => (
          <SpeedDialAction
            key={dial.name}
            icon={dial.icon}
            tooltipTitle={dial.name}
            onClick={dial.action}
          />
        ))}
      </SpeedDial>

      <CreateJob isOpen={state.create} handleClose={toggleMap} />
    </LayoutBase>
  )
}
export default Dashboard
