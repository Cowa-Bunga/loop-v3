import { Body, Controller, Get, Param, ParseArrayPipe, Query, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { TripService } from './trip.service'
import { GetTripDto, CreateTripDto, AcceptAdhocTripDto } from './dto/trip.dto'
import { ApiGetRequest, ApiGetOneRequest, ApiPostRequest } from '../../shared/decorators/api.decorator' // Import the decorators

@ApiTags('Trips')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get(':trip_id')
  @ApiGetOneRequest('trip', { operation_content: 'Get trip details by trip_id' }) // Apply the decorator
  async getTrip(@Param('trip_id') trip_id: string, @Client() client: ClientRequest) {
    const client_id = client.id
    const getTripDto: GetTripDto = { trip_id }
    return await this.tripService.getTrip(getTripDto, client_id)
  }

  @Get()
  @ApiGetRequest('trips', { operation_content: 'Get multiple trips by trip_ids' }) // Apply the decorator
  async getTrips(
    @Query('trip_ids', ParseArrayPipe) trip_ids: string[],
    @Client() client: ClientRequest
  ) {
    const client_id = client.id
    return await this.tripService.getTrips(trip_ids, client_id)
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiPostRequest('trip', CreateTripDto, { operation_content: 'Create a new trip' }) // Apply the decorator
  async createTrip(@Body() createTripDto: CreateTripDto, @Client() client: ClientRequest) {
    const client_id = client.id
    return await this.tripService.createTrip(createTripDto, client_id)
  }

  @Post('accept-adhoc')
  @HttpCode(HttpStatus.CREATED)
  @ApiPostRequest('trip', AcceptAdhocTripDto, { operation_content: 'Add an order to an active trip' }) // Apply the decorator
  async acceptAdhocTrip(@Body() acceptAdhocTrip: AcceptAdhocTripDto, @Client() client: ClientRequest) {
    const client_id = client
    return await this.acceptAdhocTrip(acceptAdhocTrip, client_id)
  }
}
