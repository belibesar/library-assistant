import Redis from "ioredis";
const REDIS_URI = process.env.REDIS_URI as string;

export class CachingService {
  private static redisClient: Redis | null = null;

  private static getRedisClient(): Redis {
    if (!this.redisClient) {
      this.redisClient = new Redis(REDIS_URI);
    }
    return this.redisClient;
  }

  static async setCache(key: string, value: string) {
    try {
      const cache = this.getRedisClient();
      await cache.set(key, value);
      console.log(`cache with key: ${key} set`);
    } catch (err) {
      console.log(`Failed to set cache with key: ${key}`);
      throw err;
    }
  }

  static async getCache(key: string) {
    try {
      const cache = this.getRedisClient();
      const result = await cache.get(key);
      console.log(`cache fetching with key: ${key}`);
      return result;
    } catch (err) {
      console.log(err, "<--- err getCache");
      throw err;
    }
  }

  static async deleteCacheByKey(key: string) {
    try {
      const cache = this.getRedisClient();
      await cache.del(key);
      console.log(`cache with key: ${key} deleted`);
    } catch (err) {
      console.log(`Failed to delete cache with key: ${key}`);
      throw err;
    }
  }
}
