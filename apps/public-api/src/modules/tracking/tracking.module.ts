import { Module } from '@nestjs/common'
import { TrackingService } from './tracking.service'
import { TrackingController } from './tracking.controller'
import { OrderModule } from '../order/order.module'
import { TripModule } from '../trip/trip.module'
import { DriverModule } from '../driver/driver.module'
import { NotificationModule } from '../notification/notification.module'

@Module({
  imports: [OrderModule, TripModule, DriverModule, NotificationModule],
  controllers: [TrackingController],
  providers: [TrackingService]
})
export class TrackingModule {}
