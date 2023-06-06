import { Module } from '@nestjs/common'
import { ValhallaService } from './services/valhalla.service'
import { RouteController } from './controllers/route.controller'

@Module({
  controllers: [RouteController],
  providers: [ValhallaService]
})
export class RouteModule {}
