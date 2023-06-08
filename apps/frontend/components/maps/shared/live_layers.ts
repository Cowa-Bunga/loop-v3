import { ICON_MAPPING, ASSETS } from './config'
import {
  IconLayer,
  GeoJsonLayer,
  ScenegraphLayer,
  HexagonLayer,
  ColumnLayer,
  PolygonLayer,
  PathLayer,
  TripsLayer
} from 'deck.gl/typed'

import MOCK from './reme.json'

const data = [
  {
    path: MOCK.filter((v) => v.client_id !== 'UNKNOWN')
      .map((v) => [v.location[1], v.location[0], 1, new Date(v.timestamp).getTime() - 1686129782767])
      .sort((a, b) => a[3] - b[3]),
    name: 'driver: Reme',
    color: [200, 0, 250]
  }
]

let base = 0

export const layers = ({ driver, start, waypoints, end, trip, iso, theme }) => {
  console.warn('data', data)

  return [
    new ScenegraphLayer({
      id: 'driver',
      data: [
        {
          coordinates: data[0].path[data[0].path.length - 1],
          label: 'Driver: Reme'
        }
      ],
      pickable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scenegraph: ASSETS.OBJ_CAR as any,
      getPosition: (d) => d.coordinates,
      getOrientation: (d) => [0, 10, 90],
      _animations: {
        '*': { speed: 1 }
      },
      sizeScale: 1,
      _lighting: 'pbr',
      material: theme.material,
      onHover: ({ object, x, y }) => {
        console.log('driver:hover', object)
      }
    }),

    new IconLayer({
      id: 'map-markers',
      data: MOCK.map((v) => ({ ...v, label: v.name })),
      pickable: true,
      iconAtlas: ASSETS.ICON,
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'marker',
      sizeScale: 2,
      getPosition: (d) => [d.location[1], d.location[0]],
      getSize: (d) => 10,
      getColor: (d) => [100, (base = base + 10), 255]
    }),

    new TripsLayer({
      id: 'trips-layer',
      data,
      getPath: (d) => d.path,
      getColor: [255, 0, 255],
      opacity: 0.2,
      widthMinPixels: 4,
      fadeTrail: true,
      trailLength: 20,
      // currentTime: time,
      animated: true
    })
  ]
}
