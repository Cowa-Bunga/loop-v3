import { Controller, Get, Param, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { ApiTags } from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { ApiGetOneRequest, ApiGetRequest } from '../../shared/decorators/api.decorator'
import { Order } from './entities/order.entity'

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiGetRequest('Order')
  @Get()
  async getOrders(@Client() client: ClientRequest, @Query('order_ids') order_ids?: string[]) {
    let orderDocs
    if (order_ids && order_ids.length > 0) {
      orderDocs = await this.orderService.getOrders(client, order_ids)
    } else {
      orderDocs = await this.orderService.getAllOrders(client)
    }
    const orders = orderDocs.map((order) => {
      return new Order(order)
    })
    console.log(orders)
    return orders
  }

  @ApiGetOneRequest('Order')
  @Get(':order_id')
  async getOrder(@Client() client: ClientRequest, @Param('order_id') order_id: string) {
    return new Order(await this.orderService.getOrder(client, order_id))
  }
}
