import { DealerRelationships } from "@/components/dealer-relationships";
import {mainPageSeo,  aboutHeroContent, companyLeadership, companyValues } from "@/lib/site-data";
import { CompanyTimeline } from "@/components/company-timeline";
import { createFileRoute } from "@tanstack/react-router";
import {
  Eye,
  Target,
  Boxes,
  Brain,
  Timer,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/page-sections";
import { pageHead, breadcrumbSchema } from "@/lib/seo";
import hero from "@/assets/factory-hero.jpg";
export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      mainPageSeo["/about"].title,
      mainPageSeo["/about"].description,
      "/about",
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ),
  component: About,
});
function About() {
  return (
    <>
      <PageHero
        kicker="Our journey"
        title={aboutHeroContent.title}
        description={aboutHeroContent.description}
        image={hero}
        compact
      />
      <section className="pattern-shared bg-muted py-20">
        <div className="site-container">
          <SectionHeading title="Our company values" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {companyValues.map(({ icon, title, description }) => {
              const Icon = { trust: ShieldCheck, speed: Timer, expertise: Brain, stock: Boxes }[icon];
              return (
                <article key={title} className="bg-background p-6">
                  <Icon className="text-primary" />
                  <h3 className="mt-4 text-xl font-black leading-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="pattern-shared py-20">
        <div className="site-container grid gap-6 md:grid-cols-2">
          <article className="border-t-4 border-primary bg-muted p-8">
            <Eye />
            <h2 className="mt-5 text-3xl font-black">Vision</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              To be India's most trusted single-source partner for power transmission, automation
              and industrial adhesive solutions.
            </p>
          </article>
          <article className="border-t-4 border-primary bg-muted p-8">
            <Target />
            <h2 className="mt-5 text-3xl font-black">Mission</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              To simplify industrial procurement with a wide product range, genuine brands,
              application support and fast response.
            </p>
          </article>
        </div>
      </section>
      <CompanyTimeline />
      <section
        className="pattern-shared content-surface py-12 text-foreground md:py-16"
        aria-label="Appreciation certificates"
      >
        <div className="site-container">
          <DealerRelationships appreciation />
        </div>
      </section>
      <section className="pattern-shared content-surface py-20 text-foreground">
        <div className="site-container">
          <SectionHeading
            eyebrow="Leadership"
            title="Founders with hands-on industrial experience"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {companyLeadership.map((member) => (
              <article key={member.name} className="border border-background/20 p-7">
                <div className="grid aspect-[4/3] place-items-center overflow-hidden bg-background/5">
                  {member.portrait ? (
                    <img
                      src={member.portrait.src}
                      alt={`${member.name}, ${member.role} at RB International Belting & Automation`}
                      width={member.portrait.width}
                      height={member.portrait.height}
                      loading="lazy"
                      className="h-full min-h-0 w-full object-cover object-top"
                    />
                  ) : (
                    <UserRound className="size-20 text-background/30" />
                  )}
                </div>
                <h3 className="mt-6 text-2xl font-black">{member.name}</h3>
                <p className="text-sm font-bold text-primary-soft">{member.role}</p>
                <p className="mt-4 leading-7 text-background/70">
                  {member.description} {member.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
