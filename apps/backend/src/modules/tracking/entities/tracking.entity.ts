import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { Point } from 'geojson'
import { CreateTrackingDto } from '../dto/create-tracking.dto'

@Entity({ name: 'tracking' })
export class TrackingEntity {
  @PrimaryGeneratedColumn('increment')
  private id?: number

  @Index()
  @Column({ type: 'varchar', name: 'client_id' })
  public client_id: string

  @Index()
  @Column({ type: 'varchar', name: 'trip_id' })
  public trip_id: string

  @Index()
  @Column({ type: 'varchar', name: 'driver_id' })
  public driver_id: string

  @CreateDateColumn({ type: 'timestamp', name: 'timestamp' })
  public timestamp: Date

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    name: 'location',
    spatialFeatureType: 'Point',
    srid: 4326
  })
  public location: Point

  @Column({ type: 'jsonb', name: 'payload', nullable: true })
  public payload?: CreateTrackingDto
}
