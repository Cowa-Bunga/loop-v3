export const DEFAULT_THEME = {
  material: {
    ambient: 0.8,
    diffuse: 0.6,
    shininess: 20,
    specularColor: [20, 20, 40]
  }
}

export const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
}

export const ASSETS = {
  PIN: '/assets/pin.png',
  ICON: '/assets/icon-atlas.png',
  OBJ_BIKE: '/assets/bike.glb',
  OBJ_CAR: '/assets/car.glb',
  MAP_STYLE: '/dataset/style.json'
}

// currently mocked
export const DATASET = {
  TRIP: '/dataset/trip.json',
  TRIPS: '/dataset/trips.json',
  ROUTE: '/dataset/osrm-test.json',
  ISOCHRONE: '/dataset/valhalla.json',
  ISO: '/api/route'
  // ROUTE: '/api/trips/todo'
}