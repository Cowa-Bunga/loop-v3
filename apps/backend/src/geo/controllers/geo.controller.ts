import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { CreateGeoDto } from '../dto/create-geo.dto'
import { GeoService } from '../services/geo.service'
import { ApiOperation, ApiTags, ApiSecurity } from '@nestjs/swagger'
import { DEFAULT } from '../../assets/errors'
import {
  ResilienceInterceptor,
  TimeoutStrategy,
  ResilienceFactory
} from 'nestjs-resilience'

@Controller('geo')
@ApiTags('Geo Service')
@ApiSecurity('x-api-key')
export class GeoController {
  constructor(private readonly service: GeoService) {}

  @Get()
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: 'Get all spatial trip data' })
  public async getAll() {
    return await this.service.getAll()
  }

  @Post()
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(30000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: 'Create a new spatial trip record' })
  createGeo(@Body() params: CreateGeoDto): void {
    this.service.create(params)
  }

  @Post('range')
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: 'Get a spatial range in km' })
  public async getRange(
    @Body() params: { lat: number; long: number; range: number }
  ) {
    return await this.service.getRange(params.lat, params.long, params.range)
  }
}
