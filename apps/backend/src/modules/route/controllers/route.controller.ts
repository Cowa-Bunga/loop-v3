import { RouteService } from '../services/route.service'
import { ApiOperation, ApiTags, ApiSecurity } from '@nestjs/swagger'
import { DEFAULT } from '../../../assets/errors'
import { Controller, Get, Post, Param, Request, UseInterceptors } from '@nestjs/common'
import { ResilienceInterceptor, TimeoutStrategy, ResilienceFactory } from 'nestjs-resilience'
import { ValhallaService } from '../services/valhalla.service'

@Controller('route')
@ApiTags('Routing Service')
@ApiSecurity('x-api-key')
export class RouteController {
  constructor(private readonly routeService: RouteService, readonly valhallaService: ValhallaService) {}

  @Get()
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: 'Get spatial route data' })
  async loadRoute() {
    return await this.valhallaService.valhalla()
  }

  @Post(':trip_id')
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: 'Get all spatial trip data by trip_id' })
  getRouteByTripId(@Param('order_id') trip_id: string, @Request() req) {
    return this.valhallaService.getRouteByTripId(trip_id, req)
  }
}
