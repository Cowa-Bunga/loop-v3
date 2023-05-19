export class ClientRequest {
  id: string

  constructor(client: FirebaseFirestore.DocumentSnapshot) {
    this.id = client.id
  }
}

export class UserRequest {
  id: string

  constructor(user: FirebaseFirestore.DocumentSnapshot) {
    this.id = user.id
  }
}
