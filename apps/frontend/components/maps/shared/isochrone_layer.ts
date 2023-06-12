import { GeoJsonLayer, PolygonLayer } from 'deck.gl/typed'

export const layers = ({ iso }) => {
  return [
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
      opacity: 0.1
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
      opacity: 0.1,
      pointType: 'circle'
    })
  ]
}
