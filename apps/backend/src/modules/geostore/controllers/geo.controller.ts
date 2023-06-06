import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { CreateGeoDto } from '../dto/create-geo.dto'
import { GeoService } from '../services/geo.service'
import { ApiOperation, ApiTags, ApiSecurity } from '@nestjs/swagger'
import { DEFAULT } from '../../../assets/errors'
import { ResilienceInterceptor, TimeoutStrategy, ResilienceFactory } from 'nestjs-resilience'

@Controller('geo')
@ApiTags('Geo Service')
@ApiSecurity('x-api-key')
export class GeoController {
  constructor(private readonly service: GeoService) {}

  @Get()
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(DEFAULT.API_TIMEOUT),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: '∞ Get all spatial trip data' })
  public async getAll() {
    return await this.service.getAll()
  }

  @Post()
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(DEFAULT.API_TIMEOUT),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: '∞ Create a new spatial trip record' })
  createGeo(@Body() params: CreateGeoDto): void {
    this.service.create(params)
  }
}
