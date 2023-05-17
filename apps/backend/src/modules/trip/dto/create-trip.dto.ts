import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

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
