import { Base, DocumentReference, Permissions } from '../common'

export default interface User extends Base {
  email: string
  created_by: DocumentReference
  firstname: string
  lastname: string
  mobile_no: string
  password: string
  user_client_ref: DocumentReference
  user_ref: DocumentReference
  permissions: Permissions
}
