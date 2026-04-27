import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { REDIS_REPOSITORY } from 'shared/consts/tokens.nest'

@Global()
@Module({
  providers: [
    {
      provide: REDIS_REPOSITORY,
      useClass: RedisService
    }
  ],
  exports: [REDIS_REPOSITORY]
})
export class RedisModule { }

