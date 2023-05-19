import { DocumentReference, GeoPoint, DocumentSnapshot } from '@google-cloud/firestore'

export type EssentialBranch = {
  id: string
  name: string
}

export class Branch {
  id: string
  name: string
  store_code: string
  address: string
  contact: string
  dashboard_url: string
  created_by: DocumentReference
  hub: DocumentReference
  location: GeoPoint

  constructor(branch: DocumentSnapshot){
    const data = branch.data()
    this.id = branch.id
    this.name = data.name
    this.store_code = data.store_code
    this.address = data.address
    this.contact = data.contact
    this.dashboard_url = data.dashboard_url
    this.created_by = data.created_by
    this.hub = data.hub
    this.location = data.location
  }

  getEssentialData(): EssentialBranch{
    return {
      id: this.id,
      name: this.name,
    }
  }
}
