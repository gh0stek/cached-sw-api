import { ObjectType } from '@nestjs/graphql'
import { SWApiResourceResponse, Paginated } from '../sw-api'
import { Person } from './entities/person.entity'

export class PersonResource extends Person implements SWApiResourceResponse {
  apiResource: 'people'
}

@ObjectType()
export class PaginatedPeople extends Paginated(Person) {}
