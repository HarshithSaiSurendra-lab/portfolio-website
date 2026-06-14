import { createClient, type VercelKV } from "@vercel/kv";

// Vercel's own KV store injects KV_REST_API_URL / KV_REST_API_TOKEN, which the
// default `kv` export of @vercel/kv reads automatically. The Upstash marketplace
// integration, however, often injects UPSTASH_REDIS_REST_URL / _TOKEN instead.
// We accept either pair so the visitor counter + leaderboards work no matter
// which store Sai connects on Vercel — falling back to localStorage only when
// neither pair is present. (spec §6.8 / Phase 6 added-scope boards)
function resolveCreds(): { url?: string; token?: string } {
  return {
    url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN,
  };
}

export function kvConfigured(): boolean {
  const { url, token } = resolveCreds();
  return Boolean(url && token);
}

let client: VercelKV | null = null;

export function getKv(): VercelKV {
  if (client) return client;
  const { url, token } = resolveCreds();
  if (!url || !token) throw new Error("KV is not configured");
  client = createClient({ url, token });
  return client;
}
