import { Injectable } from '@nestjs/common'
import { Valhalla, ValhallaCostingType } from '@routingjs/valhalla'
import * as admin from 'firebase-admin'
import { Point, Position } from 'geojson'

// const config = {
//   options: {
//     costing: false,
//     costing_options: {},
//     exclude_locations: [],
//     exclude_polygons: [],
//     sources: [],
//     targets: []
//     shortest: true,
//     exclude_unpaved: true,
//     use_highways: true,
//     use_living_streets: true,
//     use_tolls: false,
//     use_tracks: true
//   }
// }

// URL defaults to free but limited - http://valhalla1.openstreetmap.de
const valhalla = new Valhalla()
// TODO: const valhalla = new Valhalla({ baseUrl: "http://localhost:8002" })

@Injectable()
export class ValhallaService {
  _parser() {
    // convert to unified response object
  }

  // Adapters
  matrix(locations) {
    return valhalla.matrix(locations, 'auto')
  }

  directions(locations: Position[]) {
    return valhalla.directions(locations as [number, number][], 'auto')
  }

  isochrones(start, type = 'auto' as ValhallaCostingType, distance = [0, 1000]) {
    return valhalla.reachability(start, type, distance)
  }

  async getRouteData(locations = []) {
    const start: [number, number] = locations[0] || [-26.2251971, 28.29998]
    const end: Position = locations[locations.length - 1] || [-26.2490125, 28.3476559]
    const waypoints = []

    const res = {
      _query: { start, end },
      matrix: await valhalla.matrix([start, ...waypoints, end], 'auto'),
      directions: await valhalla.directions([start, ...waypoints, end], 'auto'),
      isochrones: await valhalla.reachability(start, 'auto', [1000, 1000])
    }
    return res
  }

  async getRouteByTripId(trip_id: string, req) {
    const db = admin.firestore()

    trip_id = trip_id || '6sS8RlmW56Rsj3Hx2LsQ'
    const client_id = req.client || 'tKJWhfTFoLNvCgLtKnmv'

    const trip = await db.collection('clients').doc(client_id).collection('trips').doc(trip_id).get()
    if (!trip) {
      return { status: 404, message: 'no trip found' }
    }

    const orderId = trip.data()?.orders[0] || 'yQVXjvCoVh8F6RJQx71i'
    if (!orderId) {
      return { status: 404, message: 'no order id found' }
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
