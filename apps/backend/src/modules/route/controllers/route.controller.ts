import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { DEFAULT } from '../../../assets/errors'
import { Controller, Get, Post, Param, Request, UseInterceptors } from '@nestjs/common'
import { ResilienceInterceptor, TimeoutStrategy, ResilienceFactory } from 'nestjs-resilience'
import { ValhallaService } from '../services/valhalla.service'
import { Point } from 'geojson'
import { ValhallaCostingType } from '@routingjs/valhalla'

@Controller('route')
@ApiTags('Routing Service')
export class RouteController {
  constructor(private readonly valhallaService: ValhallaService) {}

  @Post('trip/plan')
  @ApiOperation({ summary: '∞ Get spatial route data for an array of locations' })
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(DEFAULT.API_TIMEOUT),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  async getRouteforLocations(@Param('locations') locations: Point[]) {
    return await this.valhallaService.getRouteData(locations)
  }

  @Get('trip-data/:trip_id')
  @ApiOperation({ summary: '∞ Dynamically get stored geometries for a trip_id' })
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(DEFAULT.API_TIMEOUT),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  getRouteByTripId(@Param('trip_id') trip_id: string, @Request() req) {
    return this.valhallaService.getRouteByTripId(trip_id, req)
  }

  @Post('matrix')
  @ApiOperation({ summary: '∞ Get a matrix calculation on a Point array' })
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(DEFAULT.API_TIMEOUT),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  async matrix(@Param('locations') locations: Point[]) {
    return await this.valhallaService.matrix(locations)
  }

  @Post('directions')
  @ApiOperation({ summary: '∞ Get directions' })
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(DEFAULT.API_TIMEOUT),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  async directions(@Param('locations') locations: Point[]) {
    return await this.valhallaService.matrix(locations)
  }

  @Post('isochrone')
  @ApiOperation({ summary: '∞ Get a isochrone calculation on a Point' })
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(DEFAULT.API_TIMEOUT),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  async isochrone(
    @Param('locations') locations: Point[],
    @Param('type') type: ValhallaCostingType,
    @Param('distance') distance: [number, number]
  ) {
    return await this.valhallaService.isochrones(locations, type, distance)
  }
}
