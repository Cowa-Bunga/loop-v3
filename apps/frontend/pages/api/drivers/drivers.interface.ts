export interface IDriverInterface {
  id: string
  name: string
  email: string
  mobile_no: string
  vehicle_type: string
  employee_code: string
  location: {
    latitude: number
    longitude: number
  }
  lunch: boolean
  available: boolean
  on_active_trip: boolean
  idle_since: string
  created_at: string
}
