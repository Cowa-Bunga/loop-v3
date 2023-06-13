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
import { order, batchedOrder } from './data/order.data'
import { Order } from '../entities/order.entity'
import { TripModule } from '../../trip/trip.module'
import { DriverModule } from '../../driver/driver.module'
import { TripService } from '../../trip/trip.service'
import { DriverService } from '../../driver/driver.service'

describe('OrderController', () => {
  let orderController: OrderController
  let orderService: OrderService
  let tripService: TripService
  let driverService: DriverService
  const db = new TestingUtils()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TripModule, DriverModule],
      controllers: [OrderController],
      providers: [OrderService]
    }).compile()

    orderService = module.get<OrderService>(OrderService)
    orderController = module.get<OrderController>(OrderController)
    tripService = module.get<TripService>(TripService)
    driverService = module.get<DriverService>(DriverService)
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
    it('should call orderService getOrder and return an order not associated to a trip', async () => {
      const orderDoc = db.generateDocumentSnapshot<Order>(order, `clients/${db.client.id}/orders/${order.id}`)
      mOrder.mockImplementation(() => order)
      jest.spyOn(orderService, 'getOrder').mockResolvedValue(orderDoc)
      jest.spyOn(tripService, 'getTrip')
      jest.spyOn(driverService, 'getDriverByRef')

      expect(await orderController.getOrder(db.client, order.id)).toMatchObject(order)
      expect(orderService.getOrder).toHaveBeenCalled()
      expect(tripService.getTrip).not.toHaveBeenCalled()
      expect(driverService.getDriverByRef).not.toHaveBeenCalled()
    })

    it('should call orderService getOrder and return an order associated to a trip, but no driver', async () => {
      const orderDoc = db.generateDocumentSnapshot<Order>(
        batchedOrder,
        `clients/${db.client.id}/orders/${batchedOrder.id}`
      )

      const tripDoc = db.generateDocumentSnapshot(
        { id: 'trip_id' },
        `clients/${db.client.id}/orders/${batchedOrder.id}`
      )

      mOrder.mockImplementation(() => order)
      jest.spyOn(orderService, 'getOrder').mockResolvedValue(orderDoc)
      jest.spyOn(tripService, 'getTrip').mockResolvedValue(tripDoc)
      jest.spyOn(driverService, 'getDriverByRef')

      expect(await orderController.getOrder(db.client, order.id)).toMatchObject(order)
      expect(orderService.getOrder).toHaveBeenCalledWith(db.client, order.id)
      expect(tripService.getTrip).toHaveBeenCalledWith(db.client, batchedOrder.trip_id)
      expect(driverService.getDriverByRef).not.toHaveBeenCalled()
    })

    it('should call orderService getOrder and return an order associated to a trip and driver', async () => {
      const orderDoc = db.generateDocumentSnapshot<Order>(
        batchedOrder,
        `clients/${db.client.id}/orders/${batchedOrder.id}`
      )

      const tripDoc = db.generateDocumentSnapshot(
        { id: 'trip_id', driver: 'driver_ref' },
        `clients/${db.client.id}/trips/trip_id`
      )

      const driverDoc = db.generateDocumentSnapshot(
        { id: 'driver_id', name: 'driver_name' },
        `clients/${db.client.id}/drivers/driver_id`
      )

      mOrder.mockImplementation(() => order)
      jest.spyOn(orderService, 'getOrder').mockResolvedValue(orderDoc)
      jest.spyOn(tripService, 'getTrip').mockResolvedValue(tripDoc)
      jest.spyOn(driverService, 'getDriverByRef').mockResolvedValue(driverDoc)

      expect(await orderController.getOrder(db.client, order.id)).toMatchObject({
        ...order,
        driver_id: driverDoc.id,
        driver_name: driverDoc.data().name
      })
      expect(orderService.getOrder).toHaveBeenCalledWith(db.client, order.id)
      expect(tripService.getTrip).toHaveBeenCalledWith(db.client, batchedOrder.trip_id)
      expect(driverService.getDriverByRef).toHaveBeenCalledWith(tripDoc.data().driver)
    })
  })
})
