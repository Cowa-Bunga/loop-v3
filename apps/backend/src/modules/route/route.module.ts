import { Module } from '@nestjs/common'
import { RouteService } from './services/route.service'
import { ValhallaService } from './services/valhalla.service'
import { RouteController } from './controllers/route.controller'

@Module({
  controllers: [RouteController],
  providers: [RouteService, ValhallaService]
})
export class RouteModule {}
