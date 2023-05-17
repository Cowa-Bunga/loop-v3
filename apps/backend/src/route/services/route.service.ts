import { Injectable } from '@nestjs/common'
import { Valhalla } from '@routingjs/valhalla'
import { OSRM } from '@routingjs/osrm'
import * as admin from 'firebase-admin'

// WIP - route api tests

@Injectable()
export class RouteService {
  async valhalla() {
    // URL defaults to free but limited - http://valhalla1.openstreetmap.de
    // const valhalla = new Valhalla({ baseUrl: "http://localhost:8002" })
    const valhalla = new Valhalla()
    // TODO req params:
    const start: [number, number] = [-26.2251971, 28.29998]
    const end: [number, number] = [-26.2490125, 28.3476559]

    const res = {
      _query: { start, end },
      directions: await valhalla.directions([start, end], 'auto'),
      isochrones: await valhalla.reachability(start, 'auto', [1000, 1000])
    }
    return res
  }

  async osrm() {
    const osrm = new OSRM({
      baseUrl: 'http://localhost:5000'
      // headers:
      // apiKey:
    })

    // TODO req params:
    const start: [number, number] = [-26.2251971, 28.29998]
    const end: [number, number] = [-26.2490125, 28.3476559]

    const res = {
      directions: await osrm.directions([start, end], 'auto', {
        steps: true
      })
    }

    return res
  }

  async googleDirections() {
    return {}
  }

  async getRouteByTripId(trip_id: string, req) {
    trip_id = trip_id || '6sS8RlmW56Rsj3Hx2LsQ'
    const db = admin.firestore()
    const client_id = 'tKJWhfTFoLNvCgLtKnmv' || req.client

    const trip = await db
      .collection('clients')
      .doc(client_id)
      .collection('trips')
      .doc(trip_id)
      .get()
    if (!trip) {
      return { status: 404, message: 'no trip found' }
    }

    const orderId = ['yQVXjvCoVh8F6RJQx71i'] || trip.data()?.orders[0]
    if (!orderId) {
      return { message: 'no order id found' }
    }

    const order = await db
      .collection('clients')
      .doc(client_id)
      .collection('orders')
      .doc(orderId[0])
      .get()

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
      route: await new Valhalla().directions([start, ...waypoints, end], 'auto')
    }
  }
}
