import { Test, TestingModule } from '@nestjs/testing'
import { SWApiService } from './sw-api.service'

describe('SWApiService', () => {
  let service: SWApiService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SWApiService],
    }).compile()

    service = module.get<SWApiService>(SWApiService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
