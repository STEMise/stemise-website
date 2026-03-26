import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fetchLiveSiteContentPayload, hashSiteContentPayload } from "./site-content-source.js";

const outputPath = resolve("src", "generated", "site-content-snapshot.ts");

try {
  const payload = await fetchLiveSiteContentPayload();
  const hash = await hashSiteContentPayload(payload);

  mkdirSync(resolve("src", "generated"), { recursive: true });
  writeFileSync(
    outputPath,
    `export const SITE_CONTENT_BUILD_SNAPSHOT_HASH = ${JSON.stringify(hash)};\nexport const SITE_CONTENT_BUILD_SNAPSHOT = ${JSON.stringify(payload, null, 2)} as const;\n`,
    "utf8",
  );

  console.log(`Generated site content snapshot at ${outputPath}`);
} catch (error) {
  console.error("Failed to generate site content snapshot:", error);
  process.exit(1);
}
