import { DocumentReference, DocumentSnapshot } from '@google-cloud/firestore'
import { Order } from '../../order/entities/order.entity'
import { Location } from '../../../shared/entities/location.entity'

export class EssentialBranch {
  id: string
  name: string
  orders?: Order[]

  constructor(branch: DocumentSnapshot, orders?: Order[]) {
    const data = branch.data()
    this.id = branch.id
    this.name = data.name
    this.orders = orders || []
  }

  setOrders(orders: Order[]): void {
    this.orders = orders
  }
}

export class OrderBranch extends EssentialBranch {
  address: string
  store_code: string
  location: Location

  constructor(branch: DocumentSnapshot) {
    super(branch)
    const data = branch.data()
    this.address = data.address
    this.store_code = data.store_code
    this.location = new Location(data.location.latitude, data.location.longitude)
    delete this.orders
  }
}
export class Branch extends EssentialBranch {
  store_code: string
  address: string
  contact: string
  dashboard_url: string
  created_by: DocumentReference
  hub: DocumentReference
  location: Location

  constructor(branch: DocumentSnapshot, orders?: Order[]) {
    super(branch, orders)
    const data = branch.data()
    this.store_code = data.store_code
    this.address = data.address
    this.contact = data.contact
    this.dashboard_url = data.dashboard_url
    this.created_by = data.created_by
    this.hub = data.hub
    this.location = new Location(data.location.latitude, data.location.longitude)
  }

  lean() {
    return {
      id: this.id,
      name: this.name,
      orders: this.orders,
      store_code: this.store_code,
      address: this.address,
      contact: this.contact,
      dashboard_url: this.dashboard_url,
      created_by: this.created_by.id,
      hub: this.hub.id,
      location: this.location
    }
  }
}
