import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { Driver, EssentialDriver } from './entities/driver.entity'

@Injectable()
export class DriverService {
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
}
