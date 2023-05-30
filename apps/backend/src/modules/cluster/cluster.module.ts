import { Module } from '@nestjs/common'
import { ClusterService } from './cluster.service'
import { ClusterController } from './cluster.controller'
import { BranchService } from '../branch/branch.service'


@Module({
  controllers: [ClusterController],
  providers: [ClusterService, BranchService],
  exports: [ClusterService]
})
export class ClusterModule {}
