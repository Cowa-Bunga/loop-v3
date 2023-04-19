import { Base, DocumentReference, GeoPoint } from '../common'

export default interface Branch extends Base {
  created_by: DocumentReference
  name: string
  address: string
  contact: string
  dashboard_hub: string
  hub: DocumentReference
  location: GeoPoint
  store_code: string
}
