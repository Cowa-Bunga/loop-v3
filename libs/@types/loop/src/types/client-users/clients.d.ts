import { Base, DocumentReference, Permissions } from '../common'

export default interface Client extends Base {
  user_client_ref: DocumentReference
  user_ref: DocumentReference
  permissions: Permissions
}
