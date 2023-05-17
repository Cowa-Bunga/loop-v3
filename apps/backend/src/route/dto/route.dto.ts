import { Point } from 'geojson'

export class GetRouteDto {
  lat: string
  lng: string
  trip_id?: string
}

export class GetIsochroneDto {
  lat: string | number | Point
  lng: string | number | Point
  distance?: number
  cost?: number
}
