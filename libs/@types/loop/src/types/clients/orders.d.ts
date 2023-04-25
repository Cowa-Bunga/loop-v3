import { Base, DocumentReference, GeoPoint } from '../common'

//TODO check enum values
declare enum ABANDON_FLOW_TYPES {
  DEFAULT = 'default'
}

declare enum DELIVERY_FLOW_TYPES {
  DEFAULT = 'default'
}

declare enum ORDER_ORIGINATION {}

declare enum ORDER_STATUS {}
declare enum ORDER_TYPE {}

declare interface AbandonFlow {
  type: ABANDON_FLOW_TYPES
}

declare interface DeliveryFlow {
  type: DELIVERY_FLOW_TYPES
}

declare interface Branch {
  id: string
  address: string
  location: GeoPoint
  name: string
  store_code: string
}

declare interface Customer {
  name: string
  mobile_no: string
}

declare interface History {
  status: ORDER_STATUS
  timestamp: Date
}

declare interface OrderHistory extends Base {
  order: DocumentReference
  order_id: string
  status: ORDER_STATUS
  timestamp: Date
  trip: DocumentReference
  trip_id: string
}

export default interface Order extends Base {
  created_by: DocumentReference
  abandon_flow: AbandonFlow
  branch: Branch
  address: string
  alcohol: boolean
  assignable: boolean
  clustered: boolean
  collection_time: Date
  created_at: Date
  customer: Customer
  delay_batch: number
  delivery_flow: DeliveryFlow
  history: History[]
  instructions: string
  location: GeoPoint
  order_no: string
  origination: ORDER_ORIGINATION
  payment_type: string //TODO CHECK THIS TYPE
  recreated: boolean
  service_type: string //TODO CHECK THIS TYPE
  status: ORDER_STATUS
  task_type: string //TODO CHECK THIS TYPE
  tracking_id: DocumentReference
  trip_id: DocumentReference
  type: ORDER_TYPE
  order_history: OrderHistory[]
}
