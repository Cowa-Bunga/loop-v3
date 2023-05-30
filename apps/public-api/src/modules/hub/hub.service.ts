import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'
import { CreateHubDto } from './dtos/hub.dto'
import { DocumentSnapshot } from 'firebase-admin/firestore'

@Injectable()
export class HubService {
  /**
   * Returns a list of hubs for a given hub DocumentReferences
   * @param hub_refs Array of hub DocumentReferences
   * @returns Array of Hub DocumentSnapshots
   */
  async getHubs(hub_refs: DocumentReference[]): Promise<DocumentSnapshot[]> {
    const db = admin.firestore()

    if (hub_refs.length === 0) {
      return []
    }

    const hubs = await db.getAll(...hub_refs)
    return hubs
  }

  /**
   * Returns a hub for a given hub DocumentReference
   * @param hub_ref hub to retrieve
   * @returns DocumentSnapshot of hub
   */
  async getHub(hub_ref: DocumentReference): Promise<DocumentSnapshot> {
    return await hub_ref.get()
  }

  /**
   * Returns a hub for a given hub id
   * @param client currently authenticated client
   * @param hub_id id of hub to retrieve
   * @returns DocumentSnapshot of hub
   */
  async getHubById(client: ClientRequest, hub_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const hub = await db.collection('clients').doc(client.id).collection('hubs').doc(hub_id).get()

    return hub
  }

  /**
   * Check if a hub exists for a given name
   * @param name name to check against
   * @returns true if the hub exists, else false
   */
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

  /**
   * Creates a new hub and adds it to the database for specified client
   * @param client currently authenticated client
   * @param user currently authenticated user
   * @param createHubDto details of hub to be created
   * @returns DocumentSnapshot of created driver
   */
  async createHub(client: ClientRequest, user: UserRequest, createHubDto: CreateHubDto): Promise<DocumentSnapshot> {
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
