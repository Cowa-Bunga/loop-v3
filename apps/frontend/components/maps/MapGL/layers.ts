import { ICON_MAPPING, ASSETS } from '../shared/config'
import {
  IconLayer,
  GeoJsonLayer,
  ScenegraphLayer,
  HexagonLayer,
  ColumnLayer,
  PolygonLayer
} from 'deck.gl'

export const layers = ({ driver, start, waypoints, end, trip, iso, theme }) => {
  return [
    new ScenegraphLayer({
      id: 'driver',
      data: [
        {
          coordinates: driver,
          label: 'Driver: John Smith \n#8765789'
        }
      ],
      pickable: true,
      scenegraph: ASSETS.OBJ_CAR as unknown,
      getPosition: (d) => d.coordinates,
      getOrientation: (d) => [0, 10, 90],
      _animations: {
        '*': { speed: 1 }
      },
      sizeScale: 5,
      _lighting: 'pbr',
      material: theme.material,
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
      ],
      pickable: true,
      scenegraph: ASSETS.OBJ_MARKER,
      getPosition: (d) => [d.coordinates[0], d.coordinates[1], 100],
      getOrientation: (d) => [0, 10, 90],
      _animations: {
        '*': { speed: 1 }
      },
      sizeScale: 20,
      _lighting: 'pbr',
      material: theme.material
    }),

    new IconLayer({
      id: 'driver-map-markers',
      data: [{ coordinates: driver, color: [200, 200, 250] }],
      pickable: true,
      iconAtlas: ASSETS.ICON,
      iconMapping: ICON_MAPPING,
      getIcon: (d) => 'marker',
      sizeScale: 2,
      getPosition: (d) => d.coordinates,
      getSize: (d) => 10,
      getColor: (d) => d.color
    }),

    // map markers
    new IconLayer({
      id: 'map-markers',
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

    new ColumnLayer({
      id: 'point-highlight',
      data: [
        { point: start, label: 'HUB', color: [100, 200, 100] },
        { point: end, label: 'CUSTOMER x', color: [200, 100, 100] },
        { point: driver, label: 'Driver x', color: [100, 200, 200] }
      ],
      radius: 40,
      opacity: 0.04,
      getPosition: (d) => [d.point[0], d.point[1], 100],
      getFillColor: (d) => d.color
    }),

    new HexagonLayer({
      id: 'hex-highlight',
      data: [
        { point: start, label: 'HUB', color: [100, 200, 100] },
        { point: end, label: 'CUSTOMER x', color: [200, 100, 100] },
        { point: driver, label: 'Driver x', color: [100, 200, 200] }
      ],
      radius: 10,
      elevationScale: 100,
      extruded: true,
      opacity: 0.6,
      coverage: 0.88,
      lowerPercentile: 50,
      getPosition: (d) => [d.point[0], d.point[1], 0],
      getColorValue: (d) => d.color,
      getElevationWeight: (d) => 100
    }),

    // route path
    new GeoJsonLayer({
      id: 'trip-path',
      data: trip,
      pickable: true,
      lineWidthMinPixels: 3,
      getLineColor: (d) => d.color || [106, 256, 199],
      getLineWidth: 5,
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
      getPolygon: (d) => d.geometry.coordinates,
      // getElevation: d => 0,
      getFillColor: (d) => [6, 56, 99],
      // getLineColor: [80, 80, 80],
      getLineWidth: 1,
      opacity: 0.01
    }),

    new GeoJsonLayer({
      id: 'hub-isochrone',
      data: iso,
      pickable: true,
      lineWidthMinPixels: 1,
      getLineColor: (d) => [50, 250, 250],
      extruded: true,
      lineWidthScale: 20,
      getFillColor: [160, 160, 180, 200],
      getPointRadius: 100,
      getLineWidth: 2,
      getElevation: 30,
      opacity: 0.01,
      pointType: 'circle'
    })
  ]
}
