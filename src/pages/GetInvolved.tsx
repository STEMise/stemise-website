import { ArrowRight, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import HeroShapes from "@/components/HeroShapes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { externalLinks, fiscalSponsor } from "@/lib/site-data";
import atomImage from "@/assets/atom.png";
import chemistryImage from "@/assets/chemistry.png";

const actionCards = [
  {
    title: "Become a volunteer",
    description:
      "Join the youth-led work behind operations, outreach, curriculum, design, and execution.",
    href: externalLinks.volunteer,
    label: "Apply to volunteer",
  },
  {
    title: "Donate",
    description:
      "Support kits, curriculum, and nonprofit operations through STEMise's fiscal sponsor.",
    href: externalLinks.donate,
    label: "Donate through Hack Club",
  },
  {
    title: "Partner with STEMise",
    description:
      "Collaborate on programs, sponsorship, or educational initiatives that expand STEM.",
    href: "/contact",
    label: "Start a partnership",
  },
];

const actionImages = [atomImage, "", chemistryImage];
const actionStyles = [
  "panel-lime border-foreground",
  "panel-orange border-foreground",
  "panel-blue border-foreground",
];

const GetInvolved = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Get Involved"
        description="Volunteer, donate, or start a partnership with STEMise through one clear nonprofit action page."
        pathname="/get-involved"
      />
      <Header />
      <main>
        <section className="relative overflow-hidden border-b-2 border-foreground bg-white">
          <HeroShapes variant="get-involved" />
          <div className="container relative py-16 md:py-24">
            <div className="page-hero-copy mx-auto max-w-2xl text-center">
                <span className="eyebrow">Get involved</span>
                <h1 className="display-title mt-6">Pick how you want to help.</h1>
            </div>
          </div>
        </section>

        <section className="section-shell bg-white">
          <div className="container">
            <div className="stagger-grid grid gap-6 xl:grid-cols-3">
              {actionCards.map((card, index) => {
                const isExternal = card.href.startsWith("http");
                const isDonateCard = card.title === "Donate";
                return (
                  <Card
                    key={card.title}
                    className={`play-card offset-card rounded-[2rem] border-2 border-foreground ${
                      isDonateCard
                        ? "relative overflow-visible bg-[#ec3750] pt-32 text-white"
                        : `relative overflow-visible bg-white pt-36 ${actionStyles[index]}`
                    }`}
                  >
                    {isDonateCard ? (
                      <div className="pointer-events-none absolute inset-x-0 -top-10 flex items-center justify-center">
                        <img
                          src={fiscalSponsor.logo}
                          alt="Hack Club"
                          className="h-44 w-auto object-contain"
                        />
                      </div>
                    ) : (
                      <div className="pointer-events-none absolute inset-x-0 -top-8 flex items-center justify-center">
                        <img
                          src={actionImages[index]}
                          alt={card.title}
                          className="h-40 w-auto object-contain"
                        />
                      </div>
                    )}
                    <CardHeader className={isDonateCard ? "items-center px-7 pb-3 text-center" : "px-7 pb-3 text-center"}>
                      <CardTitle className={`text-2xl ${isDonateCard ? "text-white" : ""}`}>
                        {card.title}
                      </CardTitle>
                      <CardDescription
                        className={`text-sm leading-6 ${
                          isDonateCard ? "text-white/88" : "opacity-90"
                        }`}
                      >
                        {card.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className={isDonateCard ? "flex justify-center px-7 pb-6 pt-0" : "px-7 pb-6 pt-0"}>
                      <Button
                        asChild
                        className={`${
                          isDonateCard
                            ? "bg-white text-[#ec3750] hover:bg-white/94"
                            : ""
                        } ${isDonateCard ? "w-full max-w-[18rem]" : "w-full"}`}
                      >
                        <a
                          href={card.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                        >
                          {card.label}
                          {isExternal ? (
                            <ExternalLink className="h-4 w-4" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolved;
