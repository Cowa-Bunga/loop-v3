/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ICON_MAPPING, ASSETS } from '../shared/config'
import {
  ScenegraphLayer,
  IconLayer,
  GeoJsonLayer,
  PolygonLayer,
  ColumnLayer,
  Position
} from 'deck.gl/typed'

/* @ts-ignore */
export const layers = ({ driver, waypoints, trip, iso, theme, start, end }) => [
  new ScenegraphLayer({
    id: 'driver',
    data: [
      {
        coordinates: driver,
        label: 'Driver: John Smith \n#8765789'
      }
    ] as LayerDataProps[],
    pickable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scenegraph: ASSETS.OBJ_CAR as any,
    /* @ts-ignore */
    getPosition: (d: LayerDataProps) => d.coordinates,
    getOrientation: (d) => [0, 10, 90],
    _animations: {
      '*': { speed: 1 }
    },
    sizeScale: 2,
    _lighting: 'pbr',
    onHover: ({ object, x, y }) => {
      console.log('driver:hover')
    }
  }),

  new ScenegraphLayer({
    id: 'driver-pin',
    data: [
      {
        coordinates: driver,
        label: 'Driver: John Smith \n#8765789'
      }
    ] as LayerDataProps[],
    pickable: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scenegraph: ASSETS.OBJ_MARKER as any,
    /* @ts-ignore */
    getPosition: (d: LayerDataProps) => [
      d.coordinates[0],
      d.coordinates[1],
      100
    ],
    getOrientation: (d) => [0, 10, 90],
    _animations: {
      '*': { speed: 1 }
    },
    sizeScale: 20,
    _lighting: 'pbr'
  }),

  new ColumnLayer({
    id: 'point-highlight',
    data: () =>
      [
        { point: start, label: 'HUB', color: [100, 200, 100] },
        { point: end, label: 'CUSTOMER x', color: [200, 100, 100] },
        { point: driver, label: 'Driver x', color: [100, 200, 200] }
      ] as LayerDataProps,
    radius: 40,
    opacity: 0.04,
    getPosition: (d: LayerDataProps) => [d.point[0], d.point[1], 100],
    /* @ts-ignore */
    getFillColor: (d: LayerDataProps) => d.color
  }),

  new IconLayer({
    id: 'driver-map-markers',
    data: [{ coordinates: driver, color: [250, 200, 200] }],
    pickable: true,
    iconAtlas: ASSETS.ICON,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => 'marker',
    sizeScale: 3,
    /* @ts-ignore */
    getPosition: (d: LayerDataProps) => d.coordinates,
    getSize: (d) => 10,
    getColor: (d) => [255, 0, 0]
  }),

  new IconLayer({
    id: 'map-markers',
    data: waypoints,
    pickable: true,
    iconAtlas: ASSETS.ICON,
    iconMapping: ICON_MAPPING,
    getIcon: (d) => 'marker',
    sizeScale: 2.5,
    /* @ts-ignore */
    getPosition: (d: LayerDataProps) => d.coordinates,
    getSize: (d) => 10,
    getColor: (d) => [250, 0, 250]
  }),

  // route path
  new GeoJsonLayer({
    id: 'trip-path',
    data: trip,
    pickable: true,
    extruded: true,
    lineWidthMinPixels: 4,
    /* @ts-ignore */
    getLineColor: (d) => d.color || [255, 0, 255],
    getLineWidth: 4,
    opacity: 0.4,
    getPath: (d) => d.geometry.coordinates,
    material: theme.material
  }),

  // isochrone view (hub/loc reachability)
  new PolygonLayer({
    id: 'hub-isochrone-fill',
    data: iso?.features,
    pickable: false,
    stroked: true,
    filled: true,
    wireframe: true,
    lineWidthMinPixels: 1,
    /* @ts-ignore */
    getPolygon: (d: LayerDataProps) => d.geometry.coordinates,
    getFillColor: (d) => [6, 56, 99],
    getLineWidth: 1,
    opacity: 0.001
  })
]

interface LayerDataProps {
  label?: string
  point?: number[]
  color?: number[]
  coordinates?: Position[]
  geometry?: {
    label?: string
    coordinates?: Position
  }
}
