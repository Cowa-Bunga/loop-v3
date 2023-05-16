import * as admin from 'firebase-admin'
import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common'
import { CreateTripDto } from './dto/create-trip.dto'
import { GetTripDto } from './dto/get-trip.dto'

@Injectable()
export class TripService {

  async getTrips(trip_ids: string[], client_id: string) {
    if (!trip_ids || trip_ids.length === 0) {
      throw new BadRequestException('No trip IDs provided.')
    }
  
    const db = admin.firestore()
    const refs = trip_ids.map((id) =>
      db.doc(`clients/${client_id}/trips/${id}`)
    )
    const snapshot = await db.getAll(...refs)
  
    const trips = []
    const invalidTripIds = []
  
    snapshot.forEach((doc, index) => {
      if (doc.exists) {
        trips.push({
          id: doc.id,
          client_id: client_id,
          ...doc.data(),
        })
      } else {
        invalidTripIds.push(trip_ids[index])
      }
    })
  
    const result = {
      trips,
      message: '',
    }
  
    if (invalidTripIds.length > 0) {
      result.message = `No trips found for the following trip IDs: ${invalidTripIds.join(', ')}.`
    }
  
    return result
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
  
    if (!trip.exists) {
      throw new NotFoundException(`Trip with ID '${trip_id}' not found.`)
    }
  
    const tripData = trip.data()
  
    if (trip_id) {
      const trip = await db
        .collection('clients')
        .doc(client_id)
        .collection('trips')
        .doc(trip_id)
        .get()
      if (trip.data().driver) {
        const driver = await trip.data().driver.get()
        Object.assign(tripData, {
          driver_id: driver.id,
          driver_name: driver.data().name,
        })
      }
    }
  
    return {
      id: trip.id,
      ...tripData,
      client_id: client_id,
    }
  }

  async createTrip(createTripDto: CreateTripDto, client_id: string): Promise<any> {
    const {
      branch_id,
      order_ids,
      vehicle_type,
      compute_route,
      automatic_assignment,
    } = createTripDto
    const db = admin.firestore()
    const refs = order_ids.map((id) => db.doc(`clients/${client_id}/orders/${id}`))
    const tripRef = db.collection('clients').doc(client_id).collection('trips').doc()
    const branchRef = db.collection('clients').doc(client_id).collection('branches').doc(branch_id)
    const clientRef = db.collection('clients').doc(client_id)

    await db.runTransaction(async (transaction) => {
      const [client, branch, orders] = await Promise.all([
        transaction.get(clientRef),
        transaction.get(branchRef),
        transaction.getAll(...refs),
      ])

      if (!branch.exists) {
        throw new BadRequestException(`Provide a valid branch`)
      }

      if (!client.exists) {
        throw new BadRequestException(`Provide a valid client`)
      }

      if (!client.data().vehicle_types.includes(vehicle_type)) {
        throw new BadRequestException(
          `Provide a vehicle type that match any of the following: [` +
            client.data().vehicle_types +
            `]`,
        )
      }

      const order_ids = []
      for (const order of orders) {
        if (!order.exists) {
          throw new BadRequestException(
            `Order ${order.id}, to be batched does not exist`,
          )
        }

        if (order.data().branch.id !== branch_id) {
          throw new BadRequestException(
            `Order ${order.id}, doesn't belong to the same branch`,
          )
        }

        if (order.data().status !== 'pending') {
          throw new BadRequestException(
            `Order ${order.id}, has been allocated already`,
          )
        }

        let updatedServiceTypeRoute = createTripDto.service_type_route

        // Add the service type route for certain clients based on their client_type
        if (updatedServiceTypeRoute === undefined) {
          if (client.data().client_type !== undefined) {
            if (client.data().client_type === "LOGISTICS") {
              updatedServiceTypeRoute = true
            }
          }
        }

        // Make sure skeleton orders are not being pushed through normal route optimization
        if (updatedServiceTypeRoute === undefined || updatedServiceTypeRoute === false) {
          // Check if there are any skeleton orders
          if (order.data().address === 'TBC') {
            throw new BadRequestException(
              `Skeleton orders cannot be assigned to this Trip; updatedServiceTypeRoute is set to false or undefined`,
            )
          }
        }

        order_ids.push(order.id)
        if (order.data().reset === true) {
          transaction.update(order.ref, {
            status: 'batched',
            assignable: true,
            clustered: false,
            trip_id: tripRef.id,
            history: admin.firestore.FieldValue.arrayUnion({
              status: 'batched',
              timestamp: admin.firestore.Timestamp.now(),
            }),
          })
        } else {
          transaction.update(order.ref, {
            status: 'batched',
            assignable: true,
            trip_id: tripRef.id,
            history: admin.firestore.FieldValue.arrayUnion({
              status: 'batched',
              timestamp: admin.firestore.Timestamp.now(),
            }),
          })
        }
  
        transaction.set(tripRef, {
          status: 'pending',
          vehicle_type: vehicle_type,
          compute_route: compute_route,
          automatic_assignment: automatic_assignment,
          service_type_route: updatedServiceTypeRoute,
          history: admin.firestore.FieldValue.arrayUnion({
            status: 'pending',
            timestamp: admin.firestore.Timestamp.now(),
          }),
          branch: db.doc(`/clients/${client_id}/branches/${branch_id}`),
          orders: order_ids,
          created_at: admin.firestore.FieldValue.serverTimestamp(),
        })
      }
  
      return { id: tripRef.id }
      }
    )
  } 
}