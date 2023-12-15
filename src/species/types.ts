import { ObjectType } from '@nestjs/graphql'
import { SWApiResourceResponse, Paginated } from '../sw-api'
import { Species } from './entities/species.entity'

export class SpeciesResource extends Species implements SWApiResourceResponse {
  apiResource: 'species'
}

@ObjectType()
export class PaginatedSpecies extends Paginated(Species) {}
