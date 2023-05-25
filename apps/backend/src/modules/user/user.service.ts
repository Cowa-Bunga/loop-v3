import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { UserRequest, ClientRequest } from '../../shared/entities/request.entity'
import { DocumentSnapshot } from 'firebase-admin/firestore'

@Injectable()
export class UserService {
  async getUserById(user_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const user = await db.collection('client-users').doc(user_id).get()

    return user
  }

  async getUserPermissions(user_id: string, client_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const clientRef = db.collection('clients').doc(client_id)

    const permissionDocs = await db
      .collection('client-users')
      .doc(user_id)
      .collection('clients')
      .where('user_client_ref', '==', clientRef)
      .limit(1)
      .get()

    const permissionDoc = permissionDocs.docs.pop()
    return permissionDoc
  }

  async grantHubAccess(client: ClientRequest, user: UserRequest, hub_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const permissionDoc = await this.getUserPermissions(user.id, client.id)
    const permissionRef = db.collection('client-users').doc(user.id).collection('clients').doc(permissionDoc.id)

    const permissions = {
      permissions: {
        dos: {
          hubs: admin.firestore.FieldValue.arrayUnion(db.doc(`/clients/${client.id}/hubs/${hub_id}`))
        }
      }
    }

    await permissionRef.set(permissions, { merge: true })
    return await permissionRef.get()
  }
}
