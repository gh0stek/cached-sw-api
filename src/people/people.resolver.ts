import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Person } from './entities/person.entity'
import { SWApiService } from 'src/sw-api'
import { PersonResource, PaginatedPeople } from './types'
import { PageArgs } from 'src/lib'
import { Film } from 'src/film/entities/film.entity'
import { FilmResource } from 'src/film/types'
import { Planet } from 'src/planet/entities/planet.entity'
import { PlanetResource } from 'src/planet/types'
import { getLogger } from 'src/logging'
import { getLastParamFromUrl } from 'src/utils'
import { Species } from 'src/species/entities/species.entity'
import { SpeciesResource } from 'src/species/types'
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import { VehicleResource } from 'src/vehicle/types'
import { Starship } from 'src/starship/entities/starship.entity'
import { StarshipResource } from 'src/starship/types'

const logger = getLogger('PeopleResolver')

@Resolver(() => Person)
export class PeopleResolver {
  constructor(private readonly swApiService: SWApiService) {}

  @Query(() => PaginatedPeople, { name: 'people' })
  async findAll(@Args() { page, search }: PageArgs) {
    return this.swApiService.getPage<PersonResource>('people', page, search)
  }

  @Query(() => Person, { name: 'person' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.swApiService.getById<PersonResource>('people', id)
  }

  @ResolveField('films', () => [Film])
  async getFilms(@Parent() person: Person) {
    logger.debug(`getFilms for ${person.name}`)
    return (
      await Promise.all(
        person.films.map((url) =>
          this.swApiService.getById<FilmResource>(
            'films',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('homeworld', () => Planet)
  async getHomeworld(@Parent() person: Person) {
    logger.debug(`getHomeworld for ${person.homeworld}`)
    return this.swApiService.getById<PlanetResource>(
      'planets',
      +getLastParamFromUrl(person.homeworld),
    )
  }

  @ResolveField('species', () => [Species])
  async getSpecies(@Parent() person: Person) {
    logger.debug(`getSpecies for ${person.name}`)
    return (
      await Promise.all(
        person.species.map((url) =>
          this.swApiService.getById<SpeciesResource>(
            'species',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('vehicles', () => [Vehicle])
  async getVehicles(@Parent() person: Person) {
    logger.debug(`getVehicles for ${person.name}`)
    return (
      await Promise.all(
        person.vehicles.map((url) =>
          this.swApiService.getById<VehicleResource>(
            'vehicles',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('starships', () => [Starship])
  async getStarships(@Parent() person: Person) {
    logger.debug(`getStarships for ${person.name}`)
    return (
      await Promise.all(
        person.starships.map((url) =>
          this.swApiService.getById<StarshipResource>(
            'starships',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }
}
