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
}
