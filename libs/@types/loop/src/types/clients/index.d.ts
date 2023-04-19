import { Base, DocumentReference } from '../common'
import Webhooks from './webhooks'
import Settings from './settings'
import User from './users'
import Region from './regions'
import Trip from './trips'
import Order from './orders'
import Hub from './hubs'
import Branch from './branches'

declare enum CLIENT_TYPES {
  ON_DEMAND = 'ON_DEMAND',
  LOGISTICS = 'LOGISTICS'
}

declare interface API {
  key: string
}

declare interface RecipientName {
  enabled: boolean
  selected: string[]
}

// <root>
export default interface Clients extends Base {
  name: string
  organization: string
  timezone: string
  super_user: DocumentReference
  api: API
  client_type: CLIENT_TYPES
  settings: Settings
  recipient_name: RecipientName
  abandonment_reasons: string[]
  partners: string[]
  ratings: string[]
  vehicle_types: string[]
  webhooks: Webhooks
  users: User[]
  regions: Region[]
  trips: Trip[]
  orders: Order[]
  hubs: Hub[]
  branches: Branch[]
}
