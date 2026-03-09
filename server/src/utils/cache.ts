import { redis } from "../lib/redis";

export function buildMenuCacheKey(restaurantId: string) {
  return `restaurant:${restaurantId}:menu`;
}

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error("REDIS_GET_ERROR", error);
    return null;
  }
}

export async function setCache(key: string, value: unknown, ttl = 120) {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch (error) {
    console.error("REDIS_SET_ERROR", error);
  }
}

export async function invalidateMenuCache(restaurantId: string) {
  const key = buildMenuCacheKey(restaurantId);
  await redis.del(key);
}
