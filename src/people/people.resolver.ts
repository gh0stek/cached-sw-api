import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { Person } from './entities/person.entity'
import { SWApiService } from 'src/sw-api'
import { PersonResource, PaginatedPeople } from './types'
import { PageArgs } from 'src/lib'

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
}
