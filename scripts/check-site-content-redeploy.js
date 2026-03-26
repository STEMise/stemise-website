import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  fetchLiveSiteContentState,
  getSiteContentSourceConfig,
  hashSiteContentPayload,
} from "./site-content-source.js";

const statePath = resolve(".github", "site-content-deploy-state.json");

const readDeployState = () => {
  if (!existsSync(statePath)) {
    return {
      lastDeployedHash: "",
      lastPublishedUpdatedAt: null,
      lastTriggeredAt: null,
    };
  }

  try {
    return JSON.parse(readFileSync(statePath, "utf8"));
  } catch {
    return {
      lastDeployedHash: "",
      lastPublishedUpdatedAt: null,
      lastTriggeredAt: null,
    };
  }
};

const writeDeployState = (state) => {
  mkdirSync(resolve(".github"), { recursive: true });
  writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
};

const triggerDeployHook = async (deployHookUrl, payloadHash) => {
  const requestUrl = new URL(deployHookUrl);
  requestUrl.searchParams.set("buildCache", "false");

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "github-cron",
      contentHash: payloadHash,
      requestedAt: new Date().toISOString(),
    }),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Deploy hook failed with ${response.status} ${response.statusText}${responseText ? `: ${responseText}` : ""}`,
    );
  }
};

try {
  const { available } = getSiteContentSourceConfig();
  if (!available) {
    throw new Error("VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set for the GitHub publisher.");
  }

  const deployHookUrl = process.env.DEPLOY_HOOK_URL;
  if (!deployHookUrl) {
    throw new Error("DEPLOY_HOOK_URL must be set for the GitHub publisher.");
  }

  const { payload, updatedAt } = await fetchLiveSiteContentState();
  const payloadHash = await hashSiteContentPayload(payload);
  const deployState = readDeployState();

  if (!updatedAt) {
    throw new Error("site_content_state.updated_at is missing from the live row.");
  }

  if (
    deployState.lastPublishedUpdatedAt === updatedAt &&
    deployState.lastDeployedHash === payloadHash
  ) {
    console.log("No new admin save detected. Skipping redeploy.");
    process.exit(0);
  }

  await triggerDeployHook(deployHookUrl, payloadHash);

  writeDeployState({
    lastDeployedHash: payloadHash,
    lastPublishedUpdatedAt: updatedAt,
    lastTriggeredAt: new Date().toISOString(),
  });

  console.log(`Triggered no-cache redeploy for saved content hash ${payloadHash}.`);
} catch (error) {
  console.error("GitHub publisher failed:", error);
  process.exit(1);
}
