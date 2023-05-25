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

export enum FlowTypes {
  DEFAULT = 'default',
  SOG = 'sog',
  OTP = 'otp',
  MULTI = 'multi',
  img = 'img'
}

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
  @IsEnum(FlowTypes)
  type: FlowTypes = FlowTypes.DEFAULT

  @ValidateIf((o) => o.type === FlowTypes.OTP)
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
  @ValidateIf((o) => o.branch === undefined)
  @IsString()
  @IsOptional()
  branch_id?: string

  @IsOptional()
  branch?: OrderBranch

  @ValidateNested()
  order: Order
}
