import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

@Injectable()
export class UserService {
  async getUserDoc(user_id: string) {
    const db = admin.firestore()
    const user = await db.collection('client-users').doc(user_id).get()

    return user
  }

  async getUserPermissionsDoc(user_id: string, client_id: string) {
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
}
