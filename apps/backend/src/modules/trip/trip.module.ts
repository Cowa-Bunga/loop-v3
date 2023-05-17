import { Module } from '@nestjs/common'
import { TripService } from './trip.service'
import { TripController } from './trip.controller'
//import { AcceptAdhocTripService } from './accept-adhoc-trip.service'


@Module({
  controllers: [TripController],
  providers: [TripService]
  // providers: [TripService, AcceptAdhocTripService]
})
export class TripModule {}
