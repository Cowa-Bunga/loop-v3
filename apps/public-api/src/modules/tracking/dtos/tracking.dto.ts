import { IsString } from 'class-validator'

export class TrackOrderDto {
  @IsString()
  trip_id: string

  @IsString()
  order_id: string
}
