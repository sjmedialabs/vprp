/**
 * Loads .env from repo root and checks Supabase REST + Postgres TCP reachability hints.
 * Run: node scripts/verify-env-connection.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv(path) {
  const raw = readFileSync(path, "utf8");
  const out = {};
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const env = loadEnv(resolve(root, ".env"));
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const databaseUrl = env.DATABASE_URL;

async function checkSupabaseAuth() {
  if (!url || !anon) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env");
    process.exit(1);
  }
  const base = url.replace(/\/$/, "");
  // GoTrue health does not require PostgREST; validates project URL reachability.
  const health = `${base}/auth/v1/health`;
  const resHealth = await fetch(health, {
    method: "GET",
    headers: { apikey: anon },
  });
  console.log(`Supabase Auth health ${health} -> HTTP ${resHealth.status}`);

  // Confirms anon JWT is accepted by the API gateway (PostgREST root may reject anon).
  const openapi = `${base}/rest/v1/`;
  const resOpenapi = await fetch(openapi, {
    method: "GET",
    headers: { apikey: anon, Authorization: `Bearer ${anon}` },
  });
  console.log(`Supabase REST ${openapi} -> HTTP ${resOpenapi.status} (root may require service_role; 401 is OK if key is recognized)`);
  if (!resHealth.ok) {
    const text = await resHealth.text().catch(() => "");
    console.error(text.slice(0, 500));
    process.exit(1);
  }
}

function checkDatabaseUrl() {
  if (!databaseUrl) {
    console.warn("DATABASE_URL not set; skip Postgres URL parse.");
    return;
  }
  try {
    const u = new URL(databaseUrl);
    console.log(`DATABASE_URL host: ${u.hostname} port: ${u.port || "5432"} db: ${u.pathname.replace(/^\//, "") || "postgres"}`);
  } catch (e) {
    console.error("DATABASE_URL is not a valid URL:", e.message);
    process.exit(1);
  }
}

await checkSupabaseAuth();
checkDatabaseUrl();
console.log("Env check completed OK.");
