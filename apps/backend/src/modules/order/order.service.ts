import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { ClientRequest } from '../../shared/entities/request.entity'
import { EssentialOrder, Order } from './entities/order.entity'
import { ORDER_STATUS } from './entities/order.enum'

@Injectable()
export class OrderService {
  //TODO make use of order entity

  async getOrders(order_ids: string[], client: ClientRequest) {
    const db = admin.firestore()
    const refs = order_ids.map((id) => db.doc(`clients/${client.id}/orders/${id}`))
    const snapshot = await db.getAll(...refs)
    const orders = snapshot.map((doc) => {
      return {
        id: doc.id,
        client_id: client.id,
        ...doc.data()
      }
    })
    return orders
  }

  async getAllOrders(client: ClientRequest) {
    const db = admin.firestore()
    const orderDocs = await db
      .collection('clients')
      .doc(client.id)
      .collection('orders')
      .get()

    const orders = orderDocs.docs.map((doc) => {
      return {
        id: doc.id,
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

  async getOrdersForBranch(branch_id: string, client_id: string, essential = false): Promise<Order[] | EssentialOrder[]> {
    const db = admin.firestore()
    const orderDocs = await db
      .collection('clients')
      .doc(client_id).collection('orders')
      .where('branch.id', '==', branch_id)
      .where('status', 'in', [ORDER_STATUS.PENDING])
      .get()

    const orders = orderDocs.docs.map((doc) => {
      return essential ? new EssentialOrder(doc) : new Order(doc)
    })

    return orders
  }
}
