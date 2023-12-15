import { ObjectType } from '@nestjs/graphql'
import { SWApiResourceResponse, Paginated } from '../sw-api'
import { Film } from './entities/film.entity'

export class FilmResource extends Film implements SWApiResourceResponse {
  apiResource: 'films'
}

@ObjectType()
export class PaginatedFilms extends Paginated(Film) {}
