import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroShapes from "@/components/HeroShapes";
import HomeImpactSection from "@/components/HomeImpactSection";
import { Button } from "@/components/ui/button";
import stemKitsShowcase from "@/assets/stem-kits-showcase.jpg";
import learningImage from "@/assets/learning.jpg";
import { useSiteContentQuery } from "@/lib/site-content";
import {
  externalLinks,
  fiscalSponsor,
  homeServices,
  type EventSponsor,
  type HomeEvent,
} from "@/lib/site-data";

const serviceStyles = [
  "bg-[#dce8ff]",
  "bg-[#ffdcc2]",
  "bg-[#ddf1b8]",
];

const eventAccentStyles: Record<NonNullable<HomeEvent["accentTheme"]>, string> = {
  blue: "panel-blue border-foreground",
  orange: "panel-orange border-foreground",
  lime: "panel-lime border-foreground",
  ink: "panel-ink border-foreground",
};

const SponsorCarousel = ({
  sponsors,
  accentTheme,
}: {
  sponsors: EventSponsor[];
  accentTheme: NonNullable<HomeEvent["accentTheme"]>;
}) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef<{
    isDragging: boolean;
    startX: number;
    startScrollLeft: number;
  }>({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  if (!sponsors.length) return null;

  const chipClass = accentTheme === "ink" ? "bg-white text-foreground" : "bg-white/88 text-foreground";

  const scrollByAmount = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = Math.min(280, Math.max(220, track.clientWidth * 0.42));
    track.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    };
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDragging) return;

    const deltaX = event.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.startScrollLeft - deltaX;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    dragState.current.isDragging = false;
    setIsDragging(false);
    if (track?.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="mt-8 border-t-2 border-foreground/15 pt-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">
          Sponsors
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-white text-foreground transition-transform hover:-translate-x-0.5"
            aria-label="Previous sponsors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-white text-foreground transition-transform hover:translate-x-0.5"
            aria-label="Next sponsors"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-[1.6rem] border-2 border-foreground bg-white/30 p-3">
        <div
          ref={trackRef}
          className={`flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={(event) => {
            if (dragState.current.isDragging) {
              endDrag(event);
            }
          }}
        >
          {sponsors.map((sponsor) => {
            const content = (
              <div
                className={`impact-belt-chip min-h-[88px] min-w-[220px] snap-start justify-center gap-3 rounded-[1.4rem] px-5 py-4 md:min-w-[250px] ${chipClass}`}
              >
                {sponsor.logo ? (
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-10 max-w-[130px] object-contain"
                    draggable={false}
                  />
                ) : null}
                <span className="text-sm font-semibold">{sponsor.name}</span>
              </div>
            );

            return sponsor.href ? (
              <a
                key={sponsor.id}
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
                draggable={false}
              >
                {content}
              </a>
            ) : (
              <div key={sponsor.id} className="shrink-0" draggable={false}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const EventCard = ({
  event,
}: {
  event: HomeEvent;
}) => {
  const eventImage = event.image ?? stemKitsShowcase;
  const accentTheme = event.accentTheme ?? "blue";
  const toneClass = eventAccentStyles[accentTheme];

  return (
    <article className={`play-card offset-card overflow-hidden rounded-[2.3rem] ${toneClass}`}>
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1.15fr)_420px]">
        <div className="p-7 md:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border-2 border-foreground bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
              {event.status}
            </span>
            <span className="rounded-full border-2 border-foreground bg-white px-3 py-1 text-xs font-semibold text-foreground">
              {event.date}
            </span>
            <span className="rounded-full border-2 border-foreground bg-white px-3 py-1 text-xs font-semibold text-foreground">
              {event.location}
            </span>
          </div>

          <div className="mt-6 max-w-3xl">
            <h3 className="text-4xl font-semibold md:text-5xl">{event.title}</h3>
            <p className="mt-5 text-base leading-8 opacity-90 md:text-lg">
              {event.description}
            </p>
            {event.href && event.hrefLabel ? (
              <Button variant="outline" asChild className="mt-7 w-fit bg-white">
                <Link to={event.href}>{event.hrefLabel}</Link>
              </Button>
            ) : null}
          </div>

          <SponsorCarousel sponsors={event.sponsors ?? []} accentTheme={accentTheme} />
        </div>

        <div className="border-t-2 border-foreground xl:border-l-2 xl:border-t-0">
          <div className="h-full min-h-[280px] overflow-hidden bg-white xl:min-h-[100%]">
            <img
              src={eventImage}
              alt={event.imageAlt ?? event.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

const DiscordGlyph = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-8 w-8"
    fill="currentColor"
  >
    <path d="M20.317 4.369A19.791 19.791 0 0 0 15.43 3a13.92 13.92 0 0 0-.624 1.279 18.27 18.27 0 0 0-5.612 0A13.92 13.92 0 0 0 8.57 3a19.736 19.736 0 0 0-4.89 1.37C.59 9.04-.243 13.593.174 18.083a19.956 19.956 0 0 0 5.993 3.034 14.363 14.363 0 0 0 1.283-2.083 12.97 12.97 0 0 1-2.02-.977c.17-.123.336-.252.497-.387 3.894 1.83 8.119 1.83 11.966 0 .162.135.328.264.498.387-.644.383-1.321.71-2.022.978.375.733.803 1.427 1.281 2.082a19.913 19.913 0 0 0 5.996-3.034c.489-5.208-.836-9.72-3.329-13.714ZM8.35 15.36c-1.166 0-2.123-1.07-2.123-2.384 0-1.314.937-2.385 2.123-2.385 1.197 0 2.144 1.08 2.123 2.385 0 1.314-.936 2.384-2.123 2.384Zm7.3 0c-1.167 0-2.123-1.07-2.123-2.384 0-1.314.937-2.385 2.123-2.385 1.197 0 2.144 1.08 2.123 2.385 0 1.314-.926 2.384-2.123 2.384Z" />
  </svg>
);

const Index = () => {
  const { data: liveEvents } = useSiteContentQuery("home_events");

  return (
    <div className="min-h-screen bg-background">
      <Seo pathname="/" />
      <Header />
      <main className="overflow-hidden">
        <section className="relative overflow-hidden bg-white">
          <HeroShapes variant="home" />
          <div className="container relative pt-16 pb-16 md:pt-23 md:pb-20">
            <div className="page-hero-copy mx-auto max-w-3xl text-center">
                <span className="eyebrow">International youth-led nonprofit</span>
                <h1 className="display-title mx-auto mt-6 max-w-2xl">
                  Build, play, and discover STEM for real.
                </h1>
                <p className="lead mx-auto mt-5 max-w-lg">
                  Free kits, simple curriculum, and fun workshops for children,
                  teens, and the adults helping them learn.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button size="lg" asChild>
                    <Link to="/kits">
                      Get STEM kits <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/curriculum">See curriculum</Link>
                  </Button>
                </div>
                <div className="offset-card mx-auto mt-6 max-w-xl rounded-[1.6rem] border-foreground bg-[#fff4a8] p-4 text-sm text-foreground">
                  <strong>{fiscalSponsor.status}:</strong> STEMise is fiscally sponsored by{" "}
                  {fiscalSponsor.name}.
                </div>
                <a
                  href={externalLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the STEMise Discord server"
                  className="mt-4 inline-flex text-foreground transition-opacity hover:opacity-70"
                >
                  <DiscordGlyph />
                </a>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-foreground bg-white">
          <div className="container py-8 md:py-10">
            <div
              data-scroll-reveal
              className="stagger-grid grid gap-4 xl:grid-cols-[1.14fr_1fr_1.08fr]"
            >
              {homeServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="play-card flex h-full items-center gap-5 rounded-[1.8rem] border-2 border-foreground bg-white p-5 md:min-h-[168px] md:p-6"
                  >
                    <div
                      className={`icon-bob inline-flex shrink-0 rounded-[1.4rem] p-4 text-foreground ${serviceStyles[index]}`}
                    >
                      <Icon className="h-9 w-9 md:h-10 md:w-10" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-semibold md:text-2xl">{service.title}</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-6 opacity-90 md:text-base">
                        {service.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <HomeImpactSection />

        <section className="section-shell bg-white">
          <div className="container">
            <div className="section-intro section-intro-animate mx-auto text-center">
              <div>
                <span className="eyebrow">Open now</span>
                <h2 className="section-title">Current STEMise events.</h2>
                <p className="section-copy">
                  See what STEMise is actively running right now, from open kit windows to current
                  sessions and upcoming community activity.
                </p>
              </div>
            </div>

            <div data-scroll-reveal className="stagger-stack mt-12 space-y-7">
              {liveEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell border-y-2 border-foreground bg-[#fff8f2]">
          <div className="container">
            <div className="section-intro section-intro-animate mx-auto max-w-none text-center">
              <span className="eyebrow text-2xl font-semibold tracking-tight px-6 py-4 rounded-[2rem] md:text-4xl xl:text-[3.35rem]">
                Pick a path
              </span>
            </div>
            <div className="stagger-grid mt-12 grid gap-6 lg:grid-cols-2">
              <div className="play-card offset-card panel-blue overflow-hidden rounded-[2rem] border-foreground">
                <img
                  src={stemKitsShowcase}
                  alt="STEM kits and components"
                  className="h-[240px] w-full border-b-2 border-foreground object-cover"
                />
                <div className="p-7">
                  <span className="rounded-full border-2 border-foreground bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                    STEM kits
                  </span>
                  <h2 className="mt-4 text-3xl font-semibold">Request free kits.</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 opacity-85">
                    Pick a kit, check availability, and send one simple request.
                  </p>
                  <Button variant="outline" asChild className="mt-6">
                    <Link to="/kits">View kits</Link>
                  </Button>
                </div>
              </div>

              <div className="play-card offset-card panel-orange overflow-hidden rounded-[2rem] border-foreground">
                <img
                  src={learningImage}
                  alt="Learning by age and topic"
                  className="h-[240px] w-full border-b-2 border-foreground object-cover"
                />
                <div className="p-7">
                  <span className="rounded-full border-2 border-foreground bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                    Curriculum
                  </span>
                  <h2 className="mt-4 text-3xl font-semibold">Learn by age and topic.</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 opacity-85">
                    Short, visual learning paths for younger kids and teens.
                  </p>
                  <Button variant="outline" asChild className="mt-6">
                    <Link to="/curriculum">Explore curriculum</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell bg-white">
          <div className="container">
            <div
              data-scroll-reveal
              className="hero-panel-enter offset-card overflow-hidden rounded-[2.25rem] bg-[#dde9ff] p-6 text-center md:p-8"
            >
              <div className="mx-auto max-w-2xl">
                <span className="eyebrow">Get involved</span>
                <h2 className="section-title mt-4">Help more kids learn STEM.</h2>
                <p className="section-copy mt-4">
                  Volunteer, donate, or support the mission through one clear page.
                </p>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button size="lg" asChild>
                    <Link to="/get-involved">Get involved</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={externalLinks.donate} target="_blank" rel="noopener noreferrer">
                      Donate
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
