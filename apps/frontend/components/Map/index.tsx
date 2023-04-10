// @see: https://react-google-maps-api-docs.netlify.app/#section-introduction
// TODO: deck.gl
import { memo, useCallback, useEffect, useState } from 'react'
import {
  GoogleMap,
  useJsApiLoader
  // StreetViewPanorama,
  // DrawingManager
} from '@react-google-maps/api'

import { Paper } from '@mui/material'

const center = {
  lat: 18.4233,
  lng: -33.918861
}

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
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
      setMap(map)
    }
  }, [])

  // const onLoadDrawing = (drawingManager) => {
  //   console.log(drawingManager);
  // };

  // const onPolygonComplete = (polygon) => {
  //   console.log(polygon);
  // };

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
      >
        {/* <DrawingManager
        onLoad={onLoadDrawing}
        onPolygonComplete={onPolygonComplete}
      />
      <StreetViewPanorama /> */}
      </GoogleMap>
    </Paper>
  ) : null
}

export default memo(Map)
