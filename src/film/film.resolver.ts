import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { FilmService } from './film.service'
import { SWApiService } from 'src/sw-api'
import { Film } from './entities/film.entity'
import { FilmResource } from './types'

@Resolver(() => Film)
export class FilmResolver {
  constructor(
    private readonly filmService: FilmService,
    private readonly swApiService: SWApiService,
  ) {}

  @Query(() => [Film], { name: 'film' })
  findAll() {
    return this.filmService.findAll()
  }

  @Query(() => Film, { name: 'film' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.swApiService.getById<FilmResource>('films', id)
  }
}
