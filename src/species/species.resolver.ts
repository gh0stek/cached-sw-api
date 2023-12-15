import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { SWApiService } from 'src/sw-api'
import { Species } from './entities/species.entity'
import { SpeciesResource, PaginatedSpecies } from './types'
import { PageArgs } from 'src/lib'
import { Person } from 'src/people/entities/person.entity'
import { PersonResource } from 'src/people/types'
import { Film } from 'src/film/entities/film.entity'
import { FilmResource } from 'src/film/types'
import { Planet } from 'src/planet/entities/planet.entity'
import { PlanetResource } from 'src/planet/types'
import { getLogger } from 'src/logging'
import { getLastParamFromUrl } from 'src/utils'

const logger = getLogger('SpeciesResolver')

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(private readonly swApiService: SWApiService) {}

  @Query(() => PaginatedSpecies, { name: 'species' })
  async findAll(@Args() { page, search }: PageArgs) {
    return this.swApiService.getPage<SpeciesResource>('species', page, search)
  }

  @Query(() => Species, { name: 'findSpecies' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.swApiService.getById<SpeciesResource>('species', id)
  }

  @ResolveField('people', () => [Person])
  async getPeople(@Parent() species: Species) {
    logger.debug(`getPeople for ${species.people}`)
    return (
      await Promise.all(
        species.people.map((url) =>
          this.swApiService.getById<PersonResource>(
            'people',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('films', () => [Film])
  async getFilms(@Parent() species: Species) {
    logger.debug(`getFilms for ${species.films}`)
    return (
      await Promise.all(
        species.films.map((url) =>
          this.swApiService.getById<FilmResource>(
            'films',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('homeworld', () => Planet)
  async getHomeworld(@Parent() species: Species) {
    logger.debug(`getHomeworld for ${species.homeworld}`)
    return this.swApiService.getById<PlanetResource>(
      'planets',
      +getLastParamFromUrl(species.homeworld),
    )
  }
}
