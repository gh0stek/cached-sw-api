import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpService } from '@nestjs/axios'
import { Cache } from 'cache-manager'
import { getLogger } from 'src/logging'
import { firstValueFrom } from 'rxjs'
import { SWApiResourceResponse, SWApiResponse, IPaginatedType } from './types'
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
  ): Promise<SWApiResponse<T>> {
    const key = `${resource}-id:${id}`
    try {
      const cached = await this.cacheManager.get<SWApiResponse<T>>(key)
      if (cached) {
        logger.info(`cache hit for ${key}`)
        return cached
      }
    } catch (e) {
      logger.error(`get cache error for ${key}`, e)
    }
    logger.info(`cache miss for ${key}`)

    let response: AxiosResponse<SWApiResponse<T>>

    try {
      response = await firstValueFrom(
        this.httpService.get<SWApiResponse<T>>(`/${resource}/${id}`),
      )
    } catch (e) {
      logger.error(`get ${resource} ${id} error`, e)
      throw e
    }
    await this.cacheManager.set(key, response.data)
    return response.data
  }
  async getPage<T extends SWApiResourceResponse>(
    resource: T['apiResource'],
    pageArg = 1,
    search?: string,
  ): Promise<IPaginatedType<SWApiResponse<T>>> {
    const page = pageArg ?? 1
    const key = `${resource}-page:${page}-search:${search}`
    try {
      const cached =
        await this.cacheManager.get<IPaginatedType<SWApiResponse<T>>>(key)
      if (cached) {
        logger.info(`cache hit for ${key}`)
        return cached
      }
    } catch (e) {
      logger.error(`get cache error for ${key}`, e)
    }
    logger.info(`cache miss for ${key}`)

    let response: AxiosResponse<IPaginatedType<SWApiResponse<T>>>

    try {
      response = await firstValueFrom(
        this.httpService.get<IPaginatedType<SWApiResponse<T>>>(
          `/${resource}/`,
          {
            params: { page, search },
          },
        ),
      )
    } catch (e) {
      logger.error(`get ${resource} page: ${page} search: ${search} error`, e)
      throw e
    }
    await this.cacheManager.set(key, response.data)
    return response.data
  }
}
