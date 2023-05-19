import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { DocumentReference } from '@google-cloud/firestore'
import { EssentialHub, Hub } from './entities/hub.entity'

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

  async getHub(hub_ref: DocumentReference, essential  = false): Promise<Hub | EssentialHub> {
    const hubDoc = await hub_ref.get()
    const hub = new Hub(hubDoc)
    return essential ? hub.getEssentialData() : hub
  }
}
