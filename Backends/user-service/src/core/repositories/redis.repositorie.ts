export abstract class IRedisRepository {
  abstract get(key: string): Promise<string | null>
  abstract set(key: string, value: string, ttl?: number): Promise<void>
  abstract delete(key: string): Promise<void>
  abstract addToBacklist(token: string, ttl: number): Promise<void>
  abstract isBacklisted(token: string): Promise<boolean>
}

