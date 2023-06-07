import { Injectable } from '@nestjs/common'
import { CreateTrackingDto } from './dto/create-tracking.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { TrackingEntity } from './entities/tracking.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(TrackingEntity)
    private readonly TrackingServiceDb: Repository<TrackingEntity>
  ) {}

  async create(params: CreateTrackingDto) {
    console.info('create', params)
    return await this.TrackingServiceDb.save({
      client_id: params.extras.client_id,
      trip_id: params.extras.trip_id,
      driver_id: params.extras.driver_id,
      location: {
        type: 'Point',
        coordinates: [params.coords.latitude, params.coords.longitude]
      },
      timestamp: params.timestamp,
      payload: params
    })
  }

  async getDriverById(driver_id: string) {
    console.info('getDriverById', driver_id)
    return await this.TrackingServiceDb.find({
      where: { driver_id },
      take: 1000
    })
  }

  async getByTripId(trip_id: string) {
    console.info('getByTripId', trip_id)
    return await this.TrackingServiceDb.find({
      where: { trip_id },
      take: 1000
    })
  }
}
