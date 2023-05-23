import { Module } from '@nestjs/common'
import { HubService } from './hub.service'
import { HubController } from './hub.controller'

@Module({
  controllers: [HubController],
  providers: [HubService],
  exports: [HubService]
})
export class HubModule {}
