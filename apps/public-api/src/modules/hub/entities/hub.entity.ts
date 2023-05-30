import { DocumentSnapshot } from '@google-cloud/firestore'

export class EssentialHub {
  id: string
  name: string

  constructor(hub: DocumentSnapshot) {
    const data = hub.data()
    this.id = hub.id
    this.name = data.name
  }
}

// Allows us to extend the hub object easily without having to change the essential data.
export class Hub extends EssentialHub {
  constructor(hub: DocumentSnapshot) {
    super(hub)
  }
}
