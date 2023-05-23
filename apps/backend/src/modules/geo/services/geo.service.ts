import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GeoEntity } from '../entities/geo.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(GeoEntity)
    private readonly GeoDB: Repository<GeoEntity>
  ) {}

  public async getAll() {
    return await this.GeoDB.find()
  }

  public async create(params: GeoEntity) {
    params.start = {
      type: 'Point',
      coordinates: [params.start[0], params.start[1]]
    }
    return await this.GeoDB.save(params)
  }

  public async getRange(lat: number, lng: number, range = 1000) {
    const res = await this.GeoDB.createQueryBuilder('geo')
      .setParameters({
        origin: JSON.stringify({
          type: 'Point',
          coordinates: [lat, lng]
        }),
        range: range * 1000 // KM conversion
      })
      .select([
        'geo.client_id AS client_id',
        'ST_Distance(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)))/1000 AS distance'
      ])
      .where(
        `ST_DWithin(location, ST_SetSRID(ST_GeomFromGeoJSON(:origin), ST_SRID(location)) ,:range)`
      )
      .orderBy('distance', 'ASC')
      .getRawMany()

    return res
  }
}
