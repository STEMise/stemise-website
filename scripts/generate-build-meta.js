import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const buildId =
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.VERCEL_DEPLOYMENT_ID ||
  new Date().toISOString();

const outputPath = resolve("src", "generated", "build-meta.ts");

mkdirSync(resolve("src", "generated"), { recursive: true });
writeFileSync(
  outputPath,
  `export const ADMIN_BUILD_ID = ${JSON.stringify(buildId)};\n`,
  "utf8",
);

console.log(`Generated admin build marker at ${outputPath}`);
