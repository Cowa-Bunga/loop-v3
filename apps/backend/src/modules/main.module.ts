import { Module } from '@nestjs/common'
import { OrderModule } from './order/order.module'
import { TripModule } from './trip/trip.module'
import { AuthModule } from './auth/auth.module'
import { RouteModule } from './route/route.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '../shared/guards/auth.guard'
import { ClientModule } from './client/client.module'
import { UserModule } from './user/user.module'
import { HubModule } from './hub/hub.module'
import { BranchModule } from './branch/branch.module'

@Module({
  imports: [OrderModule, AuthModule, TripModule, RouteModule, ClientModule, UserModule, HubModule, BranchModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class MainModule {}
