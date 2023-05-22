import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { convertFirestoreTimestamp } from '../../../shared/utils/firestore.utils'




export class GeoCode {
  @ApiProperty()
  latitude: number

  @ApiProperty()
  longitude: number

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude
    this.longitude = longitude
  }
}

class Parcel {
  @IsString()
  qr_code: string

  @IsString()
  size: string
}

class Flows {
  @ApiProperty()
  signatures: any

  @ApiProperty()
  images: any[]

  @ApiProperty()
  completed: string

  constructor(flows: any) {
    this.completed = flows.completed
    this.images = flows.images
    this.signatures = flows.signatures
  }
}

class Flow {
  @ApiProperty()
  type: string

  @ApiProperty()
  code: string

  @ApiProperty()
  signatures: string

  @ApiProperty()
  completed: string

  @ApiProperty()
  images: any[]

  @ApiProperty({ type: [Flows] })
  flows?: Flows[]

  constructor(args: any) {
    this.type = args.type
    this.code = args.code
    this.completed = args.completed
    this.signatures = args.signatures
    this.images = args.images
    this.flows = args.flows
  }
}

class Customer {
  @ApiProperty()
  name: string

  @ApiProperty()
  mobile_no: string

  constructor(args: any) {
    this.name = args.name
    this.mobile_no = args.mobile_no
  }
}

export class ClusterBranch {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  address: string

  @ApiProperty({ type: GeoCode })
  location: GeoCode

  @ApiProperty()
  store_code: string

  @ApiProperty()
  dashboard_url: string

  @ApiProperty()
  payment_fields?: IPaymentProvider[]

  constructor(
    id: string,
    name: string,
    address: string,
    location: any,
    store_code: string = undefined,
    dashboard_url: string = undefined,
    payment_fields?: IPaymentProvider[]
  ) {
    this.id = id
    this.name = name
    this.address = address
    this.location = location ? new GeoCode(location.latitude, location.longitude) : null
    this.store_code = store_code
    this.dashboard_url = dashboard_url
    this.payment_fields = payment_fields
  }
}

class ClusterOrder {
  @ApiProperty()
  id: string

  @ApiProperty()
  client_id: string

  @ApiProperty()
  order_no: string

  @ApiProperty()
  status: string

  @ApiProperty()
  alcohol: boolean

  @ApiProperty()
  instructions: string

  @ApiProperty()
  assignable: boolean

  @ApiProperty({ type: ClusterBranch })
  branch: ClusterBranch

  @ApiProperty({ type: Customer })
  customer: Customer

  @ApiProperty()
  address: string

  @ApiProperty({ type: GeoCode })
  location: GeoCode

  @ApiProperty()
  collection_time: Date

  @ApiProperty()
  delivery_time: Date

  @ApiProperty()
  parcels: Parcel[]

  @ApiProperty()
  delivery_price: number

  @ApiProperty()
  payment_type: string

  @ApiProperty()
  origination: string

  @ApiProperty()
  type: string

  @ApiProperty({ type: Flow })
  delivery_flow: Flow

  @ApiProperty({ type: Flow })
  abandon_flow: Flow

  @ApiProperty()
  created_at: Date

  @ApiProperty()
  recreated: boolean

  constructor(args: any) {
    this.id = args.id
    this.client_id = args.client_id
    this.order_no = args.order_no
    this.status = args.status
    this.alcohol = args.alcohol
    this.instructions = args.instructions
    this.assignable = args.assignable
    this.branch = new ClusterBranch(
      args.id,
      args.branch.name,
      args.branch.address,
      args.branch.location,
      args.branch.store_code,
      args.branch.dashboard_url,
      args.branch.payment_fields
    )
    this.customer = new Customer(args.customer)
    this.address = args.address
    this.location = new GeoCode(args.location.latitude, args.location.longitude)
    this.collection_time = convertFirestoreTimestamp(args.collection_time)
    this.delivery_time = convertFirestoreTimestamp(args.delivery_time)
    this.parcels = args.parcels
    this.delivery_price = args.delivery_price
    this.payment_type = args.payment_type
    this.origination = args.origination
    this.type = args.type
    this.delivery_flow = new Flow(args.delivery_flow)
    this.abandon_flow = new Flow(args.abandon_flow)
    this.created_at = convertFirestoreTimestamp(args.created_at)
    this.recreated = args.recreated
  }
}

export class Cluster {
  @ApiProperty()
  id: string

  @ApiProperty()
  active: boolean

  @ApiProperty()
  status: string

  @ApiProperty()
  branch: { id: string } // Modify the branch property to accept an object with id property

  @ApiProperty({ type: [ClusterOrder] })
  orders: ClusterOrder[]

  constructor(args: any, branch: any, orders: any[]) {
    this.id = args.id
    this.active = args.active
    this.status = args.status
    this.branch = branch // Assign branch object directly
    this.orders = orders.map((order: any) => new ClusterOrder(order))
  }
}

export class ClusterDto {
  @ApiProperty({
    description: 'The id of the cluster',
    example: '1234567890',
  })
  @IsNotEmpty()
  clusterId: string
}

interface IPaymentProvider {
  acquirer_name: string
  merchant_id: string
  acquirer_id: string
}
