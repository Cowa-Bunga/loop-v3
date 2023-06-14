import { Module } from '@nestjs/common'
import { ClusterService } from './cluster.service'
import { ClusterController } from './cluster.controller'
import { BranchModule } from '../branch/branch.module'

@Module({
  imports: [BranchModule],
  controllers: [ClusterController],
  providers: [ClusterService],
  exports: [ClusterService]
})
export class ClusterModule {}
