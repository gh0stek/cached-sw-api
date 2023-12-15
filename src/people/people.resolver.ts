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
import { getLogger } from 'src/logging'
import { getLastParamFromUrl } from 'src/utils'

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
}
