import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore'

@Injectable()
export class HubService {
  /**
   * Get hubs
   * @function
   * @param {string} client_id
   * @param {string[]} order_ids
   *
   * @throws {Error}
   * @returns {Promise}
   */
  async getHubs(hub_refs: DocumentReference[]): Promise<any> {
    const db = admin.firestore()

    if (hub_refs.length === 0) {
      return []
    }

    const snapshot = await db.getAll(...hub_refs)

    const hubs = snapshot.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    return hubs
  }
}
