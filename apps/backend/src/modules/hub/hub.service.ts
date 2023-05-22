import { BadRequestException, Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore'
import { EssentialHub, Hub } from './entities/hub.entity'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { CreateHubDto } from './dtos/hub.dto'

@Injectable()
export class HubService {
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

  async getHub(hub_ref: DocumentReference, essential = false): Promise<Hub | EssentialHub> {
    const hubDoc = await hub_ref.get()
    const hub = essential ? new EssentialHub(hubDoc) : new Hub(hubDoc)
    return hub
  }

  async getHubByName(name: string, client: ClientRequest): Promise<Hub> {
    const db = admin.firestore()
    const hubs = await db
      .collection('clients')
      .doc(client.id)
      .collection('hubs')
      .where('name', '==', name)
      .limit(1)
      .get()

    if (hubs.empty) {
      return undefined
    }

    return new Hub(hubs.docs[0])
  }

  async createHub(createHubDto: CreateHubDto, client: ClientRequest, user: UserRequest): Promise<Hub> {
    const db = admin.firestore()

    // Get hub by name, and check if it exists
    const existingHub = await this.getHubByName(createHubDto.name, client)

    // Throw error if hub exists
    if (existingHub) {
      throw new BadRequestException('Hub with that name already exists.')
    }

    // Create a new hub for client and user
    const hubRef: DocumentReference = db.collection('clients').doc(client.id).collection('hubs').doc()
    await hubRef.set({
      name: createHubDto.name,
      created_by: db.doc(`/clients/${client.id}/users/${user.id}`),
      created_at: admin.firestore.FieldValue.serverTimestamp()
    })

    // Retrieve the newly created hub
    const hub = await hubRef.get()
    return new Hub(hub)
  }
}
