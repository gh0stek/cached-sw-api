import { Injectable, Inject } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { HttpService } from '@nestjs/axios'
import { Cache } from 'cache-manager'
import { getLogger } from 'src/logging'
import { firstValueFrom, map } from 'rxjs'
import { SWApiResourceResponse, SWApiResponse, IPaginatedType } from './types'

const logger = getLogger('SWApiService')

@Injectable()
export class SWApiService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
  ) {}

  async getById<T extends SWApiResourceResponse>(
    resource: T['apiResource'],
    id: number,
  ): Promise<SWApiResponse<T>> {
    const key = `${resource}-id:${id}`
    try {
      const cached = await this.cacheManager.get<SWApiResponse<T>>(key)
      if (cached) {
        logger.debug(`cache hit for ${key}`)
        return cached
      }
    } catch (e) {
      logger.error(`get cache error for ${key}`, e)
    }
    logger.debug(`cache miss for ${key}`)

    let response: SWApiResponse<T>

    try {
      response = await firstValueFrom(
        this.httpService.get<SWApiResponse<T>>(`/${resource}/${id}`).pipe(
          map((response) => ({
            ...response.data,
            id: +response.data.url[response.data.url.length - 2],
          })),
        ),
      )
    } catch (e) {
      logger.error(`get ${resource} ${id} error`, e)
      throw e
    }
    await this.cacheManager.set(key, response)
    return response
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
        logger.debug(`cache hit for ${key}`)
        return cached
      }
    } catch (e) {
      logger.error(`get cache error for ${key}`, e)
    }
    logger.debug(`cache miss for ${key}`)

    let response: IPaginatedType<SWApiResponse<T>>

    try {
      response = await firstValueFrom(
        this.httpService
          .get<IPaginatedType<SWApiResponse<T>>>(`/${resource}/`, {
            params: { page, search },
          })
          .pipe(
            map((response) => response.data),
            map((data) => ({
              ...data,
              results: data.results.map((result) => ({
                ...result,
                id: +result.url[result.url.length - 2],
              })),
            })),
          ),
      )
    } catch (e) {
      logger.error(`get ${resource} page: ${page} search: ${search} error`, e)
      throw e
    }
    await this.cacheManager.set(key, response)
    return response
  }
}
