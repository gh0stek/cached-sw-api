import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { SWApiService } from 'src/sw-api'
import { Film } from './entities/film.entity'
import { FilmResource, PaginatedFilms } from './types'
import { PageArgs } from 'src/lib'
import { Person } from 'src/people/entities/person.entity'
import { PersonResource } from 'src/people/types'
import { getLogger } from 'src/logging'
import { getLastParamFromUrl } from 'src/utils'
import { Species } from 'src/species/entities/species.entity'
import { SpeciesResource } from 'src/species/types'
import { Vehicle } from 'src/vehicle/entities/vehicle.entity'
import { VehicleResource } from 'src/vehicle/types'
import { Starship } from 'src/starship/entities/starship.entity'
import { StarshipResource } from 'src/starship/types'
import { Planet } from 'src/planet/entities/planet.entity'
import { PlanetResource } from 'src/planet/types'

const logger = getLogger('FilmResolver')

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

  @ResolveField('characters', () => [Person])
  async getPeople(@Parent() film: Film) {
    logger.debug(`getPeople for ${film.characters}`)
    return (
      await Promise.all(
        film.characters.map((url) =>
          this.swApiService.getById<PersonResource>(
            'people',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('vehicles', () => [Vehicle])
  async getVehicles(@Parent() film: Film) {
    logger.debug(`getVehicles for ${film.title}`)
    return (
      await Promise.all(
        film.vehicles.map((url) =>
          this.swApiService.getById<VehicleResource>(
            'vehicles',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('starships', () => [Starship])
  async getStarships(@Parent() film: Film) {
    logger.debug(`getStarships for ${film.title}`)
    return (
      await Promise.all(
        film.starships.map((url) =>
          this.swApiService.getById<StarshipResource>(
            'starships',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('species', () => [Species])
  async getSpecies(@Parent() film: Film) {
    logger.debug(`getSpecies for ${film.title}`)
    return (
      await Promise.all(
        film.species.map((url) =>
          this.swApiService.getById<SpeciesResource>(
            'species',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('planets', () => [Planet])
  async getPlanets(@Parent() film: Film) {
    logger.debug(`getPlanets for ${film.title}`)
    return (
      await Promise.all(
        film.planets.map((url) =>
          this.swApiService.getById<PlanetResource>(
            'planets',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }
}
