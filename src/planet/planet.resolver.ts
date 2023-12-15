import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { SWApiService } from 'src/sw-api'
import { Planet } from './entities/planet.entity'
import { PlanetResource, PaginatedPlanets } from './types'
import { PageArgs } from 'src/lib'
import { Person } from 'src/people/entities/person.entity'
import { PersonResource } from 'src/people/types'
import { Film } from 'src/film/entities/film.entity'
import { FilmResource } from 'src/film/types'
import { getLogger } from 'src/logging'
import { getLastParamFromUrl } from 'src/utils'

const logger = getLogger('PlanetResolver')

@Resolver(() => Planet)
export class PlanetResolver {
  constructor(private readonly swApiService: SWApiService) {}

  @Query(() => PaginatedPlanets, { name: 'planets' })
  async findAll(@Args() { page, search }: PageArgs) {
    return this.swApiService.getPage<PlanetResource>('planets', page, search)
  }

  @Query(() => Planet, { name: 'planet' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.swApiService.getById<PlanetResource>('planets', id)
  }

  @ResolveField('residents', () => [Person])
  async getPeople(@Parent() planet: Planet) {
    logger.debug(`getPeople for ${planet.residents}`)
    return (
      await Promise.all(
        planet.residents.map((url) =>
          this.swApiService.getById<PersonResource>(
            'people',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('films', () => [Film])
  async getFilms(@Parent() planet: Planet) {
    logger.debug(`getFilms for ${planet.films}`)
    return (
      await Promise.all(
        planet.films.map((url) =>
          this.swApiService.getById<FilmResource>(
            'films',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }
}
