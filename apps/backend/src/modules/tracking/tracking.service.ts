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
    await this.TrackingServiceDb.save({
      client_id: params.extras.client_id,
      trip_id: params.extras.trip_id,
      driver_id: params.extras.driver_id,
      location: {
        type: 'Point',
        coordinates: [params.coords.latitude, params.coords.longitude]
      },
      timestamp: params.timestamp,
      payload: params
    }).catch((err) => {
      console.warn(err)
      return { status: 'fail' }
    })

    return { status: 'ok' }
  }

  async getLocationsByDriverId(driver_id: string) {
    const res = await this.TrackingServiceDb.find({
      where: { driver_id },
      select: {
        trip_id: true,
        client_id: true,
        timestamp: true,
        location: {
          coordinates: true
        }
      },
      order: {
        trip_id: 'DESC',
        timestamp: 'DESC'
      },
      take: 1000
    })

    return res.map((v) => ({
      ...v,
      location: v.location.coordinates
    }))
  }

  async getLocationsByTripId(trip_id: string) {
    const res = await this.TrackingServiceDb.find({
      select: {
        driver_id: true,
        client_id: true,
        timestamp: true,
        location: {
          coordinates: true
        }
      },
      where: { trip_id },
      take: 1000,
      order: {
        timestamp: 'DESC'
      }
    })

    return res.map((v) => ({
      ...v,
      location: v.location.coordinates
    }))
  }
}
