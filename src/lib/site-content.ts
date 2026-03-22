import { useQuery } from "@tanstack/react-query";
import {
  homeImpactMetrics,
  homeImpactCountries,
  homeLiveEvents,
  kitCatalog,
  partnerLogos,
  teamMembers,
  type HomeEvent,
  type HomeImpactCountry,
  type HomeImpactMetric,
  type KitCatalogItem,
  type SupporterLogo,
  type TeamMember,
} from "@/lib/site-data";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type WorkshopItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  registrationLink?: string;
};

export type SiteContentKey =
  | "home_events"
  | "impact_metrics"
  | "impact_countries"
  | "kits"
  | "workshops"
  | "supporters"
  | "team_members";

export type SiteContentMap = {
  home_events: HomeEvent[];
  impact_metrics: HomeImpactMetric[];
  impact_countries: HomeImpactCountry[];
  kits: KitCatalogItem[];
  workshops: WorkshopItem[];
  supporters: SupporterLogo[];
  team_members: TeamMember[];
};

type SiteContentStateRow = {
  id: number;
  payload: Partial<Record<SiteContentKey, unknown>>;
};

const SITE_CONTENT_ROW_ID = 1;

const cloneValue = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export const fallbackSiteContent: SiteContentMap = {
  home_events: homeLiveEvents,
  impact_metrics: homeImpactMetrics,
  impact_countries: homeImpactCountries,
  kits: kitCatalog,
  workshops: [],
  supporters: partnerLogos,
  team_members: teamMembers,
};

export const siteContentLabels: Record<SiteContentKey, string> = {
  home_events: "Home events",
  impact_metrics: "Impact metrics",
  impact_countries: "World map",
  kits: "Kits",
  workshops: "Workshops",
  supporters: "Supporters",
  team_members: "Team members",
};

export const getFallbackSiteContent = <K extends SiteContentKey>(key: K): SiteContentMap[K] =>
  cloneValue(fallbackSiteContent[key]);

export const normalizeSiteContent = <K extends SiteContentKey>(
  key: K,
  payload: unknown,
): SiteContentMap[K] => {
  if (!Array.isArray(payload)) {
    return getFallbackSiteContent(key);
  }

  return payload as SiteContentMap[K];
};

const normalizeSiteContentState = (
  payload: Partial<Record<SiteContentKey, unknown>> | null | undefined,
): SiteContentMap => {
  const nextContent = cloneValue(fallbackSiteContent);

  if (!payload) {
    return nextContent;
  }

  (Object.keys(fallbackSiteContent) as SiteContentKey[]).forEach((key) => {
    nextContent[key] = normalizeSiteContent(key, payload[key]);
  });

  return nextContent;
};

export const fetchSiteContent = async <K extends SiteContentKey>(
  key: K,
): Promise<SiteContentMap[K]> => {
  if (!supabase || !isSupabaseConfigured) {
    return getFallbackSiteContent(key);
  }

  const { data, error } = await supabase
    .from("site_content_state")
    .select("id, payload")
    .eq("id", SITE_CONTENT_ROW_ID)
    .maybeSingle<SiteContentStateRow>();

  if (error || !data) {
    return getFallbackSiteContent(key);
  }

  return normalizeSiteContent(key, data.payload?.[key]);
};

export const fetchAllSiteContent = async (): Promise<SiteContentMap> => {
  if (!supabase || !isSupabaseConfigured) {
    return cloneValue(fallbackSiteContent);
  }

  const { data, error } = await supabase
    .from("site_content_state")
    .select("id, payload")
    .eq("id", SITE_CONTENT_ROW_ID)
    .maybeSingle<SiteContentStateRow>();

  if (error || !data) {
    return cloneValue(fallbackSiteContent);
  }

  return normalizeSiteContentState(data.payload);
};

export const saveSiteContent = async <K extends SiteContentKey>(
  key: K,
  payload: SiteContentMap[K],
): Promise<void> => {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }

  const currentContent = await fetchAllSiteContent();
  const nextPayload = {
    ...currentContent,
    [key]: payload,
  };

  const { error } = await supabase.from("site_content_state").upsert(
    {
      id: SITE_CONTENT_ROW_ID,
      payload: nextPayload,
    },
    { onConflict: "id" },
  );

  if (error) {
    throw error;
  }
};

export const uploadSiteAsset = async (file: File, folder: string): Promise<string> => {
  if (!supabase || !isSupabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }

  const safeFolder = folder.replace(/[^a-z0-9/-]/gi, "-").toLowerCase();
  const fileExt = file.name.split(".").pop() || "png";
  const filePath = `${safeFolder}/${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("site-assets")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from("site-assets").getPublicUrl(filePath);
  return data.publicUrl;
};

export const useSiteContentQuery = <K extends SiteContentKey>(key: K) =>
  useQuery({
    queryKey: ["site-content", key],
    queryFn: () => fetchSiteContent(key),
    initialData: getFallbackSiteContent(key),
  });

export const useAllSiteContentQuery = () =>
  useQuery({
    queryKey: ["site-content", "all"],
    queryFn: fetchAllSiteContent,
    initialData: cloneValue(fallbackSiteContent),
  });
