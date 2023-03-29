

interface IdbDeliveryPermissions {
  hub_id: string
  promisor_id: string
}

interface IdbLocation {
  accuracy: string
  altitude: string
  bearing: string
  bearingAccuracy: string
  latitude: string
  longitude: string
  provider: string
  speedAccuracy: string
  verticalAccuracy: string
}

// <root>
interface IdbDrivers {
  uuid: string

  available: boolean
  blocked: boolean
  client: string
  created_at: string
  created_by: string
  delivery_permissions: IdbDeliveryPermissions[]
  email: string
  employee_code: string
  idle_since: string
  location: IdbLocation
  lunch: boolean
  mobile_no: string
  name: string
  on_active_trip: boolean
  password: string
  primary_employer: string
  vehicle_type: EnumDbVehicleTypes
}