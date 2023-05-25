import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentSnapshot } from 'firebase-admin/firestore'

@Injectable()
export class ClientService {
  async getClientById(client_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const client = await db.collection('clients').doc(client_id).get()

    return client
  }

  async getClientByKey(apiKey: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const clients = await db.collection('clients').where('api.key', '==', apiKey).limit(1).get()
    return clients.docs.pop()
  }
}
