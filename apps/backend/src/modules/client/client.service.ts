import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

@Injectable()
export class ClientService {
  async getClientDoc(client_id: string) {
    const db = admin.firestore()
    const client = await db.collection('clients').doc(client_id).get()

    return client
  }

  async getClientByKey(apiKey: string) {
    const db = admin.firestore()
    const clients = await db.collection('clients').where('api.key', '==', apiKey).limit(1).get()
    return clients
  }
}
