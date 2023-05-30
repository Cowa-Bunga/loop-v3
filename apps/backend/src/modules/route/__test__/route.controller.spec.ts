import { Test, TestingModule } from '@nestjs/testing'
import { RouteController } from '../controllers/route.controller'
import { RouteService } from '../services/route.service'

xdescribe('RouteController', () => {
  let controller: RouteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouteController],
      providers: [RouteService]
    }).compile()

    controller = module.get<RouteController>(RouteController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
