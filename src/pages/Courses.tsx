import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroShapes from "@/components/HeroShapes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteContentQuery } from "@/lib/site-content";
import { curriculumAgeGroups, curriculumThemeClasses } from "@/lib/curriculum-data";
import { workshopHighlights } from "@/lib/site-data";

const Courses = () => {
  const { data: workshops, isLoading: isLoadingWorkshops } = useSiteContentQuery("workshops");

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Curriculum"
        description="Choose an age path and open STEMise curriculum titles by age group."
        pathname="/curriculum"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden border-b-2 border-foreground bg-white">
          <HeroShapes variant="curriculum" />
          <div className="container relative py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="page-hero-copy mx-auto max-w-3xl text-center">
                <span className="eyebrow">Curriculum</span>
                <h1 className="display-title mt-6">Explore our curricula.</h1>
              </div>
            </div>
          </div>
        </section>

        <section id="age-paths" className="section-shell">
          <div className="container">
            <div className="section-intro section-intro-animate mx-auto text-center">
              <span className="eyebrow text-2xl font-semibold tracking-tight px-6 py-4 rounded-[2rem] md:text-4xl xl:text-[3.35rem]">
                Choose an age path
              </span>
            </div>

            <div className="stagger-grid mt-12 grid gap-6 lg:grid-cols-3">
              {curriculumAgeGroups.map((group) => {
                const theme = curriculumThemeClasses[group.theme];

                return (
                  <Link
                    key={group.slug}
                    to={`/curriculum/age/${group.slug}`}
                    className={`play-card offset-card flex min-h-[260px] flex-col justify-between rounded-[2.2rem] border-foreground p-8 ${theme.panel}`}
                  >
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] opacity-75">
                        Age path
                      </div>
                      <h3 className="mt-5 text-4xl font-semibold md:text-5xl">{group.ages}</h3>
                      <p className="mt-5 max-w-xs text-base leading-7 opacity-90">{group.description}</p>
                    </div>
                    <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]">
                      Open this path
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-shell">
          <div className="container">
            <div className="section-intro section-intro-animate mx-auto max-w-none text-center">
              <span className="eyebrow text-2xl font-semibold tracking-tight px-6 py-4 rounded-[2rem] md:text-4xl xl:text-[3.35rem]">
                Workshops
              </span>
            </div>

            <div className="stagger-grid mt-12 grid gap-6 lg:grid-cols-3">
              {workshopHighlights.map((item, index) => {
                const Icon = item.icon;
                const borderClass =
                  "border-foreground";

                return (
                  <div key={item.title} className={`play-card offset-card rounded-[1.8rem] bg-white p-8 ${borderClass}`}>
                    <div className="icon-bob inline-flex rounded-2xl bg-secondary p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-12">
              {isLoadingWorkshops ? (
                <Card className="rounded-[1.8rem] border-foreground bg-white">
                  <CardContent className="py-14 text-center text-muted-foreground">
                    Loading workshops...
                  </CardContent>
                </Card>
              ) : workshops.length > 0 ? (
                <div className="stagger-grid mt-0 grid gap-6 lg:grid-cols-3">
                  {workshops.map((workshop, index) => {
                    const borderClass =
                      "border-foreground";

                    return (
                      <article key={workshop.id} className={`play-card offset-card rounded-[1.8rem] bg-white p-6 ${borderClass}`}>
                        <h3 className="text-2xl font-semibold text-foreground">{workshop.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">{workshop.description}</p>
                        <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            {workshop.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-primary" />
                            {workshop.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            {workshop.location}
                          </div>
                        </div>
                        {workshop.registrationLink ? (
                          <Button asChild className="mt-5 w-full">
                            <a href={workshop.registrationLink} target="_blank" rel="noopener noreferrer">
                              Register
                            </a>
                          </Button>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              ) : (
                <Card className="rounded-[1.8rem] border-foreground bg-white">
                  <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
                    <p className="max-w-xl text-muted-foreground">
                      No workshops are listed right now. The curriculum structure is still ready to
                      connect to future sessions and class support.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/contact">Ask about workshops</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
