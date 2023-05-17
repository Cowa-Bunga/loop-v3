import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { ApiTags } from '@nestjs/swagger'
import { Client } from '../shared/decorators/client.decorator'
import { ClientRequest } from '../shared/entities/request.entity'
import { ApiGetOneRequest, ApiGetRequest, ApiPostRequest } from '../shared/decorators/api.decorator'

const SERVICE_NAME = 'Order'
@ApiTags(`${SERVICE_NAME}s`)
@Controller(`${SERVICE_NAME.toLowerCase()}`)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiGetRequest(SERVICE_NAME)
  @Get()
  async getOrders(@Client() client: ClientRequest, @Query('order_ids') order_ids?: string[]) {
    const client_id = client.id
    let orders
    if (order_ids && order_ids.length > 0) {
      orders = await this.orderService.getOrders(order_ids, client_id)
    } else {
      orders = await this.orderService.getAllOrders(client_id)
    }

    return orders
  }

  @ApiGetOneRequest(SERVICE_NAME)
  @Get(':order_id')
  async getOrder(@Param('order_id') order_id: string, @Client() client: ClientRequest) {
    return await this.orderService.getOrder(order_id, client.id)
  }

  @ApiPostRequest(SERVICE_NAME, CreateOrderDto)
  @Post('/create')
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Client() client: ClientRequest) {
    const client_id = client.id
    return await this.orderService.createOrder(createOrderDto, client_id)
  }
}
