import { ObjectType } from '@nestjs/graphql'
import { SWApiResourceResponse, Paginated } from '../sw-api'
import { Planet } from './entities/planet.entity'

export class PlanetResource extends Planet implements SWApiResourceResponse {
  apiResource: 'planets'
}

@ObjectType()
export class PaginatedPlanets extends Paginated(Planet) {}
