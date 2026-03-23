export type CurriculumTheme = "blue" | "orange" | "green";

export type CurriculumAgeGroupSlug = "primary" | "middle-school" | "high-school";

export type CurriculumResource = {
  id: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

export type CurriculumAgeGroupContent = {
  slug: CurriculumAgeGroupSlug;
  title: string;
  ages: string;
  subtitle: string;
  heroButtonLabel: string;
  resourcesTitle: string;
  resourcesDescription: string;
  theme: CurriculumTheme;
  resources: CurriculumResource[];
};

export type CurriculumSectionPage = {
  id: string;
  title: string;
  summary: string;
  paragraphs: string[];
  bullets: string[];
  calloutTitle?: string;
  calloutBody?: string;
};

export type CurriculumPage = {
  slug: string;
  ageGroupSlug: CurriculumAgeGroupSlug;
  title: string;
  subtitle: string;
  heroImage: string;
  startReadingLabel: string;
  sections: CurriculumSectionPage[];
};

export const curriculumThemeClasses: Record<
  CurriculumTheme,
  {
    surface: string;
    panel: string;
    badge: string;
    outline: string;
    softOutline: string;
    heroVariant: "curriculum-blue" | "curriculum-orange" | "curriculum-green";
  }
> = {
  blue: {
    surface: "bg-[#edf4ff] border-foreground",
    panel: "panel-blue border-[#6d97f5]",
    badge: "bg-[#cfe0ff] text-[#17305e]",
    outline: "border-[#6d97f5]",
    softOutline: "border-[#c7d7fb]",
    heroVariant: "curriculum-blue",
  },
  orange: {
    surface: "bg-[#fff0e3] border-foreground",
    panel: "panel-orange border-[#f39b56]",
    badge: "bg-[#ffd3af] text-[#643216]",
    outline: "border-[#f39b56]",
    softOutline: "border-[#ffd7bc]",
    heroVariant: "curriculum-orange",
  },
  green: {
    surface: "bg-[#eef8dc] border-foreground",
    panel: "panel-lime border-[#8fc457]",
    badge: "bg-[#d2eaa2] text-[#304214]",
    outline: "border-[#8fc457]",
    softOutline: "border-[#cde6ab]",
    heroVariant: "curriculum-green",
  },
};

export const curriculumAgeGroupsFallback: CurriculumAgeGroupContent[] = [
  {
    slug: "primary",
    title: "Primary learners",
    ages: "Ages 6-10",
    subtitle:
      "Playful, visual, and structured learning paths for younger students who need clarity, rhythm, and confidence-building.",
    heroButtonLabel: "Browse primary curricula",
    resourcesTitle: "Resources",
    resourcesDescription:
      "Add reading guides, worksheets, printable supports, or external references for this age path.",
    theme: "orange",
    resources: [],
  },
  {
    slug: "middle-school",
    title: "Middle school learners",
    ages: "Ages 11-13",
    subtitle:
      "Stronger project structure, clearer independent tasks, and room for students to explore bigger ideas with guidance.",
    heroButtonLabel: "Browse middle school curricula",
    resourcesTitle: "Resources",
    resourcesDescription:
      "Add reading guides, worksheets, printable supports, or external references for this age path.",
    theme: "green",
    resources: [],
  },
  {
    slug: "high-school",
    title: "High school learners",
    ages: "Ages 14-18",
    subtitle:
      "Longer-form, academic, and more technical curriculum pages for older students who want depth and independent reading.",
    heroButtonLabel: "Browse high school curricula",
    resourcesTitle: "Resources",
    resourcesDescription:
      "Add reading guides, worksheets, printable supports, or external references for this age path.",
    theme: "blue",
    resources: [],
  },
];

export const curriculumPagesFallback: CurriculumPage[] = [];

export const getCurriculumAgeGroupBySlug = (
  ageGroups: CurriculumAgeGroupContent[],
  slug: string,
) => ageGroups.find((group) => group.slug === slug);

export const getCurriculumPagesByAgeGroup = (
  pages: CurriculumPage[],
  ageGroupSlug: string,
) => pages.filter((page) => page.ageGroupSlug === ageGroupSlug);
