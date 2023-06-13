import { Controller, Get, Param, Query } from '@nestjs/common'
import { OrderService } from './order.service'
import { ApiTags } from '@nestjs/swagger'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { ApiGetOneRequest, ApiGetRequest } from '../../shared/decorators/api.decorator'
import { Order } from './entities/order.entity'
import { DriverService } from '../driver/driver.service'
import { TripService } from '../trip/trip.service'

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly tripService: TripService,
    private readonly driverService: DriverService
  ) {}

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
    return orders
  }

  @ApiGetOneRequest('Order')
  @Get(':order_id')
  async getOrder(@Client() client: ClientRequest, @Param('order_id') order_id: string) {
    const orderDoc = await this.orderService.getOrder(client, order_id)
    const order = new Order(orderDoc)

    if (!orderDoc.data().trip_id) {
      return order
    }

    const tripDoc = await this.tripService.getTrip(client, orderDoc.data().trip_id)

    if (tripDoc.data().driver) {
      const driverDoc = await this.driverService.getDriverByRef(tripDoc.data().driver)
      Object.assign(order, {
        driver_id: driverDoc.id,
        driver_name: driverDoc.data().name
      })
    }

    return order
  }
}
