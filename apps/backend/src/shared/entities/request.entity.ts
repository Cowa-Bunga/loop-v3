export class ClientRequest {
  id: string

  constructor(client: FirebaseFirestore.DocumentSnapshot) {
    this.id = client.id
  }
}
