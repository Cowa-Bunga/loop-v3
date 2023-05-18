import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Query,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiSecurity
} from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { TripService } from './trip.service'
import { GetTripDto, CreateTripDto, AcceptAdhocTripDto } from './dto/trip.dto'

@ApiTags('Trips')
@Controller('trip')
@ApiSecurity('x-api-key')
export class TripController {
  constructor(
    private readonly tripService: TripService,
  ) {}

  @Get(':trip_id')
  @ApiOperation({ summary: 'Get trip details by trip_id' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  async getTrip(@Param('trip_id') trip_id: string, @Client() client: ClientRequest) {
    const client_id = client.id
    const getTripDto: GetTripDto = { trip_id }
    return await this.tripService.getTrip(getTripDto, client_id)
  }

  @Get()
  @ApiOperation({ summary: 'Get multiple trips by trip_ids' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  async getTrips(
    @Query('trip_ids', ParseArrayPipe) trip_ids: string[],
    @Client() client: ClientRequest
  ) {
    const client_id = client.id
    return await this.tripService.getTrips(trip_ids, client_id)
  }

  @Post("/create")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiCreatedResponse({ description: 'The trip has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiBody({ type: CreateTripDto })
  async createTrip(@Body() createTripDto: CreateTripDto, @Client() client: ClientRequest) {
    const client_id = client.id
    return await this.tripService.createTrip(createTripDto, client_id)
  }

  @Post('accept-adhoc')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Ad-hoc trip accepted successfully',
    type: AcceptAdhocTripDto
  })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiOperation({ summary: 'Add an order to an active trip' })
  @ApiBody({ type: AcceptAdhocTripDto })
  async acceptAdhocTrip(
    @Body() acceptAdhocTrip: AcceptAdhocTripDto, @Client() client: ClientRequest) {
      const client_id = client
    return await this.acceptAdhocTrip(acceptAdhocTrip, client_id)
  }
}