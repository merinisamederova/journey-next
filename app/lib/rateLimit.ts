type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();
const MAX_BUCKETS = 1000;

function cleanupExpiredBuckets(now: number) {
  if (buckets.size < MAX_BUCKETS) {
    return;
  }

  for (const [key, entry] of buckets.entries()) {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

function normalizeIp(value: string | null) {
  const ip = value?.split(",")[0]?.trim();

  return ip || "unknown";
}

export function getClientIp(request: Request) {
  return normalizeIp(
    request.headers.get("x-vercel-forwarded-for") ??
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip"),
  );
}

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return false;
  }

  entry.count += 1;
  return entry.count > limit;
}
