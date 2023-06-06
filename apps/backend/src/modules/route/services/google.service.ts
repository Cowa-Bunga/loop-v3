import { Injectable } from '@nestjs/common'
import { Client, DirectionsResponse, ElevationResponse, TravelMode } from '@googlemaps/google-maps-services-js'
import { Position } from 'geojson'

const client = new Client({})

@Injectable()
export class GoogleRoutingService {
  async directions({ origin, destination, mode, waypoints, optimize }) {
    await client
      .directions({
        params: {
          origin,
          destination,
          mode,
          waypoints,
          optimize
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((r: DirectionsResponse | any) => {
        console.log(r.data.results[0].elevation)
        return r.data.results[0].elevation
      })
  }

  matrix() {
    //
  }

  geocode() {
    //
  }

  places() {
    //
  }

  async elevation() {
    await client
      .elevation({
        params: {
          locations: [{ lat: 45, lng: -110 }],
          key: 'asdf'
        },
        timeout: 1000
      })
      .then((r: ElevationResponse) => {
        console.log(r.data.results[0].elevation)
        return r.data.results[0].elevation
      })
  }
}

export type DirectionsRequest = {
  origin: Position | string
  destination: Position | string
  travelMode?: TravelMode
  waypoints?: Position[]
  optimizeWaypoints?: boolean
  provideRouteAlternatives?: boolean
  avoidFerries?: boolean
  avoidHighways?: boolean
  avoidTolls?: boolean
  region?: string
}
