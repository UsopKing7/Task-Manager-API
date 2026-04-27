import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import Redis from 'ioredis'
import { keyBalclistToken } from 'shared/consts/ keysRedis'
import { env } from 'shared/consts/env'

export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name)
  private client: Redis

  constructor() {
    this.client = new Redis(env.REDIS_URL)
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key)
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setex(key, ttl, value)
      return
    }
    await this.client.set(key, value)
  }

  async addToBacklist(token: string, ttl: number): Promise<void> {
    await this.client.setex(keyBalclistToken(token), ttl, 'invalid')
  }

  async isBacklisted(token: string): Promise<boolean> {
    const result = await this.client.get(keyBalclistToken(token))
    return result !== null
  }

  async onModuleInit() {
    await this.client.ping()
    this.logger.log('[+][OK][REDIS] Connected to redis successfully')
  }

  async onModuleDestroy() {
    await this.client.quit()
    this.logger.log('[-][OK][REDIS] Disconnected from redis successfully')
  }

  getClient(): Redis {
    return this.client
  }
}

