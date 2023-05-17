import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Query,
  Request,
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
import { TripService } from './trip.service'
import { CreateTripDto } from './dto/create-trip.dto'
import { GetTripDto } from './dto/get-trip.dto'
//import { AcceptAdhocTripDto } from './dto/accept-adhoc-trip.dto'
//import { AcceptAdhocTripService } from './accept-adhoc-trip.service'

@ApiTags('Trips')
@Controller('trip')
@ApiSecurity('x-api-key')
export class TripController {
  constructor(
    private readonly tripService: TripService //private readonly acceptAdhocTripService: AcceptAdhocTripService
  ) {}

  @Get(':trip_id')
  @ApiOperation({ summary: 'Get trip details by trip_id' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  async getTrip(@Param('trip_id') trip_id: string, @Request() req) {
    const client_id = req.client
    const getTripDto: GetTripDto = { trip_id }
    return await this.tripService.getTrip(getTripDto, client_id)
  }

  @Get()
  @ApiOperation({ summary: 'Get multiple trips by trip_ids' })
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  async getTrips(@Query('trip_ids', ParseArrayPipe) trip_ids: string[], @Request() req) {
    const client_id = req.client
    return await this.tripService.getTrips(trip_ids, client_id)
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiCreatedResponse({ description: 'The trip has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  @ApiBody({ type: CreateTripDto })
  async createTrip(@Body() createTripDto: CreateTripDto, @Request() req) {
    const client_id = req.client
    return await this.tripService.createTrip(createTripDto, client_id)
  }

  // @Post('accept-adhoc')
  // @HttpCode(HttpStatus.CREATED)
  // @ApiCreatedResponse({
  //   description: 'Ad-hoc trip accepted successfully',
  //   type: AcceptAdhocTripDto
  // })
  // @ApiBadRequestResponse({ description: 'Invalid input data provided.' })
  // @ApiOperation({ summary: 'Add an order to an active trip' })
  // @ApiBody({ type: AcceptAdhocTripDto })
  // async acceptAdhocTrip(
  //   @Body() acceptAdhocTrip: AcceptAdhocTripDto,
  //   @Request() req
  // ) {
  //   const client_id = req.client
  //   return await this.acceptAdhocTripService.acceptAdhocTrip(acceptAdhocTrip, client_id)
  // }
}
