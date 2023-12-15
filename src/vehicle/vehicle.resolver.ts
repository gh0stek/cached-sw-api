import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { SWApiService } from 'src/sw-api'
import { Vehicle } from './entities/vehicle.entity'
import { VehicleResource, PaginatedVehicles } from './types'
import { PageArgs } from 'src/lib'
import { Person } from 'src/people/entities/person.entity'
import { PersonResource } from 'src/people/types'
import { Film } from 'src/film/entities/film.entity'
import { FilmResource } from 'src/film/types'
import { getLogger } from 'src/logging'
import { getLastParamFromUrl } from 'src/utils'

const logger = getLogger('VehicleResolver')

@Resolver(() => Vehicle)
export class VehicleResolver {
  constructor(private readonly swApiService: SWApiService) {}

  @Query(() => PaginatedVehicles, { name: 'vehicles' })
  async findAll(@Args() { page, search }: PageArgs) {
    return this.swApiService.getPage<VehicleResource>('vehicles', page, search)
  }

  @Query(() => Vehicle, { name: 'vehicle' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.swApiService.getById<VehicleResource>('vehicles', id)
  }

  @ResolveField('pilots', () => [Person])
  async getPeople(@Parent() vehicle: Vehicle) {
    logger.debug(`getPeople for ${vehicle.pilots}`)
    return (
      await Promise.all(
        vehicle.pilots.map((url) =>
          this.swApiService.getById<PersonResource>(
            'people',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('films', () => [Film])
  async getFilms(@Parent() vehicle: Vehicle) {
    logger.debug(`getFilms for ${vehicle.films}`)
    return (
      await Promise.all(
        vehicle.films.map((url) =>
          this.swApiService.getById<FilmResource>(
            'films',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }
}
