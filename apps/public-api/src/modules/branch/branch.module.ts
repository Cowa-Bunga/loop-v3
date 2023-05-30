import { Module } from '@nestjs/common'
import { BranchService } from './branch.service'
import { BranchController } from './branch.controller'

@Module({
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService]
})
export class BranchModule {}
