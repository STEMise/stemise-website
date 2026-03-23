import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HeroShapes from "@/components/HeroShapes";
import { Button } from "@/components/ui/button";
import {
  curriculumThemeClasses,
  type CurriculumAgeGroupContent,
  type CurriculumPage,
} from "@/lib/curriculum-content";

type CurriculumReaderProps = {
  curriculum: CurriculumPage;
  ageGroup: CurriculumAgeGroupContent;
  previewMode?: boolean;
};

const CurriculumReader = ({
  curriculum,
  ageGroup,
  previewMode = false,
}: CurriculumReaderProps) => {
  const [hasStartedReading, setHasStartedReading] = useState(previewMode);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const theme = curriculumThemeClasses[ageGroup.theme];
  const sections = curriculum.sections;

  useEffect(() => {
    setHasStartedReading(previewMode);
    setActiveSectionIndex(0);
  }, [curriculum, previewMode]);

  const activeSection = sections[activeSectionIndex];
  const progressPercent = useMemo(() => {
    if (sections.length === 0) return 0;
    return ((activeSectionIndex + 1) / sections.length) * 100;
  }, [activeSectionIndex, sections.length]);

  const startReading = () => {
    if (!sections.length) return;
    setHasStartedReading(true);
    setActiveSectionIndex(0);
  };

  if (!sections.length) {
    return (
      <div className={`play-card offset-card rounded-[2rem] p-8 ${theme.surface}`}>
        <h2 className="text-3xl font-semibold text-foreground">{curriculum.title}</h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          This curriculum has not been built yet. Add sections in admin mode to publish it.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {!hasStartedReading ? (
        <section className="relative overflow-hidden rounded-[2rem] border-2 border-foreground bg-white">
          <HeroShapes variant={theme.heroVariant} />
          <div className="container relative py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="display-title">{curriculum.title}</h1>
              <p className="lead mx-auto mt-6 max-w-3xl">{curriculum.subtitle}</p>
              {curriculum.heroImage ? (
                <div className={`hero-panel-enter offset-card mt-10 overflow-hidden rounded-[2rem] ${theme.surface}`}>
                  <img
                    src={curriculum.heroImage}
                    alt={curriculum.title}
                    className="h-[320px] w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="mt-8 flex justify-center">
                <Button type="button" onClick={startReading}>
                  {curriculum.startReadingLabel || "Start reading"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {hasStartedReading && activeSection ? (
        <section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className={`play-card offset-card rounded-[2rem] border-2 p-8 ${theme.surface}`}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between gap-4 text-sm font-medium text-muted-foreground">
                  <span>
                    Section {activeSectionIndex + 1} of {sections.length}
                  </span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/85">
                  <div
                    className="h-full rounded-full bg-foreground transition-[width] duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-semibold text-foreground">{activeSection.title}</h2>
                <p className="mt-4 text-lg leading-8 text-foreground/80">{activeSection.summary}</p>
              </div>

              <div className="space-y-5 text-base leading-8 text-foreground/80">
                {activeSection.paragraphs.map((paragraph, index) => (
                  <p key={`${activeSection.id}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>

              {activeSection.bullets.length ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {activeSection.bullets.map((bullet, index) => (
                    <div
                      key={`${activeSection.id}-bullet-${index}`}
                      className={`rounded-[1.4rem] border bg-white/85 px-4 py-3 text-sm leading-6 text-foreground ${theme.outline}`}
                    >
                      {bullet}
                    </div>
                  ))}
                </div>
              ) : null}

              {activeSection.calloutTitle || activeSection.calloutBody ? (
                <div className="rounded-[1.6rem] bg-white/85 p-6">
                  {activeSection.calloutTitle ? (
                    <div className="text-lg font-semibold text-foreground">{activeSection.calloutTitle}</div>
                  ) : null}
                  {activeSection.calloutBody ? (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeSection.calloutBody}</p>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  disabled={activeSectionIndex === 0}
                  onClick={() => setActiveSectionIndex((current) => Math.max(0, current - 1))}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous page
                </Button>
                <Button
                  type="button"
                  disabled={activeSectionIndex >= sections.length - 1}
                  onClick={() =>
                    setActiveSectionIndex((current) => Math.min(sections.length - 1, current + 1))
                  }
                >
                  Next page
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:h-fit">
            <div className="hero-panel-enter offset-card rounded-[2rem] bg-white p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Bookmarks
              </div>
              <div className="mt-4 space-y-2">
                {sections.map((section, index) => {
                  const isActive = index === activeSectionIndex;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => {
                        setHasStartedReading(true);
                        setActiveSectionIndex(index);
                      }}
                      className={`block w-full rounded-[1.4rem] border px-4 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? `${theme.panel}`
                          : `bg-secondary/40 text-foreground hover:bg-secondary ${theme.softOutline}`
                      }`}
                    >
                      {section.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>
      ) : null}
    </div>
  );
};

export default CurriculumReader;
