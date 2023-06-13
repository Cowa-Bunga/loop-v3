import { Test, TestingModule } from '@nestjs/testing'
import { TrackingController } from '../tracking.controller'
import { TrackingService } from '../tracking.service'
import { OrderService } from '../../order/order.service'
import { TripService } from '../../trip/trip.service'
import { DriverService } from '../../driver/driver.service'
import { NotificationService } from '../../notification/notification.service'

describe('TrackingController', () => {
  let controller: TrackingController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [TrackingService, OrderService, TripService, DriverService, NotificationService]
    }).compile()

    controller = module.get<TrackingController>(TrackingController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
