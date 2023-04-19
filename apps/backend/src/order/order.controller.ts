import { Controller, Get, ParseArrayPipe, Query, Request } from '@nestjs/common'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(
    @Query('order_ids', ParseArrayPipe) order_ids: string[],
    @Request() req
  ) {
    const client_id = req.client
    return await this.orderService.getOrders(order_ids, client_id)
  }
}
