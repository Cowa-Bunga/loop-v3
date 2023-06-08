// import { memo } from 'react'
import { LayoutBase, TimeLine } from '@components'
import dynamic from 'next/dynamic'
import { useMergeState } from '@hooks'
import { Actions } from './actions'
import { ui } from './style'
// import { useUserContext } from '@util/context/user'
import { Box, Card, Drawer, SpeedDial, SpeedDialAction } from '@mui/material'
import {
  // TaskAltTwoTone,
  // CarRental,
  Map as MapIcon,
  Google as GoogleIcon,
  Route as RouteIcon,
  KeyboardDoubleArrowUp
} from '@mui/icons-material'

const GMapGL = dynamic(() => import('../../../components/maps/GMapGL'), {
  ssr: false
})

const MapGL = dynamic(() => import('../../../components/maps/MapGL'), {
  ssr: false
})

const RoutePlanning = () => {
  // const user = useUserContext().state
  const [state, setState] = useMergeState({
    right: false,
    left: false,
    data: null,
    create: false,
    routeView: true,
    timeline: true,
    mapControls: true,
    bottomDrawer: '0px'
  })

  const { toggleBottom, toggleMap } = Actions(state, setState)

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
        disableScrollLock
        elevation={1}
        keepMounted
        hideBackdrop
        anchor="bottom"
        variant="persistent"
        open={state.timeline}
        sx={ui.bottomDrawer}
        PaperProps={
          {
            padding: 0,
            border: 0,
            zIndex: 0
          } as unknown
        }
      >
        <TimeLine key={`key-${state.bottomDrawer}`} height={state.bottomDrawer} />
      </Drawer>

      <Box sx={ui.bottomBox} onClick={toggleBottom}>
        <KeyboardDoubleArrowUp sx={ui.bottomdBoxIcon} />
      </Box>

      <Box sx={ui.map}>
        <Card sx={{ mb: state.bottomDrawer }}>{state.routeView ? <MapGL /> : <GMapGL />}</Card>
      </Box>

      {state.mapControls && (
        <SpeedDial
          FabProps={{ size: 'small' }}
          direction="left"
          ariaLabel="map controls"
          sx={ui.speedDial}
          icon={<MapIcon />}
        >
          {mapActions.map((dial) => (
            <SpeedDialAction
              FabProps={{ size: 'small' }}
              key={dial.name}
              icon={dial.icon}
              tooltipTitle={dial.name}
              onClick={dial.action}
            />
          ))}
        </SpeedDial>
      )}
    </LayoutBase>
  )
}

export default RoutePlanning
