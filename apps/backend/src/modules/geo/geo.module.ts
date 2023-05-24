import { Module } from '@nestjs/common'
import { GeoService } from './services/geo.service'
import { GeoController } from './controllers/geo.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GeoEntity } from './entities/geo.entity'

@Module({
  controllers: [GeoController],
  providers: [GeoService],
  exports: [GeoService],
  imports: [TypeOrmModule.forFeature([GeoEntity])]
})
export class GeoModule {}
