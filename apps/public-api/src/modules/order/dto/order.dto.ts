import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { OrderBranch } from '../../branch/entities/branch.entity'
import { FLOW_TYPE } from '../entities/order.enum'
class Customer {
  @IsString()
  name: string

  @IsString()
  mobile_no: string
}

class Location {
  @IsLatitude()
  latitude: number

  @IsLongitude()
  longitude: number
}

class ContactPerson {
  @IsString()
  name: string

  @IsString()
  role: string

  @IsMobilePhone()
  mobile_no: string
}

class Parcel {
  @IsString()
  qr_code: string

  @IsString()
  size: string
}

class Flow {
  @IsEnum(FLOW_TYPE)
  type: FLOW_TYPE = FLOW_TYPE.DEFAULT

  @ValidateIf((o) => o.type === FLOW_TYPE.OTP)
  @IsString()
  code?: string
}

class Order {
  @IsString()
  order_no: string

  @IsBoolean()
  alcohol: boolean

  @IsOptional()
  @IsBoolean()
  assignable? = false

  @ValidateNested()
  customer: Customer

  @IsString()
  address: string

  @ValidateNested()
  location: Location

  @IsDateString()
  collection_time: Date

  @IsDateString()
  delivery_time: Date

  @IsOptional()
  @ValidateNested()
  contact_person?: ContactPerson

  @IsOptional()
  @IsString()
  instructions? = ''

  @ValidateNested()
  @IsOptional()
  parcels?: Parcel[] = []

  @IsOptional()
  @IsNumber()
  delivery_price? = 0

  @IsOptional()
  @IsString()
  payment_type? = null

  @IsOptional()
  @IsString()
  origination? = 'manual'

  @IsOptional()
  @ValidateNested()
  abandon_flow?: Flow

  @IsOptional()
  @ValidateNested()
  delivery_flow?: Flow

  @IsOptional()
  @IsString()
  service_type? = ''

  @IsOptional()
  @IsString()
  type?: string

  @IsOptional()
  @IsString()
  task_type? = ''
}

export class CreateOrderDto {
  @IsString()
  branch_id: string

  @ValidateNested()
  order: Order
}

export class EditOrderDto {
  @IsString()
  @IsOptional()
  tracking_id?: string
}
