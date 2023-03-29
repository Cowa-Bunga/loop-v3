// Firestore Data model types/interfaces

interface IdbApi {
  key: string
}

interface IdbRecipientName {
  enabled: boolean
  selected: string[]
}

interface IdbClusterLock {
  collection_time_range: number
  strategy: string
  time: number
}

interface IdbCluster {
  distance: number
  enabled: boolean
  lock: IdbClusterLock
  size: number
}

interface IdbPooling {
  algorithm: string
  enabled: boolean
}

interface IdbTracking {
  logo_enabled: boolean
  ratings_enabled: boolean
}

interface IdbWebhooksDriverEvents {
  endlunch: boolean
  offline: boolean
  online: boolean
  lunch : boolean
}

interface IdbOrderEvents {
  abandoned: boolean
  arrived: boolean
  cancelled: boolean
  collected: boolean
  delivered: boolean
  in_transit: boolean
  returned: boolean
}

interface IdbWebhooks {
  driver_events: IdbWebhooksDriverEvents
  order_events: IdbOrderEvents
  general: string
  location: string
}

interface IdbTaskEvents {
  abandoned: boolean
  arrived: boolean
  cancelled: boolean
  completed: boolean
  returned: boolean
  started: boolean
}

interface IdbTripEvents {
  accepted: boolean
  arrived: boolean
  auto_assigned: boolean
  cancelled: boolean
  completed: boolean
  manual_assigned: boolean
  rejected: boolean
  started: boolean
}

interface IdbSettings {
  cluster: IdbCluster
  pooling: IdbPooling
  scan: boolean
  terminate_orders: boolean
  tracking: IdbTracking
  sms_enabled: boolean
  super_user: string
  use_third_party_api: string
  vehicle_types: EnumDbVehicleTypes
  webhooks: IdbWebhooks
  order_events: IdbOrderEvents
  task_events: IdbTaskEvents
  trip_events: IdbTripEvents
}

interface IdbUsers {
  created_at: boolean
  created_by: boolean
  email: string
  firstname: string
  lastname: string
  mobile_no: string
  password: string
  permissions: IdbPermissions
}

interface IdbPermissions {
  administrator: false
  fleet: boolean
  scopes: EnumDbPermissionsScopes
}

// <root>
interface IdbClients {
  uuid: string

  user: IdbUser[]
  abandonment_reasons: EnumDbAbandonmentReasons
  api: IdbApi
  client_type: string
  created_at: string
  log_out_drivers: boolean
  name: string
  organization: string
  partners: string[]
  rating: EnumDbRatings
  recipient_name: IdbRecipientName
  region: string
  settings: IdbSettings
}
