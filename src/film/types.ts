import { SWApiResourceResponse } from '../sw-api'
import { Film } from './entities/film.entity'

export class FilmResource extends Film implements SWApiResourceResponse {
  apiResource: 'films'
}
