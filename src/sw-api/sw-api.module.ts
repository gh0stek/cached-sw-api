import { Module } from '@nestjs/common'
import { SWApiService } from './sw-api.service'
import { CacheModule } from '@nestjs/cache-manager'
import type { RedisClientOptions } from 'redis'
import { redisStore } from 'cache-manager-redis-store'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    HttpModule,
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            CACHE_REDIS_HOST: Joi.string().optional().default('localhost'),
            CACHE_REDIS_PORT: Joi.number().empty('').default(6380).optional(),
            CACHE_REDIS_PASSWORD: Joi.string().required(),
            CACHE_REDIS_TTL: Joi.number()
              .empty('')
              .default(60 * 60 * 24)
              .optional(),
          }),
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get('CACHE_REDIS_HOST'),
            port: +configService.get('CACHE_REDIS_PORT'),
          },
          password: configService.get('CACHE_REDIS_PASSWORD'),
          ttl: +configService.get('CACHE_REDIS_TTL'),
        })
        return {
          store,
        } as RedisClientOptions
      },
    }),
  ],
  providers: [SWApiService],
  exports: [SWApiService],
})
export class SWApiModule {}
