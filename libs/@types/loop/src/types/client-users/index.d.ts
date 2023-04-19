import { Base, DocumentReference } from '../common'
import Client from './clients'

export default interface Contracts extends Base {
  created_by: DocumentReference
  email: string
  firstname: string
  lastname: string
  mobile_no: string
  password: string
  clients: Client[]
}
