import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { GeoEntity } from '../entities/geo.entity'
import { GeoService } from '../services/geo.service'
import {
  ResilienceInterceptor,
  TimeoutStrategy,
  ResilienceFactory
} from 'nestjs-resilience'

const DEFAULT = {
  TIMEOUT: {
    status: 401,
    message: 'Request timed out'
  }
}

@Controller('geo')
export class GeoController {
  constructor(private readonly service: GeoService) {}

  @Get()
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
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
  createGeo(@Body() location: GeoEntity): void {
    console.warn(location)
    this.service.create(location)
  }

  @Post('range')
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  public async getRange(
    @Body() location: { lat: number; long: number; range: number }
  ) {
    return await this.service.getRange(
      location.lat,
      location.long,
      location.range
    )
  }
}
