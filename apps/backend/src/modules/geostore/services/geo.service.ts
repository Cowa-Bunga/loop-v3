import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { GeoEntity } from '../entities/geo.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(GeoEntity)
    private readonly GeoServiceDb: Repository<GeoEntity>
  ) {}

  public async getAll() {
    return await this.GeoServiceDb.find()
  }

  public async create(params: GeoEntity) {
    params.start = {
      type: 'Point',
      coordinates: [params.start[0], params.start[1]]
    }
    return await this.GeoServiceDb.save(params)
  }
}
