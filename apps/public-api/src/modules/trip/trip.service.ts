import * as admin from 'firebase-admin'
import { DocumentData } from 'firebase/firestore'
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { CreateTripDto, AcceptAdhocTripDto } from './dto/trip.dto'
import { ClientRequest } from '../../shared/entities/request.entity'
import { DocumentSnapshot } from 'firebase-admin/firestore'

@Injectable()
export class TripService {
  async getTripsByTripIds(trip_ids: string[], client_id: string) {
    const db = admin.firestore()
    const refs = trip_ids.map((id) => db.doc(`clients/${client_id}/trips/${id}`))

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
      result.message = `No trips found for the following trip IDs: ${invalidTripIds.join(', ')}.`
    }

    return result
  }

  /**
   * Returns an trip for a given trip id
   * @param client currently authenticated client
   * @param trip id of trip to retrieve
   * @returns Trip DocumentSnapshot
   */
  async getTrip(client: ClientRequest, trip_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const trip = await db.collection('clients').doc(client.id).collection('trips').doc(trip_id).get()

    if (!trip.exists) {
      throw new NotFoundException(`Trip with ID '${trip_id}' not found.`)
    }

    // if (tripData.driver) {
    //   const driverSnapshot = await tripData.driver.get()
    //   Object.assign(tripData, {
    //     driver_id: driverSnapshot.id,
    //     driver_name: driverSnapshot.data().name
    //   })
    // }

    return trip
  }

  async createTrip(createTripDto: CreateTripDto, client_id: string): Promise<any> {
    const { branch_id, order_ids, vehicle_type, compute_route, automatic_assignment } = createTripDto

    const db = admin.firestore()
    const refs = order_ids.map((id) => db.doc(`clients/${client_id}/orders/${id}`))
    const tripRef = db.collection('clients').doc(client_id).collection('trips').doc()
    const branchRef = db.collection('clients').doc(client_id).collection('branches').doc(branch_id)
    const clientRef = db.collection('clients').doc(client_id)

    await db.runTransaction(async (transaction) => {
      const [clientSnapshot, branchSnapshot, ordersSnapshot] = await Promise.all([
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
          throw new BadRequestException(`Order ${orderSnapshot.id}, to be batched does not exist`)
        }

        if (orderData.branch.id !== branch_id) {
          throw new BadRequestException(`Order ${orderSnapshot.id}, doesn't belong to the same branch`)
        }

        if (orderData.status !== 'pending') {
          throw new BadRequestException(`Order ${orderSnapshot.id}, has been allocated already`)
        }

        // Add the service type route for certain clients based on their client_type
        if (updatedServiceTypeRoute === undefined && clientData.client_type === 'LOGISTICS') {
          updatedServiceTypeRoute = true
        }

        // Make sure skeleton orders are not being pushed through normal route optimization
        if (!updatedServiceTypeRoute && orderData.address === 'TBC') {
          throw new BadRequestException(
            `Skeleton orders cannot be assigned to this Trip updatedServiceTypeRoute is set to false or undefined`
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

  async getTripsByBranchIds(branchIds: string[], clientId: string, statuses: string[]): Promise<DocumentData[]> {
    const db = admin.firestore()
    const trips: DocumentData[] = []

    for (const branchId of branchIds) {
      const branchRef = db.doc(`clients/${clientId}/branches/${branchId}`)
      const q = db
        .collection(`clients/${clientId}/trips`)
        .where('branch', '==', branchRef)
        .where('status', 'in', statuses)
      const querySnapshot = await q.get()

      querySnapshot.forEach((tripDoc) => {
        const tripData = tripDoc.data()
        trips.push({
          id: tripDoc.id,
          client_id: clientId,
          ...tripData
        })
      })
    }

    return trips
  }
}

@Injectable()
export class AcceptAdhocTripService {
  async acceptAdhocTrip({ driver_id, trip_id, order_id }: AcceptAdhocTripDto, client_id: string) {
    const db = admin.firestore()
    const driverRef = db.collection('drivers').doc(driver_id)
    const orderRef = db.collection('clients').doc(client_id).collection('orders').doc(order_id)
    const tripRef = db.collection('clients').doc(client_id).collection('trips').doc(trip_id)
    const deliveryList: string[] = []
    const collectionList: string[] = []

    await db.runTransaction(async (transaction) => {
      const [tripSnapshot, driverSnapshot, adhocOrderSnapshot] = await Promise.all([
        transaction.get(tripRef),
        transaction.get(driverRef),
        transaction.get(orderRef)
      ])

      const trip = tripSnapshot.data()
      const adhocOrder = adhocOrderSnapshot.data()
      const driver = driverSnapshot.data()

      if (!trip) {
        throw new Error('Trip does not exist')
      }

      if (!adhocOrder) {
        throw new Error('Order does not exist')
      }

      if (!driver) {
        throw new Error('Driver does not exist')
      }

      // Check driver conditions
      if (driver.blocked) {
        throw new Error('Trip cannot be accepted by a blocked driver')
      }
      if (driver.lunch) {
        throw new Error('Trip cannot be accepted by a driver on lunch')
      }
      if (!driver.available) {
        throw new Error('Trip cannot be accepted by an offline driver')
      }

      const { task_type_trip } = await this.isTaskTypeTrip(client_id, trip_id)
      if (task_type_trip) {
        // This is a task type trip.
        if (adhocOrder.task_type == undefined || adhocOrder.task_type == null || adhocOrder.task_type == '') {
          throw new Error('order is not a task')
        } else if (!['delivery', 'collection'].includes(adhocOrder.task_type)) {
          throw new Error('order is not of task type delivery or collection')
        }
      } else {
        // This is a normal type trip.
        if (adhocOrder.task_type !== undefined) {
          if (adhocOrder.task_type != '') {
            throw new Error('order is a task')
          }
        } else {
          throw new Error('order is a task')
        }

        if (trip.status !== 'accepted') {
          throw new Error('order cannot be added to trip')
        }
      }

      let orders = trip.orders

      if (orders.includes(order_id)) {
        throw new Error('Order already in trip')
      }

      if (trip.compute_route) {
        const ordersRef = await this.getOrdersInTrip(client_id, orders)

        for (const order of ordersRef) {
          if (order.task_type == 'delivery') {
            deliveryList.push(order.id)
          } else {
            collectionList.push(order.id)
          }
        }

        if (adhocOrder.task_type == 'delivery') {
          deliveryList.push(order_id)
        } else {
          collectionList.push(order_id)
        }

        orders = [...deliveryList, ...collectionList]
      } else {
        orders.push(order_id)
      }

      transaction
        .update(driverRef, {
          active_trip: { client_id, trip_id }
        })
        .update(orderRef, {
          trip_id: trip_id,
          status: 'batched'
        })

      await this.dosSilentNotifyActiveDriver(client_id, trip_id, driver_id, order_id)
    })

    return { id: tripRef.id }
  }

  private async getOrdersInTrip(client_id: string, order_ids: string[] = []): Promise<any> {
    const db = admin.firestore()

    if (order_ids.length === 0) {
      return []
    }

    const refs = order_ids.map((id) => db.doc(`clients/${client_id}/orders/${id}`))
    const snapshot = await db.getAll(...refs)

    const orders = snapshot.map((doc) => {
      if (!doc.exists) {
        throw new Error(`order ${doc.id} does not exist`)
      }

      return {
        id: doc.id,
        ...doc.data(),
        client_id
      }
    })
    return orders
  }

  async isTaskTypeTrip(client_id: string, trip_id: string): Promise<any> {
    const db = admin.firestore()

    const trip = await db.collection('clients').doc(client_id).collection('trips').doc(trip_id).get()

    if (!trip.exists) {
      throw new Error('trip does not exist 2')
    }

    let task_type_trip = false
    const data = trip.data()

    const [orders] = await Promise.all([this.getOrdersInTrip(client_id, data.orders)])

    for (const order of orders) {
      if (['delivery', 'collection'].includes(order.task_type)) {
        task_type_trip = true
        break
      }
    }

    return {
      task_type_trip: task_type_trip
    }
  }

  async dosSilentNotifyActiveDriver(
    client_id: string,
    trip_id: string,
    driver_id: string,
    order_id: string
  ): Promise<any> {
    const uri = `https://cb-driver-pooling-api-ukxjb66ceq-ew.a.run.app/pooling/notify-active-driver`

    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        client_id,
        trip_id,
        driver_id,
        order_id
      })
    }

    const response = await fetch(uri, options)

    const result = await response.json()
    return result
  }
}
