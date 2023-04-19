import { Base, DocumentReference } from '../common'

declare interface Location {
  accuracy: number
  altitude: number
  bearing: number
  bearingAccuracy: number
  latitude: number
  longitude: number
  provider: string
  speed: number
  speedAccuracy: number
  time: Date
  verticalAccuracy: number
}

declare interface DeliveryPermission {
  hub_id: string
  promisor_id: string
}

declare interface ActiveTrip {
  client_id: string
  trip_id: string
}

declare interface DeviceMeta {
  appVersion: string
  manufacturer: string
  model: string
  os: string
  osVersion: string
}

export default interface Driver extends Base {
  client: DocumentReference
  created_by: DocumentReference
  payment_setting: DocumentReference
  primary_employer: DocumentReference
  available: boolean
  blocked: boolean
  lunch: boolean
  on_active_trip: boolean
  scheduled_lunch: boolean
  sos: boolean
  email: string
  employee_code: string
  mobile_no: string
  name: string
  idle_since: Date
  last_trip_rejection: Date
  location: Location
  password: string
  push_token: string
  vehicle_type: string
  delivery_permissions: DeliveryPermission[]
  active_trip: ActiveTrip
  device_meta: DeviceMeta
}
