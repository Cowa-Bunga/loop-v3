import { memo, useCallback, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const center = {
  lat: -3.745,
  lng: -38.523
}

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'NOT_A_KEY'
  })

  const height = window.innerHeight - 60
  const [, setMap] = useState(null)

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height }}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  ) : null
}

export default memo(Map)
