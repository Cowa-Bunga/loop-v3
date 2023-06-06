import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { Point, GeometryCollection } from 'geojson'

@Entity({ name: 'geo' })
export class GeoEntity {
  @PrimaryGeneratedColumn('increment')
  private pk_id?: number

  @Index()
  @Column({ type: 'varchar', name: 'company_id' })
  public company_id: string

  @Index()
  @Column({ type: 'varchar', name: 'trip_id' })
  public trip_id: string

  @Index()
  @Column({ type: 'varchar', name: 'driver_id', nullable: true })
  public driver_id?: string

  @Column({ type: 'varchar', name: 'status' })
  public status?: string

  @CreateDateColumn({ type: 'timestamp', name: 'created', nullable: false })
  public created?: Date

  @Column({ type: 'timestamp', name: 'completed', nullable: true })
  private completed?: Date

  @Column({ type: 'jsonb', name: 'events' })
  private events?: string[]

  @Column({ type: 'int', name: 'distance' })
  public distance?: number

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    name: 'start',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  public start?: Point

  @Index({ spatial: true })
  @Column({
    name: 'end',
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  public end?: Point

  @Column({
    type: 'geometry',
    name: 'waypoints',
    spatialFeatureType: 'MultiPoint',
    srid: 4326,
    nullable: true
  })
  public waypoints?: GeometryCollection

  @Column({
    type: 'geometry',
    name: 'route',
    spatialFeatureType: 'LineString',
    srid: 4326,
    nullable: true
  })
  public route?: GeometryCollection

  @Column({
    type: 'geometry',
    name: 'zones',
    spatialFeatureType: 'GeometryCollection',
    srid: 4326,
    nullable: true
  })
  public zones?: GeometryCollection
}
