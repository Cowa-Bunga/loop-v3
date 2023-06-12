import dynamic from 'next/dynamic'
import { LayoutBase } from '@components'
import { useMergeState } from '@hooks'
import { Actions } from './actions'
import { ui } from './style'
import { Box, FabProps, SpeedDial, SpeedDialAction } from '@mui/material'
import { Map as MapIcon, Google as GoogleIcon, Route as RouteIcon } from '@mui/icons-material'
import BasicTimeline from './components/Timeline'
import BottomNav from './components/BottomNav'

const GMapGL = dynamic(() => import('../../../components/maps/GMapGL'), {
  ssr: false
})

const MapGL = dynamic(() => import('../../../components/maps/MapGL'), {
  ssr: false
})

const RoutePlanning = () => {
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

  const { toggleMap } = Actions(state, setState)

  const mapActions = [
    {
      icon: state.routeView ? <GoogleIcon /> : <RouteIcon />,
      name: state.routeView ? 'Gmaps' : 'Routing View',
      action: toggleMap
    }
  ]

  return (
    <LayoutBase>
      <Box sx={ui.timeline}>
        <BasicTimeline />
      </Box>

      <Box sx={{ ...ui.map, mb: state.bottomDrawer }}>{state.routeView ? <MapGL /> : <GMapGL mode="dark" />}</Box>

      <Box sx={ui.bottomNav}>
        <BottomNav />
      </Box>

      {state.mapControls && (
        <SpeedDial
          FabProps={ui.sizeSmall as FabProps}
          direction="left"
          ariaLabel="map controls"
          sx={ui.speedDial}
          icon={<MapIcon sx={ui.colorWhite} />}
        >
          {mapActions.map((dial) => (
            <SpeedDialAction
              FabProps={ui.sizeSmall as FabProps}
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
