import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Query,
  Request
} from '@nestjs/common'
import { TripService } from './trip.service'
import { GetTripDto } from './dto/get-trip.dto'
import { ApiTags, ApiSecurity} from '@nestjs/swagger'

@ApiTags('Trips')
@Controller('trip')
@ApiSecurity('x-api-key')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  async getTrips(
    @Query('trip_ids', ParseArrayPipe) trip_ids: string[],
    @Request() req
  ) {
    const client_id = req.client
    return await this.tripService.getTrips(trip_ids, client_id)
  }

  @Get(':trip_id')
  async getTrip(@Param('trip_id') trip_id: string, @Request() req) {
    const client_id = req.client
    const getTripDto: GetTripDto = { trip_id } // Create a new GetTripDto object
    return await this.tripService.getTrip(getTripDto, client_id)
  }

}
