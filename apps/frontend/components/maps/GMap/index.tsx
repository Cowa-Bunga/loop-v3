import { memo, useCallback, useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  })

  const [center] = useState({
    lat: -33.918861,
    lng: 18.4233
  })

  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(window.innerHeight - 60)
  }, [])

  const [, setMap] = useState(null)

  const onLoad = useCallback(
    (map) => {
      if (typeof window !== 'undefined') {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map)
      }
    },
    [center]
  )

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <Paper>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height }}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </Paper>
  ) : null
}

export default memo(Map)
