import { Test, TestingModule } from '@nestjs/testing'
import { GeoService } from '../services/geo.service'

xdescribe('GeoService', () => {
  let service: GeoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeoService]
    }).compile()

    service = module.get<GeoService>(GeoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
