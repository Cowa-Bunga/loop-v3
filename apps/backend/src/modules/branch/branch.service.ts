import { Injectable } from '@nestjs/common'
import { DocumentReference } from '@google-cloud/firestore'
import * as admin from 'firebase-admin'
import { Branch, EssentialBranch } from './entities/branch.entity'

@Injectable()
export class BranchService {
  async getBranchesForHub(hub_ref: DocumentReference, client_id: string, essential = false): Promise<Branch[] | EssentialBranch[]> {
    const db = admin.firestore()
    const branchDocs = await db.collection('clients').doc(client_id).collection('branches').where('hub', '==', hub_ref).get()

    const branches = branchDocs.docs.map((doc) => {
      const branch = essential ? new EssentialBranch(doc) : new Branch(doc)
      return branch
    })

    return branches
  }
}
