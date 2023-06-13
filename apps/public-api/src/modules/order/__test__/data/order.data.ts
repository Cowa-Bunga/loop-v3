import { Location } from '../../../../shared/entities/location.entity'
import { OrderBranch } from '../../../branch/entities/branch.entity'
import { CreateOrderDto, EditOrderDto } from '../../dto/order.dto'
import { AbandonFlow, Customer, History } from '../../entities/order.entity'
import { FLOW_TYPE, ORDER_STATUS, ORDER_STATUS_DISPLAY, ORDER_TYPE } from '../../entities/order.enum'

const customer: Customer = {
  name: 'customer_name',
  mobile_no: 'customer_mobile_no'
}

const history: History = {
  status: 'pending',
  status_display: 'Pending',
  timestamp: new Date(Date.now())
}

const abandonFlow: AbandonFlow = {
  type: FLOW_TYPE.DEFAULT
}

const location: Location = {
  latitude: -33.92711,
  longitude: 18.420059
}

export const essentialOrderData = {
  id: 'order_id',
  order_no: 'order_no',
  status: ORDER_STATUS.PENDING,
  status_display: ORDER_STATUS_DISPLAY[ORDER_STATUS.PENDING],
  type: ORDER_TYPE.ORDER,
  task_type: '',
  address: '1 test avenue, Rondebosch, Cape Town, 7945',
  customer: customer,
  created_at: new Date(Date.now()),
  delivery_time: new Date(Date.now()),
  collection_time: new Date(Date.now()),
  history: [history],
  is_multipart: false,
  abandon_flow: abandonFlow,
  reset: false
}

export const orderData = {
  ...essentialOrderData,
  alcohol: false,
  assignable: false,
  location: location
}

export const batchedOrder = {
  ...orderData,
  trip_id: 'trip_id'
}

export const createOrderDto: CreateOrderDto = {
  order: orderData,
  branch_id: 'branch_id'
}

export const editOrderDto: EditOrderDto = {
  tracking_id: 'tracking_id'
}

export const branch: Partial<OrderBranch> = {
  id: 'branch_id',
  name: 'branch_name',
  orders: [],
  store_code: '',
  address: '',
  location: location
}
