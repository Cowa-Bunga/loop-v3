import { Module } from '@nestjs/common'
import { OrderModule } from './order/order.module'
import { TripModule } from './trip/trip.module'
import { AuthModule } from './auth/auth.module'
import { RouteModule } from './route/route.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '../shared/guards/auth.guard'

@Module({
  imports: [OrderModule, AuthModule, TripModule, RouteModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class MainModule {}
