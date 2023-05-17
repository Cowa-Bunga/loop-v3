import * as admin from 'firebase-admin'
import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { CreateTripDto } from './dto/create-trip.dto'
import { GetTripDto } from './dto/get-trip.dto'

@Injectable()
export class TripService {
  async getTrips(trip_ids: string[], client_id: string) {
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
          ...doc.data()
        })
      } else {
        invalidTripIds.push(trip_ids[index])
      }
    })

    const result = {
      trips,
      message: ''
    }

    if (invalidTripIds.length > 0) {
      result.message = `No trips found for the following trip IDs: ${invalidTripIds.join(
        ', '
      )}.`
    }

    return result
  }

  async getTrip(getTripDto: GetTripDto, client_id: string) {
    const { trip_id } = getTripDto

    const db = admin.firestore()
    const tripRef = db
      .collection('clients')
      .doc(client_id)
      .collection('trips')
      .doc(trip_id)

    const tripSnapshot = await tripRef.get()

    if (!tripSnapshot.exists) {
      throw new NotFoundException(`Trip with ID '${trip_id}' not found.`)
    }

    const tripData = tripSnapshot.data()

    if (tripData.driver) {
      const driverSnapshot = await tripData.driver.get()
      Object.assign(tripData, {
        driver_id: driverSnapshot.id,
        driver_name: driverSnapshot.data().name
      })
    }

    return {
      id: tripSnapshot.id,
      ...tripData,
      client_id: client_id
    }
  }

  async createTrip(
    createTripDto: CreateTripDto,
    client_id: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> {
    const {
      branch_id,
      order_ids,
      vehicle_type,
      compute_route,
      automatic_assignment
    } = createTripDto

    const db = admin.firestore()
    const refs = order_ids.map((id) =>
      db.doc(`clients/${client_id}/orders/${id}`)
    )
    const tripRef = db
      .collection('clients')
      .doc(client_id)
      .collection('trips')
      .doc()
    const branchRef = db
      .collection('clients')
      .doc(client_id)
      .collection('branches')
      .doc(branch_id)
    const clientRef = db.collection('clients').doc(client_id)

    await db.runTransaction(async (transaction) => {
      const [clientSnapshot, branchSnapshot, ordersSnapshot] =
        await Promise.all([
          transaction.get(clientRef),
          transaction.get(branchRef),
          transaction.getAll(...refs)
        ])

      const clientData = clientSnapshot.data()

      if (!branchSnapshot.exists) {
        throw new BadRequestException('Provide a valid branch')
      }

      if (!clientData.vehicle_types.includes(vehicle_type)) {
        throw new BadRequestException(
          `Provide a vehicle type that matches any of the following: [${clientData.vehicle_types}]`
        )
      }

      const order_ids = []
      let updatedServiceTypeRoute

      for (const orderSnapshot of ordersSnapshot) {
        const orderData = orderSnapshot.data()

        if (!orderSnapshot.exists) {
          throw new BadRequestException(
            `Order ${orderSnapshot.id}, to be batched does not exist`
          )
        }

        if (orderData.branch.id !== branch_id) {
          throw new BadRequestException(
            `Order ${orderSnapshot.id}, doesn't belong to the same branch`
          )
        }

        if (orderData.status !== 'pending') {
          throw new BadRequestException(
            `Order ${orderSnapshot.id}, has been allocated already`
          )
        }

        // Add the service type route for certain clients based on their client_type
        if (
          updatedServiceTypeRoute === undefined &&
          clientData.client_type === 'LOGISTICS'
        ) {
          updatedServiceTypeRoute = true
        }

        // Make sure skeleton orders are not being pushed through normal route optimization
        if (!updatedServiceTypeRoute && orderData.address === 'TBC') {
          throw new BadRequestException(
            `Skeleton orders cannot be assigned to this Trip; updatedServiceTypeRoute is set to false or undefined`
          )
        }

        order_ids.push(orderSnapshot.id)

        const orderUpdate = {
          status: 'batched',
          assignable: true,
          trip_id: tripRef.id,
          history: admin.firestore.FieldValue.arrayUnion({
            status: 'batched',
            timestamp: admin.firestore.Timestamp.now()
          })
        }

        transaction.update(orderSnapshot.ref, orderUpdate)
      }

      const tripData = {
        status: 'pending',
        vehicle_type: vehicle_type,
        compute_route: compute_route,
        automatic_assignment: automatic_assignment,
        service_type_route: updatedServiceTypeRoute,
        history: admin.firestore.FieldValue.arrayUnion({
          status: 'pending',
          timestamp: admin.firestore.Timestamp.now()
        }),
        branch: db.doc(`/clients/${client_id}/branches/${branch_id}`),
        orders: order_ids,
        created_at: admin.firestore.FieldValue.serverTimestamp()
      }

      transaction.set(tripRef, tripData)

      return { id: tripRef.id }
    })
  }
}
