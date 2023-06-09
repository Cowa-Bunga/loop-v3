import { Injectable, NotFoundException } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from '@google-cloud/firestore'
import { ClientRequest } from '../../shared/entities/request.entity'
import { ORDER_STATUS } from './entities/order.enum'
import { CreateOrderDto, EditOrderDto } from './dto/order.dto'
import { Transaction } from 'firebase-admin/firestore'
import { OrderBranch } from '../branch/entities/branch.entity'

@Injectable()
export class OrderService {
  /**
   * Returns a list of orders for given order_ids
   * @param client currently authenticated client
   * @param order_ids list of order ids to retrieve
   * @returns Array of Order DocumentSnapshots
   */
  async getOrders(client: ClientRequest, order_ids: string[]): Promise<DocumentSnapshot[]> {
    const db = admin.firestore()
    const refs = order_ids.map((id) => db.doc(`clients/${client.id}/orders/${id}`))
    return await db.getAll(...refs)
  }

  /**
   * Returns all orders for a given client created in the last 24 hours
   * @param client currently authenticated client
   * @returns Array of Order DocumentSnapshots
   */
  async getAllOrders(client: ClientRequest): Promise<DocumentSnapshot[]> {
    const date = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    const db = admin.firestore()
    const orders = await db
      .collection('clients')
      .doc(client.id)
      .collection('orders')
      .where('created_at', '>=', admin.firestore.Timestamp.fromDate(date))
      .get()

    return orders.docs
  }

  /**
   * Returns an order for a given order id
   * @param client currently authenticated client
   * @param order_id id of order to retrieve
   * @returns Order DocumentSnapshot
   */
  async getOrder(client: ClientRequest, order_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const order = await db.collection('clients').doc(client.id).collection('orders').doc(order_id).get()
    if (!order.exists) {
      throw new NotFoundException(`Order with ID '${order_id}' not found.`)
    }

    return order
  }

  /**
   * Returns an array of pending orders for a given branch id created in the last 24 hours
   * @param client currently authenticated client
   * @param branch_id id of branch to retrieve orders for
   * @returns Array of Order DocumentSnapshots
   */
  async getOrdersForBranch(client: ClientRequest, branch_id: string): Promise<DocumentSnapshot[]> {
    const db = admin.firestore()
    const date = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    const orders = await db
      .collection('clients')
      .doc(client.id)
      .collection('orders')
      .where('branch.id', '==', branch_id)
      .where('status', 'in', [ORDER_STATUS.PENDING])
      .where('created_at', '>=', admin.firestore.Timestamp.fromDate(date))
      .get()
    return orders.docs
  }

  /**
   * Creates a new order and adds it to the database for specified client
   * @param client currently authenticated client
   * @param createOrderDto details of order to be created
   * @returns DocumentSnapshot of created branch
   */
  async createOrder(
    client: ClientRequest,
    createOrderDto: CreateOrderDto,
    branch: Partial<OrderBranch>
  ): Promise<DocumentSnapshot> {
    // TODO Add getting of branch in controller
    const { order } = createOrderDto
    const db = admin.firestore()
    const orderRef = await db.collection('clients').doc(client.id).collection('orders').doc()

    await orderRef.set({
      ...order,
      branch: {
        ...branch,
        location: new admin.firestore.GeoPoint(branch.location.latitude, branch.location.longitude)
      },
      location: new admin.firestore.GeoPoint(order.location.latitude, order.location.longitude),
      status: ORDER_STATUS.PENDING,
      history: admin.firestore.FieldValue.arrayUnion({
        status: ORDER_STATUS.PENDING,
        timestamp: admin.firestore.Timestamp.now()
      }),
      created_at: admin.firestore.FieldValue.serverTimestamp()
    })

    return await orderRef.get()
  }

  /**
   * Edits a specified order for a given client
   * @param client currently authenticated client
   * @param order_id id of order to be edited
   * @param editOrderDto fields to be updated
   * @param transaction optional transaction to be used for atomicity
   * @returns the updated order DocumentSnapshot
   */
  async editOrder(
    client: ClientRequest,
    order_id: string,
    editOrderDto: EditOrderDto,
    transaction?: Transaction
  ): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const orderRef = await db.collection('clients').doc(client.id).collection('orders').doc(order_id)

    if (transaction) {
      transaction.set(orderRef, { ...editOrderDto }, { merge: true })
    } else {
      await orderRef.set({ ...editOrderDto }, { merge: true })
    }

    return orderRef.get()
  }
}
