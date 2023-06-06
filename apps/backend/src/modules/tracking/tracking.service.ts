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

  async create(createTrackingDto: CreateTrackingDto) {
    console.info('create', createTrackingDto)
    return await this.TrackingServiceDb.save({
      trip_id: '',
      driver_id: '',
      location: {
        type: 'Point',
        coordinates: [createTrackingDto.coords.latitude, createTrackingDto.coords.longitude]
      },
      timestamp: '',
      payload: {}
    })
  }

  getDriverById(driver_id: string) {
    console.info('getDriverById', driver_id)
    return `This action returns all tracking`
  }

  getByTripId(trip_id: string) {
    console.info('getByTripId', trip_id)
    return `This action returns a #${trip_id} tracking`
  }
}
