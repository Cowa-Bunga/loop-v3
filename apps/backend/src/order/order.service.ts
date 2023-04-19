import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

@Injectable()
export class OrderService {
  create() {
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

  findOne() {
    return `This action returns a order`
  }

  update() {
    return `This action updates a order`
  }

  remove() {
    return `This action removes a order`
  }
}
