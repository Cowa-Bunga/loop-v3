import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { CreateOrderDto } from './dto/create-order.dto'

@Injectable()
export class OrderService {
  //TODO make use of order entity

  createOrder(order: CreateOrderDto, client_id: string) {
    return 'This action adds a new order'
  }

  async getOrders(order_ids: string[], client_id: string) {
    const db = admin.firestore()
    const refs = order_ids.map((id) =>
      db.doc(`clients/${client_id}/orders/${id}`)
    )
    const snapshot = await db.getAll(...refs)
    const orders = snapshot.map((doc) => {
      return {
        id: doc.id,
        client_id: client_id,
        ...doc.data()
      }
    })
    return orders
  }

  async getOrder(order_id: string, client_id: string) {
    const db = admin.firestore()
    const order = await db
      .collection('clients')
      .doc(client_id)
      .collection('orders')
      .doc(order_id)
      .get()

    const orderData = order.data()

    if (orderData.trip_id) {
      //TODO replace with trip service
      const trip = await db
        .collection('clients')
        .doc(client_id)
        .collection('trips')
        .doc(orderData.trip_id)
        .get()
      if (trip.data().driver) {
        //TODO replace with driver service
        const driver = await trip.data().driver.get()
        Object.assign(orderData, {
          driver_id: driver.id,
          driver_name: driver.data().name
        })
      }
    }

    return {
      id: order.id,
      client_id: client_id,
      ...orderData
    }
  }
}
