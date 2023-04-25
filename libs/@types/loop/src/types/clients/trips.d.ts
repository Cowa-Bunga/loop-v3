import { Base, DocumentReference } from '../common'

//TODO Check activity status enum values
declare enum ACTIVITY_STATUS {
  PENDING = 'pending',
  VIEWED = 'viewed',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted'
}

//TODO Check driver assignment type enum values
declare enum DRIVER_ASSIGNMENT_TYPE {
  AUTOMATIC = 'auto_assigned',
  MANUAL = 'manual_assigned'
}

//TODO Check trip status type enum values (also used in history)
declare enum TRIP_STATUS {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  ARRIVED_AT_COLLECTION_POINT = 'arrived_at_collection_point',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

//TODO Check user acions type enum values
declare enum USER_ACTIONS {
  CREATED_MANUAL = 'created_manual_trip'
}

declare interface Activity {
  driver_id: string
  driver_name: string
  status: ACTIVITY_STATUS
  resolved: boolean
  timestamp: Date
}

declare interface History {
  status: TRIP_STATUS
  resolved: boolean
  timestamp: Date
}

declare interface UserAction {
  action: USER_ACTIONS
  timestamp: Date
  user_id: DocumentReference
}

export default interface Trip extends Base {
  status: TRIP_STATUS
  automatic_assignment: boolean
  compute_route: boolean
  created_by: DocumentReference
  branch: DocumentReference
  driver: DocumentReference
  orders: DocumentReference[]
  driver_assignment_type: DRIVER_ASSIGNMENT_TYPE
  history: History[]
  activity: Activity[]
  user_actions: UserAction[]
}
