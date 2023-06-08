import { Injectable } from '@nestjs/common'
import { OrderService } from '../order/order.service'
import { ClientRequest } from '../../shared/entities/request.entity'
import { TrackOrderDto } from './dtos/tracking.dto'
import { TripService } from '../trip/trip.service'
import * as admin from 'firebase-admin'
import { DocumentReference, DocumentSnapshot, Transaction } from 'firebase-admin/firestore'

@Injectable()
export class TrackingService {
  constructor(private readonly orderService: OrderService, private readonly tripService: TripService) {}

  async startTracking(client: ClientRequest, trackOrderDto: TrackOrderDto): Promise<DocumentSnapshot> {
    const db = admin.firestore()

    const { order_id } = trackOrderDto

    const trackingDoc = await db.runTransaction(async (transaction: Transaction) => {
      const trackingDoc = await this.trackOrder(client, trackOrderDto, transaction)
      await this.orderService.editOrder(client, order_id, { tracking_id: trackingDoc.id }, transaction)
      return trackingDoc
    })

    return trackingDoc
  }

  async trackOrder(
    client: ClientRequest,
    trackOrderDto: TrackOrderDto,
    transaction?: Transaction
  ): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const trackingRef: DocumentReference = db.collection('order-tracking').doc()

    const data = {
      client_id: client.id,
      ...trackOrderDto,
      created_at: admin.firestore.FieldValue.serverTimestamp()
    }

    if (transaction) {
      transaction.set(trackingRef, data, { merge: true })
    } else {
      await trackingRef.set(data, { merge: true })
    }

    return trackingRef.get()
  }
}
