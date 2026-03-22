import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  GraduationCap,
  Layers3,
  Timer,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroShapes from "@/components/HeroShapes";
import CurriculumQuiz from "@/components/CurriculumQuiz";
import { Button } from "@/components/ui/button";
import {
  curriculumThemeClasses,
  getCurriculumAgeSlug,
  getCurriculumBySlug,
} from "@/lib/curriculum-data";

const CurriculumDetail = () => {
  const { slug } = useParams();
  const curriculum = slug ? getCurriculumBySlug(slug) : undefined;

  if (!curriculum) {
    return <Navigate to="/curriculum" replace />;
  }

  const theme = curriculumThemeClasses[curriculum.theme];
  const ageSlug = getCurriculumAgeSlug(curriculum.ageBand);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={curriculum.title}
        description={curriculum.summary}
        pathname={`/curriculum/${curriculum.slug}`}
      />
      <Header />
      <main>
        <section className="relative overflow-hidden border-b-2 border-foreground bg-white">
          <HeroShapes variant={theme.heroVariant} />
          <div className="container relative py-14 md:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
              <div className="page-hero-copy max-w-3xl">
                <span className="eyebrow">{curriculum.ageBand}</span>
                <h1 className="display-title mt-6">{curriculum.title}</h1>
                <p className="lead mt-6 max-w-2xl">{curriculum.overview}</p>

                <div className="stagger-grid mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className={`play-card offset-card rounded-[1.4rem] p-4 ${theme.panel}`}>
                    <div className="icon-bob mb-2 inline-flex rounded-full bg-white/80 p-2 text-foreground">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-semibold">{curriculum.ages}</div>
                    <div className="mt-1 text-xs opacity-80">{curriculum.difficulty}</div>
                  </div>
                  <div className={`play-card offset-card rounded-[1.4rem] p-4 ${theme.panel}`}>
                    <div className="icon-bob mb-2 inline-flex rounded-full bg-white/80 p-2 text-foreground">
                      <Timer className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-semibold">{curriculum.readingTime}</div>
                    <div className="mt-1 text-xs opacity-80">Approximate pace</div>
                  </div>
                  <div className={`play-card offset-card rounded-[1.4rem] p-4 ${theme.panel}`}>
                    <div className="icon-bob mb-2 inline-flex rounded-full bg-white/80 p-2 text-foreground">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-semibold">{curriculum.author}</div>
                    <div className="mt-1 text-xs opacity-80">Curriculum author</div>
                  </div>
                  <div className={`play-card offset-card rounded-[1.4rem] p-4 ${theme.panel}`}>
                    <div className="icon-bob mb-2 inline-flex rounded-full bg-white/80 p-2 text-foreground">
                      <Layers3 className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-semibold">{curriculum.educationDirector}</div>
                    <div className="mt-1 text-xs opacity-80">Education director</div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild>
                    <a href="#curriculum-main">Start reading</a>
                  </Button>
                </div>
              </div>

              <div className={`hero-panel-enter offset-card overflow-hidden rounded-[2rem] ${theme.surface}`}>
                <img
                  src={curriculum.heroImage}
                  alt={curriculum.title}
                  className="h-[320px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="curriculum-main" className="section-shell bg-white">
          <div className="container">
            <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="stagger-stack space-y-8">
                {curriculum.sections.map((section, index) => (
                  <article
                    id={section.id}
                    key={section.id}
                    className={`play-card offset-card rounded-[2rem] border-2 p-8 ${theme.surface}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`icon-bob inline-flex rounded-full p-3 ${theme.badge}`}>
                        <Bookmark className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Section {index + 1}
                        </div>
                        <h2 className="mt-2 text-3xl font-semibold text-foreground">
                          {section.title}
                        </h2>
                        <p className="mt-3 text-base leading-7 text-foreground/80">
                          {section.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4 text-base leading-8 text-foreground/80">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {section.bullets?.length ? (
                      <div className="mt-6 grid gap-3 md:grid-cols-2">
                        {section.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className={`rounded-2xl border bg-white/80 px-4 py-3 text-sm text-foreground ${theme.outline}`}
                          >
                            {bullet}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {section.tips?.length ? (
                      <div className="mt-6 rounded-[1.5rem] bg-white/80 p-5">
                        <div className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Quick prompts
                        </div>
                        <div className="mt-3 space-y-2 text-sm text-foreground/80">
                          {section.tips.map((tip) => (
                            <p key={tip}>{tip}</p>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                      {index > 0 ? (
                        <Button variant="outline" asChild>
                          <a href={`#${curriculum.sections[index - 1].id}`}>
                            <ArrowLeft className="h-4 w-4" />
                            Previous section
                          </a>
                        </Button>
                      ) : (
                        <div />
                      )}
                      {index < curriculum.sections.length - 1 ? (
                        <Button asChild>
                          <a href={`#${curriculum.sections[index + 1].id}`}>
                            Next section
                            <ArrowRight className="h-4 w-4" />
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </article>
                ))}

                <section id="assignments" className={`play-card offset-card rounded-[2rem] p-8 ${theme.surface}`}>
                  <div className="flex items-center gap-3">
                    <div className={`icon-bob inline-flex rounded-full p-3 ${theme.badge}`}>
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h2 className="text-3xl font-semibold text-foreground">Assignment ideas</h2>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {curriculum.assignments.map((assignment) => (
                      <div
                        key={assignment}
                        className={`rounded-[1.4rem] border bg-white/85 p-5 text-sm leading-6 text-foreground/80 ${theme.outline}`}
                      >
                        {assignment}
                      </div>
                    ))}
                  </div>
                </section>

                <section id="self-check" className={`play-card offset-card rounded-[2rem] p-8 ${theme.surface}`}>
                  <div className="flex items-center gap-3">
                    <div className={`icon-bob inline-flex rounded-full p-3 ${theme.badge}`}>
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-semibold text-foreground">Final self-evaluation</h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Answers stay on the page and do not get sent to STEMise.
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <CurriculumQuiz questions={curriculum.quiz} accentClass={theme.badge} />
                  </div>
                </section>
              </div>

              <aside className="space-y-6 xl:sticky xl:top-24 xl:h-fit">
                <div className="hero-panel-enter offset-card rounded-[2rem] bg-white p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Bookmarks
                  </div>
                  <div className="mt-4 space-y-2">
                    {curriculum.sections
                      .filter((section) => curriculum.sectionIdsForBookmarks.includes(section.id))
                      .map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className={`block rounded-2xl border bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary ${theme.outline}`}
                        >
                          {section.title}
                        </a>
                      ))}
                    <a
                      href="#assignments"
                      className={`block rounded-2xl border bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary ${theme.outline}`}
                    >
                      Assignment ideas
                    </a>
                    <a
                      href="#self-check"
                      className={`block rounded-2xl border bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary ${theme.outline}`}
                    >
                      Self-evaluation
                    </a>
                  </div>
                </div>

                {curriculum.relatedKitHref && curriculum.relatedKitLabel ? (
                  <div className={`play-card offset-card rounded-[2rem] p-6 ${theme.surface}`}>
                    <div className="text-sm font-semibold text-foreground">Related kit path</div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      This curriculum can connect directly to a matching kit or hands-on activity.
                    </p>
                    <Button variant="outline" asChild className="mt-4 w-full">
                      <Link to={curriculum.relatedKitHref}>{curriculum.relatedKitLabel}</Link>
                    </Button>
                  </div>
                ) : null}

                <Button variant="outline" asChild className="w-full">
                  <Link to={`/curriculum/age/${ageSlug}`}>
                    <ArrowLeft className="h-4 w-4" />
                    Back to age path
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

export default CurriculumDetail;
