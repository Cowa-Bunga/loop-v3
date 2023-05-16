import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { Point, GeometryCollection } from 'geojson'

@Entity({ name: 'geo' })
export class GeoEntity {
  @PrimaryGeneratedColumn('increment')
  pk_id: number

  @Index()
  @Column({ type: 'varchar', name: 'company_id' })
  company_id: string

  @Index()
  @Column({ type: 'varchar', name: 'trip_id' })
  trip_id: string

  @Column({ type: 'varchar', name: 'driver_id' })
  driver_id: string

  @Column({ type: 'varchar', name: 'trip_id' })
  status: string

  @Column({ type: 'datetime', name: 'created' })
  created: Date

  @Column({ type: 'datetime', name: 'completed' })
  completed: Date

  @Column({ type: 'array', name: 'events' })
  events: string[]

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    name: 'start',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  start: Point

  @Index({ spatial: true })
  @Column({
    name: 'end',
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  end: Point

  @Column({
    type: 'geometry',
    name: 'waypoints',
    spatialFeatureType: 'MultiPoint',
    srid: 4326,
    nullable: true
  })
  waypoints: GeometryCollection

  @Column({
    type: 'geometry',
    name: 'route',
    spatialFeatureType: 'Path',
    srid: 4326,
    nullable: true
  })
  route: GeometryCollection

  @Column({
    type: 'geometry',
    name: 'zones',
    spatialFeatureType: 'GeometryCollection',
    srid: 4326,
    nullable: true
  })
  zones: GeometryCollection
}
