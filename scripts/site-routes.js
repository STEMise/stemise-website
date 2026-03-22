import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const curriculumDataPath = path.resolve(__dirname, "../src/lib/curriculum-data.ts");
const appRoutesPath = path.resolve(__dirname, "../src/App.tsx");

const defaultRouteMeta = { changefreq: "weekly", priority: "0.7" };
const excludedStaticRoutes = new Set(["/admin"]);
const routeMetaOverrides = {
  "/": { changefreq: "weekly", priority: "1.0" },
  "/kits": { changefreq: "weekly", priority: "0.9" },
  "/curriculum": { changefreq: "weekly", priority: "0.9" },
  "/get-involved": { changefreq: "weekly", priority: "0.8" },
  "/about": { changefreq: "monthly", priority: "0.7" },
  "/contact": { changefreq: "monthly", priority: "0.6" },
};

const ageRouteMeta = { changefreq: "weekly", priority: "0.85" };
const curriculumRouteMeta = { changefreq: "weekly", priority: "0.85" };

const extractSlugsFromExport = (source, exportName) => {
  const exportStart = source.indexOf(`export const ${exportName}`);
  if (exportStart === -1) {
    throw new Error(`Could not find export "${exportName}" in curriculum data.`);
  }

  const arrayStart = source.indexOf("[", exportStart);
  const arrayEnd = source.indexOf("];", arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error(`Could not parse array for export "${exportName}".`);
  }

  const exportBlock = source.slice(arrayStart, arrayEnd);
  return [...exportBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
};

const readCurriculumSource = () => fs.readFileSync(curriculumDataPath, "utf8");
const readAppSource = () => fs.readFileSync(appRoutesPath, "utf8");

export const getStaticAppRoutes = () => {
  const source = readAppSource();
  const routeMatches = [...source.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<([^}]+)\}\s*\/>/g)];

  return routeMatches
    .map((match) => ({
      path: match[1],
      element: match[2],
    }))
    .filter((route) => route.path !== "*" && !route.path.includes(":"))
    .filter((route) => !route.element.trim().startsWith("Navigate"))
    .filter((route) => !excludedStaticRoutes.has(route.path))
    .map((route) => ({
      path: route.path,
      ...(routeMetaOverrides[route.path] ?? defaultRouteMeta),
    }));
};

export const getCurriculumAgeRoutes = () => {
  const source = readCurriculumSource();
  return extractSlugsFromExport(source, "curriculumAgeGroups").map((slug) => ({
    path: `/curriculum/age/${slug}`,
    ...ageRouteMeta,
  }));
};

export const getCurriculumEntryRoutes = () => {
  const source = readCurriculumSource();
  return extractSlugsFromExport(source, "curriculumEntries").map((slug) => ({
    path: `/curriculum/${slug}`,
    ...curriculumRouteMeta,
  }));
};

export const getSitemapEntries = () => [
  ...getStaticAppRoutes(),
  ...getCurriculumAgeRoutes(),
  ...getCurriculumEntryRoutes(),
];

export const getPrerenderRoutes = () => getSitemapEntries().map((entry) => entry.path);
