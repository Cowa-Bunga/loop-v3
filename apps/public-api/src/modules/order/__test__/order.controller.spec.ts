const mOrder = jest.fn()
jest.mock('../entities/order.entity', () => {
  return {
    Order: mOrder
  }
})
import { Test, TestingModule } from '@nestjs/testing'
import { OrderController } from '../order.controller'
import { OrderService } from '../order.service'
import { TestingUtils } from '../../../shared/utils/test.utils'
import { generateOrder } from './data/order.data'
import { Order } from '../entities/order.entity'

describe('OrderController', () => {
  let orderController: OrderController
  let orderService: OrderService
  const order = generateOrder()
  const db = new TestingUtils()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService]
    }).compile()

    orderService = module.get<OrderService>(OrderService)
    orderController = module.get<OrderController>(OrderController)
  })

  it('should be defined', () => {
    expect(orderService).toBeDefined()
    expect(orderController).toBeDefined()
  })

  describe('getOrders', () => {
    const orderDoc = db.generateDocumentSnapshot<Order>(order, `clients/${db.client.id}/orders/${order.id}`)
    mOrder.mockImplementation(() => order)

    it('should call orderService getAllOrders and return an array of orders', async () => {
      jest.spyOn(orderService, 'getAllOrders').mockResolvedValue([orderDoc])
      jest.spyOn(orderService, 'getOrders').mockResolvedValue([orderDoc])

      expect(await orderController.getOrders(db.client)).toMatchObject([order])
      expect(orderService.getAllOrders).toHaveBeenCalled()
      expect(orderService.getOrders).not.toHaveBeenCalled()
    })

    it('should call orderService getOrders and return an array of orders', async () => {
      jest.spyOn(orderService, 'getAllOrders').mockResolvedValue([orderDoc])
      jest.spyOn(orderService, 'getOrders').mockResolvedValue([orderDoc])

      expect(await orderController.getOrders(db.client, ['order_id'])).toMatchObject([order])
      expect(orderService.getAllOrders).not.toHaveBeenCalled()
      expect(orderService.getOrders).toHaveBeenCalled()
    })
  })

  describe('getOrder', () => {
    const orderDoc = db.generateDocumentSnapshot<Order>(order, `clients/${db.client.id}/orders/${order.id}`)
    mOrder.mockImplementation(() => order)

    it('should call orderService getOrder and return an order', async () => {
      jest.spyOn(orderService, 'getOrder').mockResolvedValue(orderDoc)

      expect(await orderController.getOrder(db.client, order.id)).toMatchObject(order)
      expect(orderService.getOrder).toHaveBeenCalled()
    })
  })
})
