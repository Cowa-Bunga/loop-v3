import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
  ValidateIf,
  ValidateNested,
  isNotEmpty
} from 'class-validator'
import { BadRequestException } from '@nestjs/common'

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
  delivery_time: string

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

export class GetTripDto {

  @ApiProperty({
    description: 'The id of the trip',
    example: '1234567890'
  })
  @IsNotEmpty()
  @Validate((value) => {
    if (!value || value.length === 0) {
      throw new BadRequestException('No trip IDs provided.')
    }
  })
  trip_id: string
}