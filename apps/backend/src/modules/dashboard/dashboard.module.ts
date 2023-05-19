import { Module } from '@nestjs/common'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { HubModule } from '../hub/hub.module'
import { BranchModule } from '../branch/branch.module'

@Module({
  imports: [HubModule, BranchModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
