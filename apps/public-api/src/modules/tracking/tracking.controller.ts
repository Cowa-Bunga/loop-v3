import { BadRequestException, Controller, Post } from '@nestjs/common'
import { TrackingService } from './tracking.service'
import { Client } from '../../shared/decorators/client.decorator'
import { ClientRequest } from '../../shared/entities/request.entity'
import { TrackOrderDto } from './dtos/tracking.dto'
import { Order } from '../order/entities/order.entity'
import { Trip } from '../trip/entities/trip.entity'
import { OrderService } from '../order/order.service'
import { TripService } from '../trip/trip.service'
import { NotificationService } from '../notification/notification.service'

@Controller('tracking')
export class TrackingController {
  constructor(
    private readonly trackingService: TrackingService,
    private readonly orderService: OrderService,
    private readonly tripService: TripService,
    private readonly notificationService: NotificationService
  ) {}

  @Post('/start')
  async startTracking(@Client() client: ClientRequest, trackOrderDto: TrackOrderDto) {
    const { order_id, trip_id } = trackOrderDto

    const order = new Order(await this.orderService.getOrder(client, order_id))
    const trip = await this.tripService.getTripAndDriver(client, trip_id)

    if (!trip.containsOrder(order.id)) {
      throw new BadRequestException('Order does not belong to this trip')
    }

    if (order.tracking_id) {
      throw new BadRequestException('Order is already being tracked')
    }
    const trackingDoc = await this.trackingService.startTracking(client, trackOrderDto)

    await this.notificationService.sendTrackingPage(client)
    return trackingDoc
  }
}
