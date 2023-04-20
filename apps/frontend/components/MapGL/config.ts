import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core'

export const DATA_URL = {
  BUILDINGS:
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json',
  TRIPS:
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json',
  MAP_STYLE: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
}

export const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material: {
    ambient: 0.1,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [60, 64, 70]
  },
  effects: [
    new LightingEffect({
      ambientLight: new AmbientLight({
        color: [255, 255, 255],
        intensity: 1.0
      }),
      pointLight: new PointLight({
        color: [255, 255, 255],
        intensity: 2.0,
        position: [-74.05, 40.7, 8000]
      })
    })
  ]
}

export const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.72,
  zoom: 13,
  pitch: 45,
  bearing: 0
}

export const LAND_COVER = [
  [
    [-74.0, 40.7],
    [-74.02, 40.7],
    [-74.02, 40.72],
    [-74.0, 40.72]
  ]
]
