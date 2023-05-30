const mOrder = jest.fn()
jest.mock('../entities/order.entity', () => {
  return {
    Order: mOrder
  }
})
import { Test, TestingModule } from '@nestjs/testing'
import { OrderController } from '../order.controller'
import { OrderService } from '../order.service'
import { DocumentSnapshot } from '@google-cloud/firestore'
import { MockOrder, MockClient, OrderData } from './data/order.data'
import { ClientRequest } from '../../../shared/entities/request.entity'

describe('OrderController', () => {
  let orderController: OrderController
  let orderService: OrderService
  const clientRequest = new ClientRequest(MockClient)

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

  describe('findAll', () => {
    it('should call orderService getAllOrders and return an array of orders', async () => {
      const result: DocumentSnapshot[] = [MockOrder]
      mOrder.mockImplementation(() => OrderData)
      jest.spyOn(orderService, 'getAllOrders').mockImplementation(async () => result)
      jest.spyOn(orderService, 'getOrders')

      expect(await orderController.getOrders(clientRequest)).toMatchObject([OrderData])
      expect(orderService.getAllOrders).toHaveBeenCalled()
      expect(orderService.getOrders).not.toHaveBeenCalled()
    })

    it('should call orderService getOrders and return an array of orders', async () => {
      const result: DocumentSnapshot[] = [MockOrder]
      mOrder.mockImplementation(() => OrderData)
      jest.spyOn(orderService, 'getAllOrders').mockImplementation(async () => result)
      jest.spyOn(orderService, 'getOrders').mockImplementation(async () => result)

      expect(await orderController.getOrders(clientRequest, ['order_id'])).toMatchObject([OrderData])
      expect(orderService.getAllOrders).not.toHaveBeenCalled()
      expect(orderService.getOrders).toHaveBeenCalled()
    })
  })
})
