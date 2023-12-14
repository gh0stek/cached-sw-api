import { Test, TestingModule } from '@nestjs/testing'
import { FilmResolver } from './film.resolver'
import { FilmService } from './film.service'

describe('FilmResolver', () => {
  let resolver: FilmResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmResolver, FilmService],
    }).compile()

    resolver = module.get<FilmResolver>(FilmResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
