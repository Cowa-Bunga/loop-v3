export const MODEL_CLIENT_EMPTY: IClient = {
  client_id: '',
  name: '',
  user_id: '',
  permissions_id: '',
  logo: '',
  permissions: {
    scopes: [],
    fleet: false,
    administrator: false
  }
}

export const emptyDriver: IDriver = {
  id: '',
  name: '',
  email: '',
  mobile_no: '',
  vehicle_type: '',
  employee_code: '',
  location: {
    latitude: 0,
    longitude: 0
  },
  lunch: false,
  available: false,
  on_active_trip: false,
  idle_since: '',
  created_at: ''
}
