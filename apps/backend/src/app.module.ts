import { Module } from '@nestjs/common'
import { OrderModule } from './order/order.module'
import { AuthModule } from './auth/auth.module'
import { TripsModule } from './trips/trips.module'
import { RouteModule } from './route/route.module'

@Module({
  imports: [OrderModule, AuthModule, TripsModule, RouteModule]
})

export class AppModule {}
