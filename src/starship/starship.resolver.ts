import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { SWApiService } from 'src/sw-api'
import { Starship } from './entities/starship.entity'
import { StarshipResource, PaginatedStarships } from './types'
import { PageArgs } from 'src/lib'
import { Person } from 'src/people/entities/person.entity'
import { PersonResource } from 'src/people/types'
import { Film } from 'src/film/entities/film.entity'
import { FilmResource } from 'src/film/types'
import { getLogger } from 'src/logging'
import { getLastParamFromUrl } from 'src/utils'

const logger = getLogger('StarshipResolver')

@Resolver(() => Starship)
export class StarshipResolver {
  constructor(private readonly swApiService: SWApiService) {}

  @Query(() => PaginatedStarships, { name: 'starships' })
  async findAll(@Args() { page, search }: PageArgs) {
    return this.swApiService.getPage<StarshipResource>(
      'starships',
      page,
      search,
    )
  }

  @Query(() => Starship, { name: 'starship' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.swApiService.getById<StarshipResource>('starships', id)
  }

  @ResolveField('pilots', () => [Person])
  async getPeople(@Parent() starship: Starship) {
    logger.debug(`getPeople for ${starship.pilots}`)
    return (
      await Promise.all(
        starship.pilots.map((url) =>
          this.swApiService.getById<PersonResource>(
            'people',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }

  @ResolveField('films', () => [Film])
  async getFilms(@Parent() starship: Starship) {
    logger.debug(`getFilms for ${starship.films}`)
    return (
      await Promise.all(
        starship.films.map((url) =>
          this.swApiService.getById<FilmResource>(
            'films',
            +getLastParamFromUrl(url),
          ),
        ),
      )
    ).flat()
  }
}
