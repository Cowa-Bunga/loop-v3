import { Test, TestingModule } from '@nestjs/testing'
import { GeoController } from '../controllers/geo.controller'
import { GeoService } from '../services/geo.service'

describe('GeoController', () => {
  let controller: GeoController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoController],
      providers: [GeoService]
    }).compile()

    controller = module.get<GeoController>(GeoController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
