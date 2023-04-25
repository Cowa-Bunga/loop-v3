import { Base, DocumentReference } from '../common'

export default interface CowabungaUser extends Base {
  created_by: DocumentReference
  email: string
  mobile_no: string
  name: string
  password: string
}
