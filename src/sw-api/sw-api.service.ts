import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpService } from '@nestjs/axios'
import { Cache } from 'cache-manager'
import { getLogger } from 'src/logging'
import { firstValueFrom } from 'rxjs'

const logger = getLogger('SWApiService')

@Injectable()
export class SWApiService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
  ) {}
  async testCache() {
    await this.cacheManager.set('test', { test: 'test' })
    logger.info('set cache')
    const value = await this.cacheManager.get('test')
    logger.info(`get cache`, { value })
    const response = await firstValueFrom(this.httpService.get('/people'))
    return response.data
  }
}
