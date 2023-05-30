import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { UserRequest, ClientRequest } from '../../shared/entities/request.entity'
import { DocumentSnapshot } from 'firebase-admin/firestore'

@Injectable()
export class UserService {
  /**
   * Return a user by id
   * @param user_id id of user to retrieve
   * @returns User DocumentSnapshot
   */
  async getUserById(user_id: string): Promise<DocumentSnapshot> {
    const db = admin.firestore()
    const user = await db.collection('client-users').doc(user_id).get()

    return user
  }

  /**
   * Returns user permissions for a given client
   * @param user_id id of user to retrieve permissions for
   * @param client_id id of client user belongs to
   * @returns User Permissions DocumentSnapshot
   */
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

  /**
   * Grants a user access to a specified hub
   * @param client currently authenticated client
   * @param user currently authenticated user
   * @param hub_id id of hub to grant access to
   * @returns User Permissions DocumentSnapshot
   */
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
