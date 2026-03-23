import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroShapes from "@/components/HeroShapes";
import { Button } from "@/components/ui/button";
import {
  curriculumThemeClasses,
  type CurriculumAgeGroupContent,
  type CurriculumPage,
} from "@/lib/curriculum-content";

type CurriculumAgeGroupViewProps = {
  ageGroup: CurriculumAgeGroupContent;
  pages: CurriculumPage[];
  previewMode?: boolean;
};

const CurriculumAgeGroupView = ({
  ageGroup,
  pages,
  previewMode = false,
}: CurriculumAgeGroupViewProps) => {
  const theme = curriculumThemeClasses[ageGroup.theme];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-foreground bg-white">
        <HeroShapes variant={theme.heroVariant} />
        <div className="container relative py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="display-title">{ageGroup.title}</h1>
            <p className="mt-4 text-lg font-semibold text-foreground">{ageGroup.ages}</p>
            <p className="lead mx-auto mt-6 max-w-3xl">{ageGroup.subtitle}</p>
            <div className="mt-8 flex justify-center">
              {previewMode ? (
                <Button type="button">{ageGroup.heroButtonLabel || "Browse curricula"}</Button>
              ) : (
                <Button asChild>
                  <a href="#curriculum-list">{ageGroup.heroButtonLabel || "Browse curricula"}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="curriculum-list" className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold text-foreground">Curricula in this path</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Open any curriculum below to start reading page by page.
            </p>
          </div>

          {pages.length ? (
            <div className="stagger-stack space-y-4">
              {pages.map((page) =>
                previewMode ? (
                  <div
                    key={page.slug}
                    className={`play-card offset-card block rounded-[1.8rem] border-2 p-6 ${theme.surface}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">{page.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{page.subtitle}</p>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 text-foreground" />
                    </div>
                  </div>
                ) : (
                  <Link
                    key={page.slug}
                    to={`/curriculum/${page.slug}`}
                    className={`play-card offset-card block rounded-[1.8rem] border-2 p-6 ${theme.surface}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">{page.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{page.subtitle}</p>
                      </div>
                      <ArrowRight className="mt-1 h-5 w-5 text-foreground" />
                    </div>
                  </Link>
                ),
              )}
            </div>
          ) : (
            <div className={`play-card offset-card rounded-[1.8rem] border-2 p-6 ${theme.surface}`}>
              <p className="text-base leading-7 text-muted-foreground">
                No curriculum pages are published in this path yet. Add one in admin mode.
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24 xl:h-fit">
          <div className={`play-card offset-card rounded-[2rem] p-6 ${theme.surface}`}>
            <h3 className="text-2xl font-semibold text-foreground">{ageGroup.resourcesTitle}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{ageGroup.resourcesDescription}</p>
            <div className="mt-5 space-y-3">
              {ageGroup.resources.length ? (
                ageGroup.resources.map((resource) =>
                  previewMode ? (
                    <div
                      key={resource.id}
                      className={`rounded-[1.4rem] border bg-white/85 px-4 py-4 ${theme.outline}`}
                    >
                      <div className="text-base font-semibold text-foreground">{resource.title}</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{resource.description}</p>
                      <div className="mt-4 text-sm font-medium text-foreground">{resource.linkLabel}</div>
                    </div>
                  ) : (
                    <a
                      key={resource.id}
                      href={resource.href}
                      target={resource.href.startsWith("http") ? "_blank" : undefined}
                      rel={resource.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`block rounded-[1.4rem] border bg-white/85 px-4 py-4 ${theme.outline}`}
                    >
                      <div className="text-base font-semibold text-foreground">{resource.title}</div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{resource.description}</p>
                      <div className="mt-4 text-sm font-medium text-foreground">{resource.linkLabel}</div>
                    </a>
                  ),
                )
              ) : (
                <div className={`rounded-[1.4rem] border bg-white/85 px-4 py-4 ${theme.outline}`}>
                  <p className="text-sm leading-6 text-muted-foreground">
                    No resources added yet for this age path.
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CurriculumAgeGroupView;
