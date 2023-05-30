import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-admin/firestore'

@Injectable()
export class ClientService {
  /**
   * Get a client by id
   * @param client_id id of client to retrieve
   * @returns DocumentSnapshot of client object
   */
  async getClientById(client_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const client = await db.collection('clients').doc(client_id).get()

    return client
  }

  /**
   * Get a client by api key
   * @param api_key api key of client to retrieve
   * @returns DocumentSnapshot of client object
   */
  async getClientByKey(api_key: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const clients = await db.collection('clients').where('api.key', '==', api_key).limit(1).get()
    return clients.docs.pop()
  }
}
