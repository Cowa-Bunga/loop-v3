import { DocumentSnapshot } from '@google-cloud/firestore'

class Location {
  latitude: number
  longitude: number
  constructor(driver: DocumentSnapshot) {
    const data = driver.data().location || {}
    this.latitude = data.latitude || 0
    this.longitude = data.longitude || 0
  }
}

class ActiveTrip {
  client_id: string
  trip_id: string
  constructor(driver: DocumentSnapshot) {
    const data = driver.data().active_trip
    this.client_id = data.client_id
    this.trip_id = data.trip_id
  }
}
export class EssentialDriver {
  id: string
  name: string
  employee_code: string
  image: string
  location: Location
  blocked: boolean
  lunch: boolean
  on_active_trip: boolean
  available: boolean
  idle_since: Date
  sos: boolean
  active_trip: ActiveTrip

  constructor(driver: DocumentSnapshot) {
    const data = driver.data()
    this.id = driver.id
    this.name = data.name
    this.employee_code = data.employee_code
    this.image = data.image || ''
    this.location = new Location(driver)
    this.blocked = data.blocked
    this.on_active_trip = data.on_active_trip
    this.available = data.available
    this.idle_since = data.idle_since.toDate()
    this.sos = data.sos
    this.active_trip = data.active_trip ? new ActiveTrip(driver) : undefined
  }
}

export class Driver extends EssentialDriver {
  constructor(driver: DocumentSnapshot) {
    super(driver)
  }
}
