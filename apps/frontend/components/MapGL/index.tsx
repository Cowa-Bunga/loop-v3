import { useState, useEffect } from 'react'
import { Map } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import DeckGL from '@deck.gl/react'
import { PolygonLayer } from '@deck.gl/layers'
import { TripsLayer } from '@deck.gl/geo-layers'
import { Box } from '@mui/material'
import {
  DATA_URL,
  DEFAULT_THEME,
  INITIAL_VIEW_STATE,
  LAND_COVER
} from './config'

export default function MapGL({
  trips = DATA_URL.TRIPS,
  trailLength = 180,
  initialViewState = INITIAL_VIEW_STATE,
  mapStyle = DATA_URL.MAP_STYLE,
  theme = DEFAULT_THEME,
  // unit corresponds to the timestamp in source data
  loopLength = 1800,
  animationSpeed = 1
}) {
  const [time, setTime] = useState(0)
  const [animation] = useState({ id: null })

  const animate = () => {
    setTime((t) => (t + animationSpeed) % loopLength)
    animation.id = window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(animation.id)
  }, [animation])

  const layers = [
    new PolygonLayer({
      id: 'ground',
      data: LAND_COVER,
      getPolygon: (f) => f,
      stroked: false,
      getFillColor: [0, 0, 0, 0]
    }),
    new TripsLayer({
      id: 'trips',
      data: trips,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
      opacity: 0.4,
      widthMinPixels: 2,
      rounded: true,
      trailLength,
      currentTime: time,
      shadowEnabled: false
    }),
    new PolygonLayer({
      id: 'buildings',
      data: DATA_URL.BUILDINGS,
      extruded: true,
      wireframe: true,
      opacity: 0.4,
      getPolygon: (f) => f.polygon,
      getElevation: (f) => f.height,
      getFillColor: theme.buildingColor,
      material: theme.material
    })
  ]

  return (
    <DeckGL
      layers={layers}
      effects={theme.effects}
      initialViewState={initialViewState}
      controller={true}
    >
      <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} />
    </DeckGL>
  )
}
