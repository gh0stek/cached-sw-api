import { ObjectType } from '@nestjs/graphql'
import { SWApiResourceResponse, Paginated } from '../sw-api'
import { Starship } from './entities/starship.entity'

export class StarshipResource
  extends Starship
  implements SWApiResourceResponse
{
  apiResource: 'starships'
}

@ObjectType()
export class PaginatedStarships extends Paginated(Starship) {}
