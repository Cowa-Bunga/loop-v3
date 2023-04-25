declare interface DriverEvents {
  endlunch: boolean
  offline: boolean
  online: boolean
  lunch: boolean
}

declare interface OrderEvents {
  abandoned: boolean
  arrived: boolean
  cancelled: boolean
  collected: boolean
  delivered: boolean
  in_transit: boolean
  returned: boolean
}

declare interface TaskEvents {
  abandoned: boolean
  arrived: boolean
  cancelled: boolean
  completed: boolean
  returned: boolean
  started: boolean
}

declare interface TripEvents {
  accepted: boolean
  arrived: boolean
  auto_assigned: boolean
  cancelled: boolean
  completed: boolean
  manual_assigned: boolean
  rejected: boolean
  started: boolean
}

// <root>
export default interface Webhooks {
  general: string
  location: string
  driver_events: DriverEvents
  order_events: OrderEvents
  task_events: TaskEvents
  trip_events: TripEvents
}
