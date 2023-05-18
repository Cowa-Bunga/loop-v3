import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'

@Injectable()
export class UserService {
  async getUserDoc(user_id: string) {
    const db = admin.firestore()
    const user = await db.collection('client-users').doc(user_id).get()

    return user
  }
}
