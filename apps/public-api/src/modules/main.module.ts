import { Module } from '@nestjs/common'
import { OrderModule } from './order/order.module'
import { TripModule } from './trip/trip.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '../shared/guards/auth.guard'
import { ClientModule } from './client/client.module'
import { UserModule } from './user/user.module'
import { HubModule } from './hub/hub.module'
import { BranchModule } from './branch/branch.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { DriverModule } from './driver/driver.module'
import { NotificationModule } from './notification/notification.module'
import { TrackingModule } from './tracking/tracking.module'

@Module({
  imports: [
    OrderModule,
    AuthModule,
    TripModule,
    ClientModule,
    UserModule,
    HubModule,
    BranchModule,
    DashboardModule,
    DriverModule,
    NotificationModule,
    TrackingModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class MainModule {}
