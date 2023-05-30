import { Injectable } from '@nestjs/common'
import { Valhalla } from '@routingjs/valhalla'
import * as admin from 'firebase-admin'

// const valhallaConfigOverrides = {
//   costing: false,
//   costing_options: {},
//   exclude_locations: [],
//   exclude_polygons: [],
//   sources: [],
//   targets: []
//   // shortest: true,
//   // exclude_unpaved: true,
//   // use_highways: true,
//   // use_living_streets: true,
//   // use_tolls: false,
//   // use_tracks: true
// }

// URL defaults to free but limited - http://valhalla1.openstreetmap.de
// const valhalla = new Valhalla({ baseUrl: "http://localhost:8002" })
const valhalla = new Valhalla()

// WIP - route api tests

@Injectable()
export class ValhallaService {
  async valhalla() {
    const start: [number, number] = [-26.2251971, 28.29998]
    const end: [number, number] = [-26.2490125, 28.3476559]

    const res = {
      _query: { start, end },
      directions: await valhalla.directions([start, end], 'auto'),
      isochrones: await valhalla.reachability(start, 'auto', [1000, 1000])
    }
    return res
  }

  async getOptimisedRoute(params: { locations: [[number, number]]; start: [number, number]; end: [number, number] }) {
    await valhalla.directions([params.start, ...params.locations, params.end], 'auto')
  }

  async getRouteByTripId(trip_id: string, req) {
    trip_id = trip_id || '6sS8RlmW56Rsj3Hx2LsQ'

    const db = admin.firestore()
    const client_id = req.client || 'tKJWhfTFoLNvCgLtKnmv'

    const trip = await db.collection('clients').doc(client_id).collection('trips').doc(trip_id).get()

    if (!trip) {
      return { status: 404, message: 'no trip found' }
    }

    const orderId = trip.data()?.orders[0] || 'yQVXjvCoVh8F6RJQx71i'
    if (!orderId) {
      return { message: 'no order id found' }
    }

    const order = await db.collection('clients').doc(client_id).collection('orders').doc(orderId).get()

    const orderData = order.data()
    const start = orderData.branch.location
    const end = orderData.location
    // TODO:
    const waypoints = []

    return {
      trip_id,
      order_id: orderId,
      start,
      end,
      order: orderData,
      route: await valhalla.directions([start, ...waypoints, end], 'auto')
    }
  }
}
