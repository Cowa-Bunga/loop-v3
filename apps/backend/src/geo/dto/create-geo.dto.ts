import { Geometry, Point, GeometryCollection } from 'geojson'
import { IsString } from 'class-validator'

export class CreateGeoDto {
  @IsString()
  company_id: string

  @IsString()
  trip_id: string

  @IsString()
  status: string

  start: Point

  end: Point

  waypoints: GeometryCollection

  route: Geometry

  zones: GeometryCollection
}
