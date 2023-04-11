import {
  EnumDbRatings,
  EnumDbAbandonmentReasons,
  EnumDbVehicleTypes,
  EnumDbPermissionsScopes
} from './IdbEnums'

export interface IdbApi {
  key: string
}

export interface IdbRecipientName {
  enabled: boolean
  selected: string[]
}

export interface IdbClusterLock {
  collection_time_range: number
  strategy: string
  time: number
}

export interface IdbCluster {
  distance: number
  enabled: boolean
  lock: IdbClusterLock
  size: number
}

export interface IdbPooling {
  algorithm: string
  enabled: boolean
}

export interface IdbTracking {
  logo_enabled: boolean
  ratings_enabled: boolean
}

export interface IdbWebhooksDriverEvents {
  endlunch: boolean
  offline: boolean
  online: boolean
  lunch: boolean
}

export interface IdbOrderEvents {
  abandoned: boolean
  arrived: boolean
  cancelled: boolean
  collected: boolean
  delivered: boolean
  in_transit: boolean
  returned: boolean
}

export interface IdbWebhooks {
  driver_events: IdbWebhooksDriverEvents
  order_events: IdbOrderEvents
  general: string
  location: string
}

export interface IdbTaskEvents {
  abandoned: boolean
  arrived: boolean
  cancelled: boolean
  completed: boolean
  returned: boolean
  started: boolean
}

export interface IdbTripEvents {
  accepted: boolean
  arrived: boolean
  auto_assigned: boolean
  cancelled: boolean
  completed: boolean
  manual_assigned: boolean
  rejected: boolean
  started: boolean
}

export interface IdbSettings {
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

export interface IdbUsers {
  created_at: boolean
  created_by: boolean
  email: string
  firstname: string
  lastname: string
  mobile_no: string
  password: string
  permissions: IdbPermissions
}

export interface IdbPermissions {
  administrator: false
  fleet: boolean
  scopes: EnumDbPermissionsScopes
}

// <root>
export interface IdbClients {
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
