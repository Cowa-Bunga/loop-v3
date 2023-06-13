import { Test, TestingModule } from '@nestjs/testing'
import { DashboardService } from '../dashboard.service'
import { BranchService } from '../../branch/branch.service'
import { HubService } from '../../hub/hub.service'
import { OrderService } from '../../order/order.service'
import { DriverService } from '../../driver/driver.service'
import { TripService } from '../../trip/trip.service'
import { ClusterService } from '../../cluster/cluster.service'

describe('DashboardService', () => {
  let service: DashboardService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardService, HubService, BranchService, OrderService, DriverService, TripService, ClusterService]
    }).compile()

    service = module.get<DashboardService>(DashboardService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
