import { useState, useEffect } from 'react'
import { Map } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import DeckGL from '@deck.gl/react'
import { IconLayer, ColumnLayer, PathLayer } from '@deck.gl/layers'
import { TripsLayer } from '@deck.gl/geo-layers'
import { ScenegraphLayer } from '@deck.gl/mesh-layers'
import { Fab } from '@mui/material'

import {
  DATA_URL,
  DEFAULT_THEME,
  INITIAL_VIEW_STATE,
  ICON_MAPPING
} from './config'

let posx = -74.001
let posy = 40.7231
const initPos = () => {
  // posx = posx + 0.000001
  // posy = posy + 0.0000011
  return [posx, posy]
}

export default function MapGL({
  trips = DATA_URL.TRIPS,
  trailLength = 2000,
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
    new TripsLayer({
      id: 'trips',
      data: trips,
      getPath: (d) => d.path,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) =>
        d.vendor === 0
          ? theme.trailColor0
          : d.vendor === 2
          ? theme.trailColor2
          : theme.trailColor1,
      opacity: 0.8,
      widthMinPixels: 4,
      rounded: true,
      trailLength: 2000,
      currentTime: time,
      shadowEnabled: false
    }),

    new PathLayer({
      id: 'path-layer',
      data: trips,
      pickable: true,
      opacity: 0.4,
      widthScale: 1,
      widthMinPixels: 2,
      getPath: (d) => d.path,
      getColor: (d) => [110, 190, 120]
    }),

    new IconLayer({
      id: 'marker-layer',
      data: [
        {
          name: 'Start',
          address: 'New York City',
          exits: 4214,
          coordinates: [-74.00823, 40.71351],
          color: [140, 240, 140]
        },
        {
          name: 'Waypoint',
          address: 'Food Collection',
          exits: 4214,
          coordinates: [-74.00913, 40.74065],
          color: [140, 180, 180]
        },
        {
          name: 'End',
          address: 'New York City',
          exits: 4214,
          coordinates: [-74.00336, 40.75891],
          color: [240, 180, 140]
        }
      ],
      pickable: true,
      iconAtlas: '/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'marker',
      sizeScale: 2,
      getPosition: (d) => d.coordinates,
      getSize: (d) => 10,
      getColor: (d) => d.color
    }),

    // new ColumnLayer({
    //   id: 'graph-layer',
    //   data: [
    //     { centroid: [-74, 40.73], value: 0.22 },
    //     { centroid: [-74.0005, 40.73001], value: 0.12 },
    //     { centroid: [-74.001, 40.73002], value: 0.2 },
    //     { centroid: [-74.002, 40.73003], value: 0.13 },
    //     { centroid: [-74.0025, 40.730035], value: 0.19 },
    //     { centroid: [-74.003, 40.73004], value: 0.14 }
    //   ],
    //   diskResolution: 120,
    //   radius: 10,
    //   extruded: true,
    //   pickable: true,
    //   elevationScale: 1000,
    //   getPosition: (d) => d.centroid,
    //   getFillColor: (d) => [148, 218, d.value * 255, 255],
    //   getLineColor: [255, 100, 100],
    //   getElevation: (d) => d.value,
    //   opacity: 0.6
    // }),

    // new ScenegraphLayer({
    //   id: 'box-animated',
    //   pickable: true,
    //   scenegraph:
    //     'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
    //   getPosition: (d) => [-74, 40.7244],
    //   getOrientation: (d) => [0, 180, 90],
    //   _animations: { '*': { speed: 4 } },
    //   sizeScale: 2,
    //   _lighting: 'pbr'
    // }),

    new ScenegraphLayer({
      id: 'Car',
      data: [
        {
          name: 'Car',
          coordinates: [...initPos()]
        }
      ],
      pickable: true,
      scenegraph: '/car.glb',
      currentTime: time,
      getPosition: (d) => d.coordinates,
      getOrientation: (d) => [0, 145, 90],
      _animations: { '*': { speed: 1 } },
      sizeScale: 6,
      _lighting: 'pbr'
    }),

    new ScenegraphLayer({
      id: 'fast-food',
      data: [
        {
          name: 'Food box',
          coordinates: [-74.00336, 40.75891]
        }
      ],
      pickable: true,
      scenegraph: '/food.glb',
      getPosition: (d) => d.coordinates,
      getOrientation: (d) => [0, 280, 90],
      _animations: { '*': { speed: 1 } },
      sizeScale: 4,
      _lighting: 'pbr'
    })

    // new TileLayer({
    //   data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    //   minZoom: 0,
    //   maxZoom: 19,
    //   tileSize: 256,
    //   renderSubLayers: (props) => {
    //     const {
    //       bbox: { west, south, east, north }
    //     } = props.tile

    //     return new BitmapLayer(props, {
    //       data: null,
    //       image: props.data,
    //       _imageCoordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    //       bounds: [west, south, east, north]
    //     })
    //   }
    // })
  ]

  return (
    <div style={{ maxHeight: '100vh', overflow: 'hidden' }}>
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
