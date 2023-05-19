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

enum FlowTypes {
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
  type: FlowTypes

  @ValidateIf((o) => o.type === FlowTypes.OTP)
  @IsString()
  code: string
}

class Order {
  @IsString()
  order_no: string

  @IsBoolean()
  alcohol: boolean

  @IsOptional()
  @IsBoolean()
  assignable: boolean

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
  contact_person: ContactPerson

  @IsOptional()
  @IsString()
  instructions: string

  @ValidateNested()
  parcels: Parcel[]

  @IsOptional()
  @IsNumber()
  delivery_price: number

  @IsOptional()
  @IsString()
  payment_type: string

  @IsOptional()
  @IsString()
  origination: string

  @IsOptional()
  @ValidateNested()
  abandon_flow: Flow

  @IsOptional()
  @ValidateNested()
  delivery_flow: Flow

  @IsOptional()
  @IsString()
  service_type: string

  @IsOptional()
  @IsString()
  type: string

  @IsOptional()
  @IsString()
  task_type: string
}

export class CreateOrderDto {
  @IsString()
  branch_id: string

  @ValidateNested()
  order: Order
}
