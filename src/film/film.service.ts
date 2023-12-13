import { Injectable } from '@nestjs/common'
import { getLogger } from '../logging'

const logger = getLogger('FilmService')

@Injectable()
export class FilmService {
  findAll() {
    logger.info('Getting all films')
  }

  findOne(id: number) {
    return `This action returns a #${id} film`
  }
}
