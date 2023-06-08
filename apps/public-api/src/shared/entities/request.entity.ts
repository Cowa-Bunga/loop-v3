import { DocumentSnapshot, DocumentReference } from '@google-cloud/firestore'

class ClientSettings {
  sms_enabled: boolean
  email_enabled: boolean

  constructor(client: DocumentSnapshot) {
    const data = client.data()
    this.sms_enabled = data.sms_enabled || false
    this.email_enabled = data.email_enabled || false
  }
}
export class ClientRequest {
  id: string
  name: string
  settings: ClientSettings

  constructor(client: DocumentSnapshot) {
    const data = client.data()
    this.id = client.id
    this.name = data.name
    this.settings = new ClientSettings(client)
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
