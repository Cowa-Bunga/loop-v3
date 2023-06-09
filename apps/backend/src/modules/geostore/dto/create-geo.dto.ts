import { Point, GeometryCollection } from 'geojson'
import { IsString } from 'class-validator'

export class CreateGeoDto {
  @IsString()
  company_id: string

  @IsString()
  trip_id: string

  @IsString()
  driver_id?: string

  @IsString()
  status: string

  distance: number

  start: Point

  waypoints: GeometryCollection

  end: Point

  route: GeometryCollection

  zones: GeometryCollection
}
