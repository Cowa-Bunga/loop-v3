import { Module } from '@nestjs/common'
import { TripService } from './trip.service'
import { TripController } from './trip.controller'
import { DriverModule } from '../driver/driver.module'
//import { AcceptAdhocTripService } from './accept-adhoc-trip.service'

@Module({
  imports: [DriverModule],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService]
})
export class TripModule {}
