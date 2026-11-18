import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { industries, industryCoverage, industryProductLinks } from "@/lib/site-data";
import { SectionHeading } from "@/components/page-sections";

export function IndustryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndustry = industries[activeIndex] ?? industries[0];

  return (
    <section id="industry-coverage" aria-label={industryCoverage.eyebrow} className="pattern-shared pb-20 pt-6">
      <div className="site-container">
        <SectionHeading wide eyebrow={industryCoverage.eyebrow} title={industryCoverage.title} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
          <div className="min-w-0">
            <p className="mb-3 text-sm leading-6 text-muted-foreground">{industryCoverage.instruction}</p>
            <div role="group" aria-label="Choose an industry" className="border-y border-border">
              {industries.map((industry, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={industry.name}
                    type="button"
                    aria-pressed={active}
                    aria-controls="industry-preview"
                    onClick={() => setActiveIndex(index)}
                    className={`flex min-h-12 w-full items-center gap-3 border-b border-l-4 px-3 py-3 text-left text-sm transition-colors last:border-b-0 focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-base ${active ? "border-l-primary bg-primary/5 font-bold text-primary" : "border-l-transparent font-semibold text-foreground hover:bg-muted hover:text-primary"}`}
                  >
                    <span className={`shrink-0 text-xs tabular-nums ${active ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1">{industry.name}</span>
                    <ArrowUpRight className={`size-4 shrink-0 ${active ? "opacity-100" : "opacity-35"}`} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
          <figure id="industry-preview" aria-labelledby="industry-preview-title" className="relative min-w-0 overflow-hidden bg-foreground text-background">
            <img src={activeIndustry.image} alt={activeIndustry.imageAlt} width={activeIndustry.imageWidth} height={activeIndustry.imageHeight} loading="lazy" decoding="async" className="h-auto w-full lg:absolute lg:inset-0 lg:size-full lg:object-cover" />
            <div className="absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/15 to-transparent lg:block" />
            <figcaption aria-live="polite" aria-atomic="true" className="relative flex flex-col justify-end p-6 sm:p-8 lg:h-full">
              <span className="mb-4 h-1 w-12 bg-primary-soft" aria-hidden="true" />
              <h3 id="industry-preview-title" className="text-2xl font-black leading-tight sm:text-3xl">{activeIndustry.name}</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-background/85 sm:text-base sm:leading-7">{activeIndustry.description}</p>
              <nav aria-label={`${activeIndustry.name} product ranges`} className="mt-4 flex flex-wrap gap-2">
                {industryProductLinks[activeIndustry.name].map(item => <a key={item.to} href={item.to} className="inline-flex items-center gap-1.5 rounded border border-white/20 bg-white/[0.12] px-3 py-1.5 text-sm font-bold text-background transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background">{item.name}<ArrowUpRight className="size-3.5" aria-hidden="true" /></a>)}
              </nav>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
