import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Layers3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroShapes from "@/components/HeroShapes";
import { Button } from "@/components/ui/button";
import {
  curriculumAgeGroups,
  curriculumThemeClasses,
  getCurriculumAgeGroupBySlug,
  getCurriculumEntriesByAgeSlug,
  type CurriculumAgeSlug,
} from "@/lib/curriculum-data";

const CurriculumAgeGroup = () => {
  const { ageGroup } = useParams();
  const currentGroup = ageGroup ? getCurriculumAgeGroupBySlug(ageGroup) : undefined;

  if (!currentGroup) {
    return <Navigate to="/curriculum" replace />;
  }

  const entries = getCurriculumEntriesByAgeSlug(currentGroup.slug as CurriculumAgeSlug);
  const theme = curriculumThemeClasses[currentGroup.theme];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${currentGroup.title} Curriculum`}
        description={`Browse STEMise curriculum titles for ${currentGroup.ages.toLowerCase()}.`}
        pathname={`/curriculum/age/${currentGroup.slug}`}
      />
      <Header />
      <main>
        <section className="relative overflow-hidden border-b-2 border-foreground bg-white">
          <HeroShapes variant={theme.heroVariant} />
          <div className="container relative py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
              <div className="page-hero-copy max-w-3xl">
                <span className="eyebrow">{currentGroup.ages}</span>
                <h1 className="display-title mt-6">{currentGroup.title}</h1>
                <p className="lead mt-6 max-w-2xl">{currentGroup.description}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <a href="#curriculum-titles">
                      View curriculum titles
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/curriculum">Back to age choices</Link>
                  </Button>
                </div>
              </div>

              <div className={`hero-panel-enter offset-card rounded-[2rem] p-6 md:p-8 ${theme.surface}`}>
                <div className="stagger-stack grid gap-4">
                  <div className={`play-card offset-card rounded-[1.6rem] p-5 ${theme.panel}`}>
                    <div className="icon-bob mb-3 inline-flex rounded-2xl bg-white/85 p-3 text-foreground">
                      <Layers3 className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold uppercase tracking-[0.14em] opacity-75">
                      Editable structure
                    </div>
                    <p className="mt-3 text-sm leading-6 opacity-90">
                      This page is intentionally lightweight so curriculum titles can be added,
                      removed, or reordered later in edit mode without redesigning the layout.
                    </p>
                  </div>

                <div className="play-card rounded-[1.6rem] border-2 border-black/10 bg-white/80 p-5">
                    <div className="text-sm font-semibold text-foreground">
                      {entries.length} curriculum {entries.length === 1 ? "title" : "titles"} in this path
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Choose a title below to open the full curriculum page.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="curriculum-titles" className="section-shell">
          <div className="container">
            <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <div className="section-intro section-intro-animate">
                  <span className="eyebrow">Curriculum titles</span>
                  <h2 className="section-title">Choose a curriculum.</h2>
                  <p className="section-copy">
                    This list stays text-first on purpose. It is easier to scan and easier to edit
                    later than a heavy card grid.
                  </p>
                </div>

                <div className="stagger-stack space-y-4">
                  {entries.map((entry, index) => (
                    <Link
                      key={entry.slug}
                      to={`/curriculum/${entry.slug}`}
                      className="play-card offset-card block rounded-[1.8rem] bg-white p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Curriculum {index + 1}
                          </div>
                          <h3 className="mt-2 text-2xl font-semibold text-foreground">{entry.title}</h3>
                        </div>
                        <ArrowRight className="mt-1 h-5 w-5 text-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <aside className="space-y-6 xl:sticky xl:top-24 xl:h-fit">
                <div className="hero-panel-enter offset-card rounded-[2rem] bg-white p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Age groups
                  </div>
                  <div className="mt-4 space-y-2">
                    {curriculumAgeGroups.map((group) => {
                      const groupTheme = curriculumThemeClasses[group.theme];
                      const isActive = group.slug === currentGroup.slug;

                      return (
                        <Link
                          key={group.slug}
                          to={`/curriculum/age/${group.slug}`}
                          className={`block rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? `${groupTheme.panel}`
                              : "border-border bg-secondary/45 text-foreground hover:bg-secondary"
                          }`}
                        >
                          {group.ages}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className={`play-card offset-card rounded-[2rem] p-6 ${theme.surface}`}>
                  <div className={`icon-bob inline-flex rounded-full p-3 text-foreground ${theme.badge}`}>
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="mt-4 text-sm font-semibold text-foreground">Curriculum list only</div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    The titles live here first. Full content stays one click deeper so this page can
                    remain clean and manageable.
                  </p>
                </div>

                <Button variant="outline" asChild className="w-full">
                  <Link to="/curriculum">
                    <ArrowLeft className="h-4 w-4" />
                    Back to age choices
                  </Link>
                </Button>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CurriculumAgeGroup;
