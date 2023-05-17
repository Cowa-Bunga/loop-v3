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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any)

  useEffect(() => {
    if (state.load) {
      setState({ load: false })
      load([], (res) => {
        setState({
          load: false,
          trip: res.route.routes,
          iso: res.isochrones?.raw,
          start: [res.start._longitude, res.start._latitude],
          end: [res.end._longitude, res.end._latitude]
        })
      })
    }
  }, [setState, state.load])

  const { isLoaded } = useJsApiLoader({
    id: 'loop-gmap-vector',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  })

  if (state.load || !state.start) {
    return <div>loading</div>
  }

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
      iso: state.iso
    })
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={ui.mapContainer}
      center={{ lat: state.start[1], lng: state.start[0] }}
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
