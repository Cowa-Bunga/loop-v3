import { Test, TestingModule } from '@nestjs/testing'
import { OrderService } from '../order.service'
import { TestingUtils } from '../../../shared/utils/test.utils'
import * as admin from 'firebase-admin'
import { Order } from '../entities/order.entity'
import { generateOrder } from './data/order.data'
import { NotFoundException } from '@nestjs/common'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
admin.initializeApp()

describe('OrderService', () => {
  let orderService: OrderService
  const order = generateOrder()
  const db = new TestingUtils()

  jest.spyOn(admin.firestore(), 'collection').mockImplementation(db.collection as jest.Mock)
  jest.spyOn(admin.firestore(), 'doc').mockImplementation(db.doc as jest.Mock)
  jest.spyOn(admin.firestore(), 'getAll').mockImplementation(db.getAll as jest.Mock)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService]
    }).compile()

    orderService = module.get<OrderService>(OrderService)
  })

  it('should be defined', () => {
    expect(orderService).toBeDefined()
  })

  describe('getOrder', () => {
    it('should return the created order.', async () => {
      const orderDoc = db.generateDocumentSnapshot<Order>(order, `clients/${db.client.id}/orders/${order.id}`)
      db.get.mockImplementationOnce(() => orderDoc)

      expect(await orderService.getOrder(db.client, order.id)).toEqual(orderDoc)
      expect(db.collection).toHaveBeenNthCalledWith(1, 'clients')
      expect(db.collection).toHaveBeenNthCalledWith(2, 'orders')
      expect(db.doc).toHaveBeenNthCalledWith(1, db.client.id)
      expect(db.doc).toHaveBeenNthCalledWith(2, order.id)
    })

    it('should throw an error when the order does not exist.', async () => {
      const orderDoc = db.generateDocumentSnapshot({}, `clients/${db.client.id}/orders/${order.id}`)
      db.get.mockImplementationOnce(() => orderDoc)

      try {
        expect(await orderService.getOrder(db.client, order.id)).toEqual(orderDoc)
        expect(db.collection).toHaveBeenNthCalledWith(1, 'clients')
        expect(db.collection).toHaveBeenNthCalledWith(2, 'orders')
        expect(db.doc).toHaveBeenNthCalledWith(1, db.client.id)
        expect(db.doc).toHaveBeenNthCalledWith(2, order.id)
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException)
        expect(err.message).toEqual(`Order with ID '${order.id}' not found.`)
      }
    })
  })

  describe('GetOrdersForBranch', () => {
    it('should return the created order.', async () => {
      const date = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      const orderDoc = db.generateDocumentSnapshot<Order>(order, `clients/${db.client.id}/orders/${order.id}`)

      const querySnapshot = db.generateQuerySnapshot([orderDoc] as QueryDocumentSnapshot[])
      db.get.mockImplementationOnce(() => querySnapshot)

      expect(await orderService.getOrdersForBranch(db.client, 'branch_id')).toEqual([orderDoc])
      expect(db.collection).toHaveBeenNthCalledWith(1, 'clients')
      expect(db.collection).toHaveBeenNthCalledWith(2, 'orders')
      expect(db.doc).toHaveBeenNthCalledWith(1, db.client.id)
      expect(db.where).toHaveBeenNthCalledWith(1, 'branch.id', '==', 'branch_id')
      expect(db.where).toHaveBeenNthCalledWith(2, 'status', 'in', ['pending'])
      expect(db.where).toHaveBeenNthCalledWith(3, 'created_at', '>=', admin.firestore.Timestamp.fromDate(date))
    })
  })
})
