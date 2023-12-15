import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { SWApiService } from 'src/sw-api'
import { Film } from './entities/film.entity'
import { FilmResource, PaginatedFilms } from './types'
import { PageArgs } from 'src/lib'

@Resolver(() => Film)
export class FilmResolver {
  constructor(private readonly swApiService: SWApiService) {}

  @Query(() => PaginatedFilms, { name: 'films' })
  async findAll(@Args() { page, search }: PageArgs) {
    return this.swApiService.getPage<FilmResource>('films', page, search)
  }

  @Query(() => Film, { name: 'film' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.swApiService.getById<FilmResource>('films', id)
  }
}
