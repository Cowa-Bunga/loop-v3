import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore'
import { CreateDriverDto } from './dtos/driver.dto'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'

@Injectable()
export class DriverService {
  /**
   * Returns the default values for a driver to be used on driver creation
   * @param client currently authenticated client
   * @param user currently authenticated user
   * @param createDriverDto driver details to be created
   * @returns object containing default values for a driver
   */
  private async getDefaultDriverValues(client: ClientRequest, user: UserRequest, createDriverDto: CreateDriverDto) {
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

  /**
   * Returns a list of drivers for a given hub
   * @param client currently authenticated client
   * @param hub DocumentReference for specified hub
   * @returns Array of Driver DocumentSnapshots
   */
  async getDriversForHub(client: ClientRequest, hub: DocumentReference): Promise<DocumentSnapshot[]> {
    const delivery_permission = {
      hub_id: hub.id,
      promisor_id: client.id
    }

    const db = admin.firestore()
    const driverDocs = await db
      .collection('drivers')
      .where('delivery_permissions', 'array-contains', delivery_permission)
      .get()

    return driverDocs.docs
  }

  /**
   * Check if a driver exists for a given email
   * @param email email to check against
   * @returns true if the driver exists, else false
   */
  async checkDriverExists(email: string): Promise<boolean> {
    const db = admin.firestore()
    const drivers = await db.collection('drivers').where('email', '==', email).limit(1).get()

    return drivers.empty ? false : true
  }

  /**
   * Creates a new driver and adds it to the database for specified client
   * @param client currently authenticated client
   * @param user currently authenticated user
   * @param createDriverDto details of driver to be created
   * @returns DocumentSnapshot of created driver
   */
  async createDriver(
    client: ClientRequest,
    user: UserRequest,
    createDriverDto: CreateDriverDto
  ): Promise<DocumentSnapshot> {
    const db = admin.firestore()

    // Get the default driver values
    const defaultDriverValues = await this.getDefaultDriverValues(client, user, createDriverDto)

    const driverRef: DocumentReference = db.collection('drivers').doc()
    await driverRef.set({
      ...createDriverDto,
      ...defaultDriverValues
    })

    return await driverRef.get()
  }

  /**
   * Returns a Driver for a given driver DocumentReference
   * @param driver_ref driver to retrieve
   * @returns DocumentSnapshot of driver
   */
  async getDriverByRef(driver_ref: DocumentReference): Promise<DocumentSnapshot> {
    return await driver_ref.get()
  }
}
