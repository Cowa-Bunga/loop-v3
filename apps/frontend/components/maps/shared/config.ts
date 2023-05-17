export const DEFAULT_THEME = {
  material: {
    ambient: 0.8,
    diffuse: 0.6,
    shininess: 20,
    specularColor: [200, 200, 240]
  }
}

export const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
}

export const ASSETS = {
  PIN: '/assets/pin.png',
  ICON: '/assets/icon-atlas.png',
  OBJ_BIKE: '/assets/bike.glb',
  OBJ_POLY_CAR: '/assets/low_poly_car.glb',
  OBJ_CAR: '/assets/car.glb',
  OBJ_TRUCK: '/assets/low_poly_truck.glb',
  OBJ_MARKER: '/assets/map_pointer.glb',
  MAP_STYLE: '/dataset/style.json'
}

export const DATASET = {
  TRIP: '/dataset/trip.json',
  TRIPS: '/dataset/trips.json',
  ROUTE: '/dataset/osrm-test.json',
  ISOCHRONE: '/dataset/valhalla.json',
  ISO: '/api/route'
}