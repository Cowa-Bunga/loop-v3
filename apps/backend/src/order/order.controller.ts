import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  Request
} from '@nestjs/common'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Orders')
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

  @Get(':order_id')
  async getOrder(@Param('order_id') order_id: string, @Request() req) {
    const client_id = req.client
    return await this.orderService.getOrder(order_id, client_id)
  }

  @Post('/create')
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    const client_id = req.client
    return await this.orderService.createOrder(createOrderDto, client_id)
  }
}
