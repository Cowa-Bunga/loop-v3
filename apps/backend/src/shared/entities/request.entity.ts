import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore'
export class ClientRequest {
  id: string

  constructor(client: DocumentSnapshot) {
    this.id = client.id
  }
}

export class UserRequest {
  id: string
  hub_refs: DocumentReference[]

  constructor(user: DocumentSnapshot, permission?: DocumentSnapshot) {
    this.id = user.id
    this.hub_refs = permission?.data().permissions.dos.hubs ?? []
  }
}
