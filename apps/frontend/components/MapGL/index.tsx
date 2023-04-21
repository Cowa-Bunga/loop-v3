import { useState, useEffect } from 'react'
import { Map } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import DeckGL from '@deck.gl/react'
import { IconLayer, PolygonLayer, ColumnLayer } from '@deck.gl/layers'
import { TripsLayer } from '@deck.gl/geo-layers'
import { ScenegraphLayer } from '@deck.gl/mesh-layers'

import {
  DATA_URL,
  DEFAULT_THEME,
  INITIAL_VIEW_STATE
  // LAND_COVER
} from './config'

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
}

const data = [
  {
    name: 'Colma (COLM)',
    address: '365 D Street, Colma CA 94014',
    exits: 4214,
    coordinates: [-74, 40.724]
  }
]

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
    // new PolygonLayer({
    //   id: 'ground',
    //   data: LAND_COVER,
    //   getPolygon: (f) => f,
    //   stroked: false,
    //   getFillColor: [0, 0, 0, 0]
    // }),
    new TripsLayer({
      id: 'trips',
      data: trips,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
      opacity: 0.8,
      widthMinPixels: 2,
      rounded: true,
      trailLength,
      currentTime: time,
      shadowEnabled: false
    }),
    // new PolygonLayer({
    //   id: 'buildings',
    //   data: DATA_URL.BUILDINGS,
    //   extruded: true,
    //   wireframe: true,
    //   opacity: 0.2,
    //   getPolygon: (f) => f.polygon,
    //   getElevation: (f) => f.height,
    //   getFillColor: theme.buildingColor,
    //   material: theme.material
    // })
    new IconLayer({
      id: 'icon-layer',
      data,
      pickable: true,
      // iconAtlas and iconMapping are required
      // getIcon: return a string
      iconAtlas:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'marker',

      sizeScale: 1,
      getPosition: (d) => d.coordinates,
      getSize: (d) => 20,
      getColor: (d) => [140, 180, 250]
    }),

    new ColumnLayer({
      id: 'column-layer',
      data: [
        { centroid: [-74.1, 40.731], value: 0.12 },
        { centroid: [-74.15, 40.732], value: 0.2 },
        { centroid: [-74.2, 40.733], value: 0.19 },
        { centroid: [-74.25, 40.734], value: 0.14 }
      ],
      diskResolution: 12,
      radius: 40,
      extruded: true,
      pickable: true,
      elevationScale: 2000,
      getPosition: (d) => d.centroid,
      getFillColor: (d) => [148, 168, d.value * 255, 255],
      getLineColor: [255, 100, 100],
      getElevation: (d) => d.value
    }),

    new ScenegraphLayer({
      id: 'scenegraph-layer',
      data: [
        {
          name: 'Colma (COLM)',
          address: '365 D Street, Colma CA 94014',
          exits: 4214,
          coordinates: [-74, 40.72]
        }
      ],
      pickable: true,
      scenegraph:
        'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
      getPosition: (d) => d.coordinates,
      getOrientation: (d) => [0, Math.random() * 180, 90],
      _animations: {
        '*': { speed: 5 }
      },
      sizeScale: 20,
      _lighting: 'pbr'
    })
  ]

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <DeckGL
        layers={layers}
        effects={theme.effects}
        initialViewState={initialViewState}
        controller={true}
      >
        <Map reuseMaps mapLib={maplibregl} mapStyle={mapStyle} />
      </DeckGL>
    </div>
  )
}
