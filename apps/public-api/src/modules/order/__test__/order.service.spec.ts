import { Test, TestingModule } from '@nestjs/testing'
import { OrderService } from '../order.service'
import { TestingUtils } from '../../../shared/utils/test.utils'
import * as admin from 'firebase-admin'
import { orderData, createOrderDto, branch, editOrderDto } from './data/order.data'
import { NotFoundException } from '@nestjs/common'
import { QueryDocumentSnapshot, Transaction } from 'firebase-admin/firestore'
admin.initializeApp()

describe('OrderService', () => {
  let orderService: OrderService
  const order = orderData
  const db = new TestingUtils()

  jest.spyOn(admin.firestore(), 'collection').mockImplementation(db.collection as jest.Mock)
  jest.spyOn(admin.firestore(), 'doc').mockImplementation(db.doc as jest.Mock)
  jest.spyOn(admin.firestore(), 'getAll').mockImplementation(db.getAll as jest.Mock)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService]
    }).compile()

    orderService = module.get<OrderService>(OrderService)
    jest.useFakeTimers()
    jest.setSystemTime(new Date())
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should be defined', () => {
    expect(orderService).toBeDefined()
  })

  describe('Get Orders', () => {
    it('should return a list of orders for given order_ids', async () => {
      const orderDoc = db.generateDocumentSnapshot(order, `clients/${db.client.id}/orders/${order.id}`)

      db.getAll.mockImplementationOnce(() => [orderDoc])

      expect(await orderService.getOrders(db.client, [order.id])).toEqual([orderDoc])
      expect(db.doc).toHaveBeenCalledWith(`clients/${db.client.id}/orders/${order.id}`)
    })
  })

  describe('Get All Orders', () => {
    it('should return a list of orders associated with client.', async () => {
      const date = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      const orderDoc = db.generateDocumentSnapshot(order, `clients/${db.client.id}/orders/${order.id}`)
      const querySnapshot = db.generateQuerySnapshot([orderDoc] as QueryDocumentSnapshot[])
      db.get.mockImplementationOnce(() => querySnapshot)

      expect(await orderService.getAllOrders(db.client)).toEqual([orderDoc])
      expect(db.collection).toHaveBeenNthCalledWith(1, 'clients')
      expect(db.collection).toHaveBeenNthCalledWith(2, 'orders')
      expect(db.doc).toHaveBeenCalledWith(db.client.id)
      expect(db.where).toHaveBeenCalledWith('created_at', '>=', admin.firestore.Timestamp.fromDate(date))
    })
  })

  describe('Get Order', () => {
    it('should return the order for given order id', async () => {
      const orderDoc = db.generateDocumentSnapshot(order, `clients/${db.client.id}/orders/${order.id}`)
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

  describe('Get Orders For Branch', () => {
    it('should return the created order.', async () => {
      const date = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      const orderDoc = db.generateDocumentSnapshot(order, `clients/${db.client.id}/orders/${order.id}`)

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

  describe('Create Order', () => {
    it('should create a new order', async () => {
      const orderDoc = db.generateDocumentSnapshot(order, `clients/${db.client.id}/orders/${order.id}`)
      db.get.mockImplementationOnce(() => orderDoc)

      expect(await orderService.createOrder(db.client, createOrderDto, branch)).toEqual(orderDoc)
      expect(db.collection).toHaveBeenNthCalledWith(1, 'clients')
      expect(db.collection).toHaveBeenNthCalledWith(2, 'orders')
      expect(db.doc).toHaveBeenNthCalledWith(1, db.client.id)
      expect(db.doc).toHaveBeenCalledTimes(2)
      expect(db.set).toHaveBeenCalled()
    })
  })

  describe('Edit Order', () => {
    it('should edit an order', async () => {
      const orderDoc = db.generateDocumentSnapshot(order, `clients/${db.client.id}/orders/${order.id}`)
      db.get.mockImplementationOnce(() => orderDoc)

      expect(await orderService.editOrder(db.client, order.id, editOrderDto)).toEqual(orderDoc)
      expect(db.collection).toHaveBeenNthCalledWith(1, 'clients')
      expect(db.collection).toHaveBeenNthCalledWith(2, 'orders')
      expect(db.doc).toHaveBeenNthCalledWith(1, db.client.id)
      expect(db.doc).toHaveBeenNthCalledWith(2, order.id)
      expect(db.set).toHaveBeenCalledWith({ ...editOrderDto }, { merge: true })
    })

    it('should edit an order using transaction', async () => {
      const orderDoc = db.generateDocumentSnapshot(order, `clients/${db.client.id}/orders/${order.id}`)
      db.get.mockImplementationOnce(() => orderDoc)
      expect(await orderService.editOrder(db.client, order.id, editOrderDto, db.transaction)).toEqual(orderDoc)
      expect(db.collection).toHaveBeenNthCalledWith(1, 'clients')
      expect(db.collection).toHaveBeenNthCalledWith(2, 'orders')
      expect(db.doc).toHaveBeenNthCalledWith(1, db.client.id)
      expect(db.doc).toHaveBeenNthCalledWith(2, order.id)
      expect(db.transaction.set).toHaveBeenCalledWith(db.doc(), { ...editOrderDto }, { merge: true })
    })
  })
})
