import { Controller, Get, Post, Param, Body } from '@nestjs/common'
import { TrackingService } from './tracking.service'
import { CreateTrackingDto } from './dto/create-tracking.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('tracking')
@ApiTags('Tracking Service')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get('getDriverById/:driver_id')
  @ApiOperation({ summary: '∞ Get locations by driver id' })
  getDriverById(@Param('driver_id') driver_id: string) {
    return this.trackingService.getDriverById(driver_id)
  }

  @Get('getByTripId/:trip_id')
  @ApiOperation({ summary: '∞ Get locations by trip id' })
  getByTripId(@Param('trip_id') trip_id: string) {
    return this.trackingService.getByTripId(trip_id)
  }

  @Post()
  @ApiOperation({ summary: '∞ Send a location update' })
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto)
  }
}
