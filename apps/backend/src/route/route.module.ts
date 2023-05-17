import { Module } from '@nestjs/common'
import { RouteService } from './services/route.service'
import { RouteController } from './controllers/route.controller'

@Module({
  controllers: [RouteController],
  providers: [RouteService]
})
export class RouteModule {}
