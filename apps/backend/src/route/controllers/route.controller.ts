import { RouteService } from '../services/route.service'
import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseInterceptors
} from '@nestjs/common'
import {
  ResilienceInterceptor,
  TimeoutStrategy,
  ResilienceFactory
} from 'nestjs-resilience'

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(20000),
      ResilienceFactory.createFallbackStrategy(() => ({
        message: 'timeout 20000 occurred'
      }))
    )
  )
  async loadRoute() {
    // return this.routeService.osrm()
    return await this.routeService.valhalla()
  }

  @Post(':trip_id')
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(20000),
      ResilienceFactory.createFallbackStrategy(() => ({
        message: 'timeout 20000 occurred'
      }))
    )
  )
  getRouteByTripId(@Param('order_id') trip_id: string, @Request() req) {
    return this.routeService.getRouteByTripId(trip_id, req)
  }
}
