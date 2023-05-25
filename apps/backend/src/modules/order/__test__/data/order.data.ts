import { DocumentSnapshot } from '@google-cloud/firestore'
import test from 'firebase-functions-test'
import { AbandonFlow, Customer, History, Order } from '../../entities/order.entity'
import { ABANDON_FLOW_TYPE, ORDER_TYPE } from '../../entities/order.enum'

const CustomerData: Customer = {
  name: 'customer_name',
  mobile_no: 'customer_mobile_no'
}

const HistoryData: History = {
  status: 'pending',
  status_display: 'Pending',
  timestamp: new Date(Date.now())
}

const AbandonFlowData: AbandonFlow = {
  type: ABANDON_FLOW_TYPE.DEFAULT
}
export const OrderData: Order = {
  id: 'order_id',
  order_no: 'order_no',
  status: 'pending',
  status_display: 'Pending',
  type: ORDER_TYPE.ORDER,
  task_type: '',
  address: '1 test avenue, Rondebosch, Cape Town, 7945',
  customer: CustomerData,
  time_place: new Date(Date.now()),
  delivery_time: new Date(Date.now()),
  collection_time: new Date(Date.now()),
  history: [HistoryData],
  is_multipart: false,
  abandon_flow: AbandonFlowData,
  reset: false
}

export const MockOrder: DocumentSnapshot = test().firestore.makeDocumentSnapshot(
  { OrderData },
  'clients/client_id/orders/order_id'
)

export const MockClient: DocumentSnapshot = test().firestore.makeDocumentSnapshot(
  { id: 'client_id' },
  'clients/client_id'
)
