export class ClientRequest {
  id: string

  constructor(client: FirebaseFirestore.DocumentSnapshot) {
    this.id = client.id
  }
}

export class UserRequest {
  id: string
  hub_refs: string[]

  constructor(user: FirebaseFirestore.DocumentSnapshot, permission?: FirebaseFirestore.DocumentSnapshot) {
    this.id = user.id
    this.hub_refs = permission?.data().data.hubs ?? []
  }
}
