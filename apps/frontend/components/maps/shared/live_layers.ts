import { ICON_MAPPING, ASSETS } from './config'
import { ColumnLayer, IconLayer, ScenegraphLayer, TripsLayer } from 'deck.gl/typed'
import MOCK from './reme.json'

// parse test data
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

export const layers = ({ theme }) => {
  return [
    new IconLayer({
      id: 'map-markers',
      data: MOCK.map((v) => ({ ...v, label: 'reme' })),
      pickable: true,
      iconAtlas: ASSETS.ICON,
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'marker',
      sizeScale: 2,
      getPosition: (d) => [d.location[1], d.location[0]],
      getSize: (d) => 10,
      getColor: (d) => [200, (base = (base > 250 ? 250 : base) + 1), 255],
      opacity: 0.4
    }),

    // Path
    new TripsLayer({
      id: 'trips-layer',
      data,
      getPath: (d) => d.path,
      getColor: [255, 0, 255],
      opacity: 0.2,
      widthMinPixels: 6,
      fadeTrail: true,
      trailLength: 200,
      // currentTime: time,
      animated: true
    }),

    // Car
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
      sizeScale: 4,
      _lighting: 'pbr',
      material: theme.material,
      onHover: ({ object, x, y }) => {
        console.log('driver:hover', object)
      }
    }),

    // Driver Pin
    new ScenegraphLayer({
      id: 'driver-pin',
      data: [
        {
          coordinates: data[0].path[data[0].path.length - 1],
          label: 'Driver: Reme'
        }
      ],
      pickable: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scenegraph: ASSETS.OBJ_MARKER as any,
      getPosition: (d) => [d.coordinates[0], d.coordinates[1], 100],
      getOrientation: (d) => [0, 10, 90],
      _animations: {
        '*': { speed: 1 }
      },
      sizeScale: 20,
      _lighting: 'pbr',
      material: theme.material
    }),

    // light
    new ColumnLayer({
      id: 'point-highlight',
      data: [
        { point: data[0].path[0], label: 'Start', color: [100, 45, 255] },
        { point: data[0].path[data[0].path.length - 1], label: 'Driver', color: [100, 200, 200] }
      ],
      radius: 40,
      opacity: 0.04,
      getPosition: (d) => [d.point[0], d.point[1], 100],
      getFillColor: (d) => d.color
    })
  ]
}
