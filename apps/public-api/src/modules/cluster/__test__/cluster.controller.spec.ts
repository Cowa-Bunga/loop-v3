import { Test, TestingModule } from '@nestjs/testing'
import { ClusterController } from '../cluster.controller'
import { ClusterService } from '../cluster.service'
import { BranchService } from '../../branch/branch.service'

describe('ClusterController', () => {
  let controller: ClusterController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClusterController],
      providers: [ClusterService, BranchService]
    }).compile()

    controller = module.get<ClusterController>(ClusterController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
