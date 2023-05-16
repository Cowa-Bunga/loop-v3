import { memo } from 'react'
import { GoogleMapsOverlay } from '@deck.gl/google-maps'
import { layers } from './layers'
import { DEFAULT_THEME } from '../shared/config'
import { useEffect, useMergeState } from '@hooks'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { ui } from './style'
import load from '../shared/load'

function Map() {
  const [state, setState] = useMergeState({
    load: true,
    route: null,
    trip: null,
    iso: null,
    start: null,
    end: null,
    height: null
  }) as unknown

  useEffect(() => {
    if (state.load) {
      setState({ load: false })
      load([], (res) => {
        return setState({
          trip: res.route.routes,
          iso: res.isochrones?.raw,
          start: [res.start._longitude, res.start._latitude],
          end: [res.end._longitude, res.end._latitude]
        })
      })
    }
  }, [])

  const { isLoaded } = useJsApiLoader({
    id: 'loop-gmap-vector',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  })

  if (state.load || !state.start || !isLoaded) {
    return <div>loading</div>
  }

  const center = { lat: state.start[1], lng: state.start[0] }
  const driver = [28.321779, -26.2290333]

  // Deckgl
  const deckOverlay = new GoogleMapsOverlay({
    layers: layers({
      driver,
      theme: DEFAULT_THEME,
      start: state.start,
      end: state.end,
      waypoints: state.waypoints,
      trip: state.trip,
      iso: state.isochrone
    })
  })

  return isLoaded && state.start && state.waypoints ? (
    <GoogleMap
      mapContainerStyle={ui.mapContainer}
      center={center}
      zoom={13}
      tilt={45}
      options={{ mapId: '713dad0b0aefa8cc' }}
      mapTypeId="satellite"
      onLoad={(map) => {
        deckOverlay.setMap(map)
      }}
    >
      {/* {waypoints.map((w) => (
        <Marker key={w.label} position={center} />
      ))} */}
    </GoogleMap>
  ) : null
}

export default memo(Map)
