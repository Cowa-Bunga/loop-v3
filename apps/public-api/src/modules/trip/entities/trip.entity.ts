import { DocumentSnapshot } from '@google-cloud/firestore'
import { Driver } from '../../driver/entities/driver.entity'
import { TRIP_ACTIVITY_STATUS, TRIP_STATUS } from './trip.enum'

class ROHistory {
  status: string
  constructor(status: string) {
    this.status = status
  }
}

class TripActivity {
  status: string
  created_at: Date
  status_display: string
  driver_name: string

  constructor(status: string, created_at: Date, driver_name: string) {
    this.status = status
    this.created_at = created_at
    this.status_display = TRIP_ACTIVITY_STATUS[status] || status
    this.driver_name = driver_name
  }
}

export class EssentialTrip {
  id: string
  driver?: Driver
  orders?: string[]
  status: string
  status_display: string
  ro_history: ROHistory[]
  activity: TripActivity[]
  created_at: Date
  service_type_route: boolean
  automatic_assignment: boolean

  constructor(trip: DocumentSnapshot, driver?: DocumentSnapshot) {
    const data = trip.data()
    this.id = trip.id
    this.driver = driver ? new Driver(driver) : undefined
    this.orders = data.orders || []
    this.status = data.status
    this.status_display = TRIP_STATUS[data.status] || data.status
    this.ro_history = data.ro_history.map((ro) => new ROHistory(ro.status))
    this.activity = data.activity.map(
      (activity) => new TripActivity(activity.status, activity.timestamp.toDate(), activity.driver_name)
    )
    this.service_type_route = data.service_type_route
    this.automatic_assignment = data.automatic_assignment
  }

  setDriver(driver: Driver) {
    this.driver = driver
  }
}

export class Trip extends EssentialTrip {
  constructor(order: DocumentSnapshot, cluster?: DocumentSnapshot) {
    super(order, cluster)
  }
}
