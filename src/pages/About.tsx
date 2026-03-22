import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroShapes from "@/components/HeroShapes";
import { useSiteContentQuery } from "@/lib/site-content";
import {
  aboutValues,
} from "@/lib/site-data";
import earthImage from "@/assets/earth.png";
import joinCommunity from "@/assets/join-community.jpg";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.6A5.4 5.4 0 1 1 6.6 12 5.4 5.4 0 0 1 12 6.6Zm0 1.8A3.6 3.6 0 1 0 15.6 12 3.6 3.6 0 0 0 12 8.4Z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M14.52 3c.2 1.68 1.14 3.25 2.56 4.22.96.66 2.08 1.02 3.24 1.05v2.8a8.07 8.07 0 0 1-3.98-1.05v5.1c0 4.08-3.3 7.38-7.38 7.38S1.6 19.2 1.6 15.12s3.3-7.38 7.38-7.38c.3 0 .6.02.9.06v2.86a4.53 4.53 0 0 0-.9-.1 4.56 4.56 0 1 0 4.56 4.56V3h2.98Z" />
  </svg>
);

const hasFounderBadge = (founder: boolean | undefined) => Boolean(founder);

const About = () => {
  const { data: supporters } = useSiteContentQuery("supporters");
  const { data: teamMembers } = useSiteContentQuery("team_members");

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="About"
        description="Learn about STEMise's mission, story, values, team, fiscal sponsorship, and global nonprofit impact."
        pathname="/about"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden border-b-2 border-foreground bg-white">
          <HeroShapes variant="about" />
          <div className="container relative py-16 md:py-24">
            <div className="page-hero-copy mx-auto max-w-4xl text-center">
              <span className="eyebrow">About STEMise</span>
              <h1 className="display-title mt-6">
                Built by students. Made for learning.
              </h1>
              <p className="lead mx-auto mt-6 max-w-3xl">
                Learn what STEMise is, why it exists, who is building it, and how the organization
                is trying to make STEM access feel more practical, open, and useful.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-20">
          <div className="container">
            <div className="stagger-grid grid gap-8 lg:grid-cols-2">
              <div className="play-card offset-card overflow-hidden rounded-[32px] bg-[#cfe0ff]">
                <img src={earthImage} alt="Global STEM access" className="h-48 w-full border-b-2 border-foreground object-cover" />
                <div className="p-8">
                <span className="eyebrow bg-white">Mission</span>
                <h2 className="mt-4 text-3xl font-semibold text-foreground">
                  Bring STEM to life for learners worldwide.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  STEMise is focused on making STEM education more accessible,
                  engaging, and practical through hands-on kits, age-based
                  curriculum, and supportive learning experiences.
                </p>
                </div>
              </div>
              <div className="play-card offset-card overflow-hidden rounded-[32px] bg-[#fff1e6]">
                <img src={joinCommunity} alt="Community and collaboration" className="h-48 w-full border-b-2 border-foreground object-cover" />
                <div className="p-8">
                <span className="eyebrow bg-white">Story</span>
                <h2 className="mt-4 text-3xl font-semibold text-foreground">
                  Built by students who wanted better access.
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  STEMise began with the belief that learners should be able to
                  build, experiment, and understand STEM through real interaction,
                  not only abstract classroom explanation.
                </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-14">
          <div className="container">
            <div className="section-intro section-intro-animate mx-auto text-center">
              <span className="eyebrow">Values</span>
              <h2 className="section-title">What matters to STEMise.</h2>
            </div>
            <div className="stagger-grid mt-12 grid gap-6 lg:grid-cols-4">
              {aboutValues.map((value, index) => {
                const Icon = value.icon;
                const style = index === 0 ? "panel-blue border-foreground" : index === 1 ? "panel-orange border-foreground" : index === 2 ? "panel-lime border-foreground" : "panel-blue border-foreground";
                return (
                  <div
                    key={value.title}
                    className={`play-card offset-card rounded-[28px] border-2 p-8 ${style}`}
                  >
                    <div className="icon-bob inline-flex rounded-2xl bg-white/85 p-3 text-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold">{value.title}</h3>
                    <p className="mt-4 text-sm leading-6 opacity-90">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-10 md:py-12">
          <div className="container">
            <div>
              <div className="section-intro mx-auto text-center">
                <span className="eyebrow">Partners</span>
                <h2 className="section-title mt-4">Trusted by supporters.</h2>
              </div>
              <div className="stagger-grid mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {supporters.map((logo) => (
                  <div
                    key={logo.id}
                    className="play-card offset-card flex min-h-[104px] items-center justify-center rounded-[24px] bg-white p-5"
                  >
                    {logo.href ? (
                      <a
                        href={logo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center"
                      >
                        <img src={logo.src} alt={logo.name} className="max-h-12 w-auto object-contain" />
                      </a>
                    ) : (
                      <img src={logo.src} alt={logo.name} className="max-h-12 w-auto object-contain" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pt-12 pb-20 md:pt-14 md:pb-24">
          <div className="container">
            <div className="section-intro section-intro-animate mx-auto text-center">
              <span className="eyebrow">Team</span>
              <h2 className="section-title">The people building STEMise.</h2>
            </div>
            <div className="stagger-grid mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {teamMembers.map((member) => (
                <article
                  key={member.name}
                  className="play-card offset-card relative rounded-[28px] bg-white p-6"
                >
                  {hasFounderBadge(member.founder) ? (
                    <span className="pointer-events-none absolute right-5 top-5 inline-flex rounded-full border-2 border-foreground bg-[#fff4a8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                      Founder
                    </span>
                  ) : null}
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-28 w-28 rounded-[22px] object-cover"
                  />
                  <h3 className="mt-5 text-2xl font-semibold text-foreground">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                    {member.title}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{member.bio}</p>
                  <div className="mt-5 flex items-center gap-3">
                    {member.socials.instagram ? (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-white p-2 text-foreground transition-colors hover:text-primary"
                        aria-label={`${member.name} Instagram`}
                      >
                        <InstagramIcon className="h-4 w-4" />
                      </a>
                    ) : null}
                    {member.socials.linkedin ? (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-white p-2 text-foreground transition-colors hover:text-primary"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedInIcon className="h-4 w-4" />
                      </a>
                    ) : null}
                    {member.socials.tiktok ? (
                      <a
                        href={member.socials.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-white p-2 text-foreground transition-colors hover:text-primary"
                        aria-label={`${member.name} TikTok`}
                      >
                        <TikTokIcon className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
