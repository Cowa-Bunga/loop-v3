import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { CreateHubDto } from './dtos/hub.dto'
import { DocumentSnapshot } from 'firebase-admin/firestore'

@Injectable()
export class HubService {
  async getHubs(hub_refs: DocumentReference[]): Promise<DocumentSnapshot[]> {
    const db = admin.firestore()

    if (hub_refs.length === 0) {
      return []
    }

    const hubs = await db.getAll(...hub_refs)
    return hubs
  }

  async getHub(hub_ref: DocumentReference): Promise<DocumentSnapshot> {
    return await hub_ref.get()
  }

  async getHubById(client: ClientRequest, hub_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const hub = await db.collection('clients').doc(client.id).collection('hubs').doc(hub_id).get()

    return hub
  }

  async checkHubExists(client: ClientRequest, name: string): Promise<boolean> {
    const db = admin.firestore()
    const hubs = await db
      .collection('clients')
      .doc(client.id)
      .collection('hubs')
      .where('name', '==', name)
      .limit(1)
      .get()

    return hubs.empty ? false : true
  }

  async createHub(createHubDto: CreateHubDto, client: ClientRequest, user: UserRequest): Promise<DocumentSnapshot> {
    const db = admin.firestore()

    const hubRef: DocumentReference = db.collection('clients').doc(client.id).collection('hubs').doc()
    await hubRef.set({
      name: createHubDto.name,
      created_by: db.doc(`/clients/${client.id}/users/${user.id}`),
      created_at: admin.firestore.FieldValue.serverTimestamp()
    })

    return await hubRef.get()
  }
}
