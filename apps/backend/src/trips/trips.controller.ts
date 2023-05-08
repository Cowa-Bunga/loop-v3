import { Controller, Get, Param, Request } from '@nestjs/common'
import { TripsService } from './trips.service'

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get(':trip_id')
  findOneById(@Param('trip_id') trip_id: string, @Request() req) {
    return this.tripsService.findOneById(trip_id, req)
  }
}
