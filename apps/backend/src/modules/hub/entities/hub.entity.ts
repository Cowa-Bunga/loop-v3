import { DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'

export type EssentialHub = {
  id: string
  name: string
}

export class Hub {
  id: string
  name: string
  created_by: DocumentReference

  constructor(hub: DocumentSnapshot){
    const data = hub.data()
    this.id = hub.id
    this.name = data.name
    this.created_by = data.created_by
  }

  getEssentialData(): EssentialHub{
    return {
      id: this.id,
      name: this.name,
    }
  }
}
