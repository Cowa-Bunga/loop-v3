import { Base, DocumentReference } from '../common'

export default interface Contracts extends Base {
  promisor: DocumentReference
  promisee: DocumentReference
}
