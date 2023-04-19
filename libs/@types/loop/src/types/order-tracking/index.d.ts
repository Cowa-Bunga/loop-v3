import { Base } from '../common'

export default interface OrderTracking extends Base {
  cliet_id: string
  driver_id: string
  trip_id: string
}
