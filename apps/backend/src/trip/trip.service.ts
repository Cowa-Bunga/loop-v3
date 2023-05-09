import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { GetTripDto } from './dto/get-trip.dto'

@Injectable()
export class TripService {
  //TODO make use of order entity

  async getTrips(trip_ids: string[], client_id: string) {
    const db = admin.firestore()
    const refs = trip_ids.map((id) =>
      db.doc(`clients/${client_id}/trips/${id}`)
    )
    const snapshot = await db.getAll(...refs)
    const tips = snapshot.map((doc) => {
      return {
        id: doc.id,
        client_id: client_id,
        ...doc.data()
      }
    })
    return tips
  }

  async getTrip(getTripDto: GetTripDto, client_id: string) {

    const { trip_id } = getTripDto

    const db = admin.firestore()
    const trip = await db
      .collection('clients')
      .doc(client_id)
      .collection('trips')
      .doc(trip_id)
      .get()

    const tripData = trip.data()

    if (tripData.trip_id) {
      //TODO replace with trip service
      const trip = await db
        .collection('clients')
        .doc(client_id)
        .collection('trips')
        .doc(tripData.trip_id)
        .get()
      if (trip.data().driver) {
        //TODO replace with driver service
        const driver = await trip.data().driver.get()
        Object.assign(tripData, {
          driver_id: driver.id,
          driver_name: driver.data().name
        })
      }
    }

    return {
      id: trip.id,
      ...tripData,
      client_id: client_id,
      
    }
  }
}
