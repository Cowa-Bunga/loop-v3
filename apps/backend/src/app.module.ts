import { Module } from '@nestjs/common'
import { OrderModule } from './order/order.module'
import { TripModule } from './trip/trip.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [OrderModule, AuthModule, TripModule]
})
export class AppModule {}
