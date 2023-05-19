import { DocumentSnapshot } from '@google-cloud/firestore'
import { Cluster } from "../../cluster/entities/cluster.entity"
import { ABANDON_FLOW_TYPE, ORDER_TYPE, TASK_TYPE, ORDER_STATUS_DISPLAY } from "./order.enum"


class Customer {
  name: string
  mobile_no: string
  constructor(order: DocumentSnapshot) {
    const customer = order.data().customer
    this.name = customer.name || undefined
    this.mobile_no = customer.mobile_no || undefined
  }
}

class History {
  status: string
  status_display: string
  timestamp: Date
  constructor(status: string, timestamp: Date) {
    this.status = status
    this.status_display = ORDER_STATUS_DISPLAY[status] || status
    this.timestamp = timestamp
  }
}

// class ETA {
//   eta_mins: string
//   arrival: string
//   constructor() {
//     this.status = status
//     this.timestamp = timestamp
//   }
// }

class AbandonFlow {
  type: ABANDON_FLOW_TYPE

  constructor(order: DocumentSnapshot) {
    const abandon_flow = order.data().abandon_flow
    this.type = abandon_flow.type
  }
}
export class EssentialOrder {
  id: string
  order_no: string
  status: string
  status_display: string
  type: ORDER_TYPE
  task_type: TASK_TYPE
  address: string
  customer: Customer
  time_place: Date
  delivery_time: Date
  collection_time: Date
  history: History[]
  is_multipart: boolean
  cluster?: Cluster
  abandon_flow: AbandonFlow

  constructor(order: DocumentSnapshot, cluster?: DocumentSnapshot) {
    const data = order.data()
    this.id = order.id
    this.order_no = data.order_no
    this.status = data.status
    this.status_display = ORDER_STATUS_DISPLAY[data.status] || data.status
    this.type = data.type
    this.task_type = data.task_type
    this.address = data.address
    this.customer = new Customer(order)
    this.time_place = data.created_at.toDate()
    this.delivery_time = data.delivery_time.toDate()
    this.collection_time = data.collection_time.toDate()
    this.history = data.history.map((history) => {
      return new History(history.status, history.timestamp.toDate())
     })
    this.is_multipart = data.is_multipart || false
    this.cluster= cluster ? new Cluster(cluster) : undefined
    this.abandon_flow = new AbandonFlow(order)
    
  }

  getEssentialData(){
    return {
      id: this.id,
      order_no: this.order_no,
      status: this.status,
      status_display: this.status_display,
      type: this.type,
      task_type: this.task_type,
      address: this.address,
      customer: this.customer,
      time_place: this.time_place,
      delivery_time: this.delivery_time,
      collection_time: this.collection_time,
      history: this.history,
      is_multipart: this.is_multipart,
      cluster: this.cluster,
      abandon_flow: this.abandon_flow,
    }
  }
}

export class Order extends EssentialOrder {
  constructor(order: DocumentSnapshot, cluster?: DocumentSnapshot) {
    super(order, cluster)
  }
}
