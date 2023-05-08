import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

@Injectable()
export class TripsService {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  async findOneById(trip_id: string = '6sS8RlmW56Rsj3Hx2LsQ', req) {
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

    return {
      trip_id,
      order_id: orderId,
      start,
      end,
      order: orderData
    }
  }
}
