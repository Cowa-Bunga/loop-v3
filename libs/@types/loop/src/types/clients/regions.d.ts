import { Base, DocumentReference } from '../common'

declare interface HubIds {
  name: string
}

export default interface Region extends Base {
  created_by: DocumentReference
  hub_ids: HubIds[]
}
