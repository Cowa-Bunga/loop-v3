import { Test, TestingModule } from '@nestjs/testing'
import { TripService } from '../trip.service'
import { DriverService } from '../../driver/driver.service'

describe('TripService', () => {
  let service: TripService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripService, DriverService]
    }).compile()

    service = module.get<TripService>(TripService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
