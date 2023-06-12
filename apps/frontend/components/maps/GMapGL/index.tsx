import { memo } from 'react'
import { GoogleMapsOverlay } from '@deck.gl/google-maps/typed'
import { layers } from '../shared/report_layer'
import { DEFAULT_THEME } from '../shared/config'
import { useMergeState } from '@hooks'
import { GoogleMap, useJsApiLoader, TrafficLayer } from '@react-google-maps/api'
import { ui } from './style'

function Map({ mode }) {
  const [state] = useMergeState({
    traffic: false,
    viewport: {
      lat: -30.5595,
      lng: 22.9375
    }
  })

  const { isLoaded } = useJsApiLoader({
    id: 'loop-gmap-vector',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  })

  const DeckGL = new GoogleMapsOverlay({
    layers: layers({ theme: DEFAULT_THEME })
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={ui.mapContainer}
      center={state.viewport}
      zoom={6}
      tilt={45}
      options={{ mapId: mode == 'dark' ? '373e37f72ff98909' : '713dad0b0aefa8cc' }}
      mapTypeId="satellite"
      onLoad={(map) => {
        DeckGL.setMap(map)
      }}
    >
      {state.traffic && <TrafficLayer />}
      {/* <Marker position={state.viewport} /> */}
    </GoogleMap>
  ) : null
}

export default memo(Map)
