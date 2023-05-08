import { memo, useCallback, useEffect, useState } from 'react'
import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  Marker
} from '@react-google-maps/api'
import { GoogleMapsOverlay } from '@deck.gl/google-maps'
import { GeoJsonLayer } from 'deck.gl'

// Demo: wip
const AIR_PORTS = '/dataset/airports.geojson'

const center = {
  lat: -33.918861,
  lng: 18.4233
}

const deckOverlay = new GoogleMapsOverlay({
  layers: [
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      filled: true,
      pointRadiusMinPixels: 20,
      opacity: 1,
      pointRadiusScale: 10,
      getRadius: (f) => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      pickable: true,
      autoHighlight: true
    })
  ]
})

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    libraries: ['drawing']
  })

  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(window.innerHeight - 60)
  }, [])

  const [, setMap] = useState(null)

  const onLoad = useCallback((map) => {
    if (typeof window !== 'undefined') {
      const bounds = new window.google.maps.LatLngBounds(center)
      map.fitBounds(bounds)
      deckOverlay.setMap(map)
    }
  }, [])

  const onLoadDrawing = (drawingManager) => {
    console.log(drawingManager)
  }

  const onPolygonComplete = (polygon) => {
    console.log(polygon)
  }

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height }}
      center={center}
      mapTypeId="satellite"
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} icon="/pin.png" />
      <DrawingManager
        onLoad={onLoadDrawing}
        onPolygonComplete={onPolygonComplete}
      />
    </GoogleMap>
  ) : null
}

export default memo(Map)
