import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { FilmService } from './film.service'
import { Film } from './entities/film.entity'

@Resolver(() => Film)
export class FilmResolver {
  constructor(private readonly filmService: FilmService) {}

  @Query(() => [Film], { name: 'film' })
  findAll() {
    return this.filmService.findAll()
  }

  @Query(() => Film, { name: 'film' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.filmService.findOne(id)
  }
}
