import { BadRequestException, Injectable } from '@nestjs/common'
import { DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
import { Branch, EssentialBranch } from './entities/branch.entity'
import { CreateBranchDto } from './dtos/branch.dto'
import { ClientRequest, UserRequest } from '../../shared/entities/request.entity'

@Injectable()
export class BranchService {
  async getBranch(client_id: string, branch_id: string): Promise<any> {
    const db = admin.firestore()
    const branchSnapshot = await db.collection('clients').doc(client_id).collection('branches').doc(branch_id).get()

    const branch = new Branch(branchSnapshot)
    return branch
  }

  async getBranchesForHub(
    hub_ref: DocumentReference,
    client_id: string,
    essential = false
  ): Promise<Branch[] | EssentialBranch[]> {
    const db = admin.firestore()
    const branchDocs = await db
      .collection('clients')
      .doc(client_id)
      .collection('branches')
      .where('hub', '==', hub_ref)
      .get()

    const branches = branchDocs.docs.map((doc) => {
      const branch = essential ? new EssentialBranch(doc) : new Branch(doc)
      return branch
    })

    return branches
  }

  async getBranchByName(name: string, client: ClientRequest): Promise<Branch> {
    const db = admin.firestore()
    const branches = await db
      .collection('clients')
      .doc(client.id)
      .collection('branches')
      .where('name', '==', name)
      .limit(1)
      .get()

    if (branches.empty) {
      return undefined
    }

    return new Branch(branches.docs[0])
  }

  async createBranch(
    createBranchDto: CreateBranchDto,
    client: ClientRequest,
    user: UserRequest
  ): Promise<DocumentSnapshot> {
    const { hub_id, name, contact, address, store_code, dashboard_url, location } = createBranchDto
    const db = admin.firestore()

    // Get hub by name, and check if it exists
    const existingHub = await this.getBranchByName(name, client)

    // Throw error if hub exists
    if (existingHub) {
      throw new BadRequestException('Branch with that name already exists.')
    }

    // Create a new hub for client and user
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

    // Retrieve the newly created branch
    return await branchRef.get()
  }
}
