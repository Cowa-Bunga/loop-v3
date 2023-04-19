import { Base, DocumentReference } from '../common'

export default interface Hub extends Base {
  created_by: DocumentReference
  name: string
}
