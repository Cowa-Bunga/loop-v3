import { DocumentReference, GeoPoint, DocumentSnapshot } from '@google-cloud/firestore'
import { Order } from '../../order/entities/order.entity'

export class EssentialBranch {
  id: string
  name: string
  orders?: Order[]
  
  constructor(branch: DocumentSnapshot, orders?: Order[]){
    const data = branch.data()
    this.id = branch.id
    this.name = data.name
    this.orders = orders || []
  }

  setOrders(orders: Order[]): void {
    this.orders = orders
  }
}
export class Branch extends EssentialBranch{
  store_code: string
  address: string
  contact: string
  dashboard_url: string
  created_by: DocumentReference
  hub: DocumentReference
  location: GeoPoint

  constructor(branch: DocumentSnapshot){
    super(branch)
    const data = branch.data()
    this.store_code = data.store_code
    this.address = data.address
    this.contact = data.contact
    this.dashboard_url = data.dashboard_url
    this.created_by = data.created_by
    this.hub = data.hub
    this.location = data.location
  }

  getEssentialData(){
    return {
      id: this.id,
      name: this.name,
      orders: this.orders
    }
  }
}
