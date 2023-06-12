import { Controller, Get, Param, UseInterceptors } from '@nestjs/common'
import { QueryService } from './query.service'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { DEFAULT } from '../../assets/errors'
import { ResilienceInterceptor, TimeoutStrategy, ResilienceFactory } from 'nestjs-resilience'

@ApiTags('Big Query Service')
// @ApiSecurity('x-api-key')
@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get('driver-location/:client_id')
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: '∞ Get all drivers and locations' })
  driverLocation(@Param('client_id') client_id: string) {
    return this.queryService.driverLocation(client_id)
  }

  @Get('drivers-online/:client_id')
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: '∞ Get a list of drivers online by client id' })
  driversOnline(@Param('client_id') client_id: string) {
    return this.queryService.driversOnline(client_id)
  }

  @Get('orders-by-location/:client_id')
  @UseInterceptors(
    ResilienceInterceptor(
      new TimeoutStrategy(60000),
      ResilienceFactory.createFallbackStrategy(() => DEFAULT.TIMEOUT)
    )
  )
  @ApiOperation({ summary: '∞ Get a summary of delivered orders by location' })
  deliveredOrders(@Param('client_id') client_id: string) {
    return this.queryService.deliveredOrders(client_id)
  }
}
