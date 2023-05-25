import { Injectable } from '@nestjs/common'
import { DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
import { CreateBranchDto } from './dtos/branch.dto'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'

@Injectable()
export class BranchService {
  async getBranch(client: ClientRequest, branch_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const branch = await db.collection('clients').doc(client.id).collection('branches').doc(branch_id).get()

    return branch
  }

  async getBranchesForHub(hub_ref: DocumentReference, client_id: string): Promise<DocumentSnapshot[]> {
    const db = admin.firestore()
    const branches = await db
      .collection('clients')
      .doc(client_id)
      .collection('branches')
      .where('hub', '==', hub_ref)
      .get()

    return branches.docs
  }

  async checkBranchExists(client: ClientRequest, name: string): Promise<boolean> {
    const db = admin.firestore()
    const branches = await db
      .collection('clients')
      .doc(client.id)
      .collection('branches')
      .where('name', '==', name)
      .limit(1)
      .get()

    if (branches.empty) {
      return false
    }

    return true
  }

  async createBranch(
    createBranchDto: CreateBranchDto,
    client: ClientRequest,
    user: UserRequest
  ): Promise<DocumentSnapshot> {
    const { hub_id, name, contact, address, store_code, dashboard_url, location } = createBranchDto
    const db = admin.firestore()

    const branchRef: DocumentReference = db.collection('clients').doc(client.id).collection('branches').doc()

    await branchRef.set({
      name,
      contact,
      address,
      store_code,
      dashboard_url,
      hub: db.doc(`/clients/${client.id}/hubs/${hub_id}`),
      location: new admin.firestore.GeoPoint(location.latitude, location.longitude),
      created_by: db.doc(`/clients/${client.id}/users/${user.id}`),
      created_at: admin.firestore.FieldValue.serverTimestamp()
    })

    return await branchRef.get()
  }
}
