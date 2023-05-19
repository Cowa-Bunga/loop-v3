import {  Controller, Get, Param,  Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { ApiTags } from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { ApiGetOneRequest, ApiGetRequest } from '../../shared/decorators/api.decorator'

const SERVICE_NAME = 'Order'
@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiGetRequest(SERVICE_NAME)
  @Get()
  async getOrders(@Client() client: ClientRequest, @Query('order_ids') order_ids?: string[]) {
    let orders
    if (order_ids && order_ids.length > 0) {
      orders = await this.orderService.getOrders(order_ids, client)
    } else {
      orders = await this.orderService.getAllOrders(client)
    }

    return orders
  }

  @ApiGetOneRequest(SERVICE_NAME)
  @Get(':order_id')
  async getOrder(@Param('order_id') order_id: string, @Client() client: ClientRequest) {
    return await this.orderService.getOrder(order_id, client.id)
  }
}
