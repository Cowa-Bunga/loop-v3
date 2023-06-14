import { Test, TestingModule } from '@nestjs/testing'
import { TrackingService } from '../tracking.service'
import { OrderService } from '../../order/order.service'
import { TripService } from '../../trip/trip.service'
import { DriverService } from '../../driver/driver.service'
import { NotificationService } from '../../notification/notification.service'

describe('TrackingService', () => {
  let service: TrackingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackingService, OrderService, TripService, DriverService, NotificationService]
    }).compile()

    service = module.get<TrackingService>(TrackingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
