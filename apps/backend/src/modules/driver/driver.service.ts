import { BadRequestException, Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore'
import { Driver, EssentialDriver } from './entities/driver.entity'
import { CreateDriverDto } from './dtos/driver.dto'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'

@Injectable()
export class DriverService {
  private async getDefaultDriverValues(createDriverDto: CreateDriverDto, client: ClientRequest, user: UserRequest) {
    const db = admin.firestore()
    const payment_setting = createDriverDto.payment_setting || 'default'

    return {
      idle_since: admin.firestore.FieldValue.serverTimestamp(),
      lunch: false,
      on_active_trip: false,
      blocked: false,
      client: db.doc(`/clients/${client.id}`),
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      created_by: db.doc(`/clients/${client.id}/drivers/${user.id}`),
      primary_employer: client.id,
      payment_setting: payment_setting ? db.doc(`/clients/${client.id}/payment_settings/${payment_setting}`) : undefined
    }
  }

  async getDriversForHub(hub_id: string, client_id: string, essential = false): Promise<Driver[] | EssentialDriver[]> {
    const delivery_permission = {
      hub_id: hub_id,
      promisor_id: client_id
    }
    const db = admin.firestore()
    const driverDocs = await db
      .collection('drivers')
      .where('delivery_permissions', 'array-contains', delivery_permission)
      .get()

    const orders = driverDocs.docs.map((doc) => {
      return essential ? new EssentialDriver(doc) : new Driver(doc)
    })

    return orders
  }

  async getDriverByEmail(email: string): Promise<Driver> {
    const db = admin.firestore()
    const drivers = await db.collection('drivers').where('email', '==', email).limit(1).get()

    if (drivers.empty) {
      return undefined
    }

    return new Driver(drivers.docs[0])
  }

  async createDriver(
    createDriverDto: CreateDriverDto,
    client: ClientRequest,
    user: UserRequest
  ): Promise<DocumentSnapshot> {
    const db = admin.firestore()

    // Get driver by email, and check if it exists
    const existingHub = await this.getDriverByEmail(createDriverDto.email)

    // Throw error if driver exists
    if (existingHub) {
      throw new BadRequestException('Driver with that email already exists.')
    }

    const defaultDriverValues = await this.getDefaultDriverValues(createDriverDto, client, user)

    // Create a new driver
    const driverRef: DocumentReference = db.collection('drivers').doc()
    await driverRef.set({
      ...createDriverDto,
      ...defaultDriverValues
    })

    // Retrieve the newly created driver
    return await driverRef.get()
  }
}
