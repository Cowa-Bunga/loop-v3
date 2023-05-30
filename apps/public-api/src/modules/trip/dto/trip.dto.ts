import { IsArray, IsBoolean, IsDateString, IsEnum, IsLatitude, IsLongitude, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidateIf, ValidateNested } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { BadRequestException } from '@nestjs/common'

enum FlowTypes {
  DEFAULT = 'default',
  SOG = 'sog',
  OTP = 'otp',
  MULTI = 'multi',
  img = 'img',
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

class Trip {
  @IsString()
  trip_no: string

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
  collection_time: string

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

export class CreateTripDto {
  @IsString()
  client_id: string

  @ApiProperty({ description: 'The branch ID' })
  @IsString()
  branch_id: string

  @ApiProperty({
    description: 'Array of order IDs',
    type: 'array',
    items: { type: 'string' },
    example: ['order_id_1', 'order_id_2'],
  })
  @IsArray()
  @IsString({ each: true })
  order_ids: string[]

  @ApiProperty({
    description: 'The vehicle type',
    example: 'Bike',
    default: 'Bike',
  })
  @IsString()
  vehicle_type: string

  @IsBoolean()
  compute_route: boolean

  @IsBoolean()
  automatic_assignment: boolean

  @IsOptional()
  @IsBoolean()
  service_type_route?: boolean
}

export class GetTripDto {
  @ApiProperty({
    description: 'The id of the trip',
    example: '1234567890',
  })
  @IsNotEmpty()
  @Validate((value) => {
    if (!value || value.length === 0) {
      throw new BadRequestException('No trip IDs provided.')
    }
  })
  trip_id: string
}

export class AcceptAdhocTripDto {
  @ApiProperty({
    description: 'The driver ID',
    example: 'driver_123',
  })
  @IsString()
  driver_id: string

  @ApiProperty({
    description: 'The trip ID',
    example: 'trip_123',
  })
  @IsString()
  trip_id: string

  @ApiProperty({
    description: 'The order ID',
    example: 'order_123',
  })
  @IsString()
  order_id: string
}
