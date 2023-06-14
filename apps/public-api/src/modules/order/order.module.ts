import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TripModule } from '../trip/trip.module'
import { DriverModule } from '../driver/driver.module'

@Module({
  imports: [TripModule, DriverModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
