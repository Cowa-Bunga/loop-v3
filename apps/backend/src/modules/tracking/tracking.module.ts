import { Module } from '@nestjs/common'
import { TrackingService } from './tracking.service'
import { TrackingController } from './tracking.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrackingEntity } from './entities/tracking.entity'

@Module({
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
  imports: [TypeOrmModule.forFeature([TrackingEntity])]
})
export class TrackingModule {}
