import { Body, Controller, Get, Param, ParseArrayPipe, Query, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { TripService } from './trip.service'
import { GetTripDto, CreateTripDto, AcceptAdhocTripDto } from './dto/trip.dto'
import { ApiGetRequest, ApiGetOneRequest, ApiPostRequest } from '../../shared/decorators/api.decorator'

@ApiTags('Trips')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get(':trip_id')
  @ApiGetOneRequest('trip', { operation_content: 'Get trip details by trip_id' })
  async getTrip(@Param('trip_id') trip_id: string, @Client() client: ClientRequest) {
    const client_id = client.id
    const getTripDto: GetTripDto = { trip_id }
    return await this.tripService.getTrip(getTripDto, client_id)
  }

  @Get('trips')
  @ApiGetRequest('trips', { operation_content: 'Get trips' })
  async getTrips(
    @Client() client: ClientRequest,
    @Query('trip_ids', new ParseArrayPipe({ optional: true })) trip_ids?: string[],
  ) {
    const client_id = client.id
  
    if (trip_ids) {
      return await this.tripService.getTripsByTripIds(trip_ids, client_id)
    }
  
    throw new Error('Please provide trip_ids.')
  }
  
  @Get('branches')
  @ApiGetRequest('branches', { operation_content: 'Get branches' })
  async getBranches(
    @Client() client: ClientRequest,
    @Query('branch_ids', new ParseArrayPipe({ optional: true })) branch_ids?: string[],
    @Query('statuses', new ParseArrayPipe({ optional: true })) statuses?: string[],
  ) {
    const client_id = client.id
  
    if (!branch_ids) {
      throw new Error('Please provide branch_ids.')
    }
  
    return await this.tripService.getTripsByBranchIds(branch_ids, client_id, statuses)
  }
  

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiPostRequest('trip', CreateTripDto, { operation_content: 'Create a new trip' })
  async createTrip(@Body() createTripDto: CreateTripDto, @Client() client: ClientRequest) {
    const client_id = client.id
    return await this.tripService.createTrip(createTripDto, client_id)
  }

  @Post('accept-adhoc')
  @HttpCode(HttpStatus.CREATED)
  @ApiPostRequest('trip', AcceptAdhocTripDto, { operation_content: 'Add an order to an active trip' })
  async acceptAdhocTrip(@Body() acceptAdhocTrip: AcceptAdhocTripDto, @Client() client: ClientRequest) {
    const client_id = client
    return await this.acceptAdhocTrip(acceptAdhocTrip, client_id)
  }
}
