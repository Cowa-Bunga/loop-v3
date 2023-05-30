import { Module } from '@nestjs/common'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { HubModule } from '../hub/hub.module'
import { BranchModule } from '../branch/branch.module'
import { OrderModule } from '../order/order.module'
import { DriverModule } from '../driver/driver.module'
import { TripModule } from '../trip/trip.module'
import { ClusterModule } from '../cluster/cluster.module'

@Module({
  imports: [HubModule, BranchModule, OrderModule, DriverModule, TripModule, ClusterModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
