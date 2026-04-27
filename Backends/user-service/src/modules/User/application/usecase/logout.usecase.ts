import { Inject, Injectable } from "@nestjs/common";
import { IRedisRepository } from "core/repositories/redis.repositorie";
import { env } from "shared/consts/env";
import { REDIS_REPOSITORY } from "shared/consts/tokens.nest";

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(REDIS_REPOSITORY)
    private readonly redisRepo: IRedisRepository
  ) { }

  async execute(token: string): Promise<void> {
    const ttlSeconds = Math.floor(env.EXPIRES_IN / 1000)
    await this.redisRepo.addToBacklist(token, ttlSeconds)
  }
}

