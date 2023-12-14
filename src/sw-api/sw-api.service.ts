import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpService } from '@nestjs/axios'
import { Cache } from 'cache-manager'
import { getLogger } from 'src/logging'
import { firstValueFrom } from 'rxjs'
import { SWApiResourceResponse, SWApiResponce } from './types'
import { AxiosResponse } from 'axios'

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
  async getById<T extends SWApiResourceResponse>(
    resource: T['apiResource'],
    id: number,
  ): Promise<SWApiResponce<T>> {
    const key = `${resource}-${id}`
    try {
      const cached = await this.cacheManager.get<SWApiResponce<T>>(key)
      if (cached) {
        logger.info(`cache hit for ${key}`)
        return cached
      }
    } catch (e) {
      logger.error(`get cache error for ${key}`, e)
    }
    logger.info(`cache miss for ${key}`)

    let response: AxiosResponse<SWApiResponce<T>>

    try {
      response = await firstValueFrom(
        this.httpService.get<SWApiResponce<T>>(`/${resource}/${id}`),
      )
    } catch (e) {
      logger.error(`get ${resource} ${id} error`, e)
      throw e
    }
    await this.cacheManager.set(key, response.data)
    return response.data
  }
  // getAll(resource: SWResource) {
  //   return this.httpService.get(`/${resource}`)
  // }
  // getPage(resource: SWResource, page: number) {
  //   return this.httpService.get(`/${resource}/?page=${page}`)
  // }
}
