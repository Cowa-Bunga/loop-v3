export class CreateTrackingDto {
  odometer: number

  activity: {
    confidence: number
    type: boolean
  }

  extras: {
    trip_id: string
    driver_id: string
    trip_status?: string
  }

  event: string

  battery: {
    level: number
    is_charging: boolean
  }

  uuid: string
  coords: {
    altitude: number
    heading: number
    latitude: number
    accuracy: number
    heading_accuracy: number
    altitude_accuracy: number
    speed_accuracy: number
    speed: number
    longitude: number
    ellipsoidal_altitude: number
  }

  is_moving: boolean
  timestamp: Date
}
