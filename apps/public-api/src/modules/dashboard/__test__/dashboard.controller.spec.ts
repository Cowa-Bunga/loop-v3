import { Test, TestingModule } from '@nestjs/testing'
import { DashboardController } from '../dashboard.controller'
import { DashboardService } from '../dashboard.service'
import { BranchService } from '../../branch/branch.service'
import { HubService } from '../../hub/hub.service'
import { OrderService } from '../../order/order.service'
import { DriverService } from '../../driver/driver.service'
import { TripService } from '../../trip/trip.service'
import { ClusterService } from '../../cluster/cluster.service'

describe('DashboardController', () => {
  let controller: DashboardController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [DashboardService, HubService, BranchService, OrderService, DriverService, TripService, ClusterService]
    }).compile()

    controller = module.get<DashboardController>(DashboardController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
