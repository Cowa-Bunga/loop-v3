import { Controller, Get } from '@nestjs/common'
import { RouteService } from './route.service'

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  findAll() {
    // return this.routeService.osrm()
    return this.routeService.valhalla()
  }
}
