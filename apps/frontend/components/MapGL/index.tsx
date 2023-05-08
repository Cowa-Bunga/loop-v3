import { Map } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import { DEFAULT_THEME, ICON_MAPPING, DATASET, ASSETS } from './config'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { useEffect, useMergeState } from '@hooks'
import DeckGL from '@deck.gl/react'
import { Settings as SettingsIcon } from '@mui/icons-material'
import {
  IconLayer,
  GeoJsonLayer,
  ScenegraphLayer,
  HexagonLayer,
  PolygonLayer
} from 'deck.gl'
import { ui } from './style'
import {
  Map as MapIcon,
  SmartButton,
  Send as SendIcon,
  LoopRounded as LoopIcon
} from '@mui/icons-material'

export default function MapGL({ theme = DEFAULT_THEME }) {
  const [state, setState] = useMergeState({
    route: null,
    iso: null,
    start: [],
    end: []
  })

  // test
  useEffect(() => {
    !state.route &&
      fetch(DATASET.ROUTE)
        .then((res) => res.json())
        .then((res) => {
          res && setState(res)
        })

    !state.iso &&
      fetch(DATASET.ISOCHRONE)
        .then((res) => res.json())
        .then((res) => {
          return setState({ iso: res?.isochrones?.raw })
        })
  }, [setState, state.iso, state.route])

  const trip = state.route?.routes
  const start = [state.start?._longitude || 0, state.start?._latitude || 0]
  const end = [state.end?._longitude || 0, state.end?._latitude || 0]

  const waypoints =
    state.route?.waypoints?.map((v, i) => ({
      ...v,
      coordinates: v.location,
      color: i === 0 ? [140, 240, 140] : [200, 100, 100]
    })) || []

  const layers = [
    // driver
    new ScenegraphLayer({
      id: 'scenegraph-car',
      data: [
        {
          coordinates: [end[0], end[1] + 0.0003],
          label: 'Driver: John Smith \n#8765789'
        }
      ],
      pickable: true,
      scenegraph: '/assets/car.glb',
      getPosition: (d) => d.coordinates,
      getOrientation: (d) => [0, 90, 90],
      _animations: {
        '*': { speed: 1 }
      },
      sizeScale: 10,
      _lighting: 'pbr'
    }),

    // markers
    new IconLayer({
      id: 'marker-layer',
      data: waypoints,
      pickable: true,
      iconAtlas: ASSETS.ICON,
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'marker',
      sizeScale: 2,
      getPosition: (d) => d.coordinates,
      getSize: (d) => 10,
      getColor: (d) => d.color
    }),

    // point highlights
    new HexagonLayer({
      id: 'hexagon-layer',
      data: [
        { point: start, label: 'HUB' },
        { point: end, label: 'CUSTOMER x' }
      ],
      pickable: true,
      radius: 40,
      opacity: 0.4,
      getPosition: (d) => d.point,
      getSize: (d) => 10,
      getFillColor: (d) => [48, 128, 255, 255]
    }),

    // route
    new GeoJsonLayer({
      id: 'geojson-layer',
      data: trip,
      pickable: true,
      lineWidthMinPixels: 4,
      getLineColor: (d) => [150, 250, 150],
      getLineWidth: 4,
      opacity: 0.2,
      getPath: (d) => d.geometry.coordinates,
      material: theme.material
    }),

    // isochrone view
    new PolygonLayer({
      id: 'polygon-layer',
      data: state.iso?.features,
      pickable: true,
      stroked: true,
      filled: true,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: (d) => d.geometry.coordinates,
      // getElevation: d => 0,
      getFillColor: (d) => [160, 140, 240],
      getLineColor: [80, 80, 80],
      getLineWidth: 1,
      opacity: 0.001
    }),

    new GeoJsonLayer({
      id: 'distance-layer',
      data: state.iso,
      pickable: true,
      lineWidthMinPixels: 2,
      getLineColor: (d) => [50, 250, 250],
      extruded: true,
      lineWidthScale: 20,
      getFillColor: [160, 160, 180, 200],
      getPointRadius: 100,
      getLineWidth: 2,
      getElevation: 30,
      opacity: 0.01
    })
  ]

  const actions = [
    { icon: <MapIcon />, name: 'Map' },
    { icon: <SmartButton />, name: 'Trip Analysis' },
    { icon: <LoopIcon />, name: 'Routing' },
    { icon: <SendIcon />, name: 'Send' }
  ]

  return (
    <div style={ui.container}>
      <DeckGL
        getTooltip={({ object }) => object?.label && object.label}
        layers={layers}
        initialViewState={{
          latitude: start[1],
          longitude: start[0],
          zoom: 12,
          pitch: 45,
          bearing: 0
        }}
        controller={true}
        _animate={true}
      >
        <Map reuseMaps mapLib={maplibregl} mapStyle={ASSETS.MAP_STYLE} />
      </DeckGL>

      <SpeedDial
        ariaLabel="loop controls"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SettingsIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  )
}
