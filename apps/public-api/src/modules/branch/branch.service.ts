import { Injectable } from '@nestjs/common'
import { DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
import { CreateBranchDto } from './dtos/branch.dto'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'

@Injectable()
export class BranchService {
  /**
   * Returns a branch for a given branch id
   * @param client currently authenticated client
   * @param branch_id id of branch to retrieve
   * @returns DocumentSnapshot of branch
   */
  async getBranch(client: ClientRequest, branch_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const branch = await db.collection('clients').doc(client.id).collection('branches').doc(branch_id).get()

    return branch
  }

  /**
   * Returns a list of branches for a given hub
   * @param client currently authenticated client
   * @param hub DocumentReference for specified hub
   * @returns Array of Branch DocumentSnapshots
   */
  async getBranchesForHub(client: ClientRequest, hub_ref: DocumentReference): Promise<DocumentSnapshot[]> {
    const db = admin.firestore()
    const branches = await db
      .collection('clients')
      .doc(client.id)
      .collection('branches')
      .where('hub', '==', hub_ref)
      .get()

    return branches.docs
  }

  /**
   * Check if a branch exists for a given name
   * @param name name to check against
   * @returns true if the branch exists, else false
   */
  async checkBranchExists(client: ClientRequest, name: string): Promise<boolean> {
    const db = admin.firestore()
    const branches = await db
      .collection('clients')
      .doc(client.id)
      .collection('branches')
      .where('name', '==', name)
      .limit(1)
      .get()

    return branches.empty ? false : true
  }

  /**
   * Creates a new branch and adds it to the database for specified client
   * @param client currently authenticated client
   * @param user currently authenticated user
   * @param createBranchDto details of branch to be created
   * @returns DocumentSnapshot of created branch
   */
  async createBranch(
    client: ClientRequest,
    user: UserRequest,
    createBranchDto: CreateBranchDto
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
