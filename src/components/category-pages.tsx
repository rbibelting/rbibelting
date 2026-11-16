import { Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { EnquiryDialog } from "@/components/enquiry";
import { PageHero,SectionHeading,CategoryGrid,BrandStrip,BrochureGrid,ProductTypes,EnquiryBand,images } from "@/components/page-sections";
import { VBeltsShowcase } from "@/components/v-belts-showcase";
import { rangeGuidance, rangeGuidanceContent, relatedRanges, type Pillar, type SubCategory } from "@/lib/site-data";
export function CategoryRoute({pillar}:{pillar:Pillar}) {
  const pathname = useRouterState({select: state => state.location.pathname});
  return pathname.replace(/\/$/, "") === `/${pillar.key}` ? <CategoryPage pillar={pillar} /> : <Outlet />;
}
export function CategoryPage({pillar}:{pillar:Pillar}){return <div className={`theme-${pillar.key}`}><PageHero kicker={pillar.kicker} title={pillar.name} description={pillar.description} image={images[pillar.image]} accent={pillar.key} compact/><section id="products" className="pattern-category py-20"><div className="site-container"><SectionHeading eyebrow="Product range" title={`Explore ${pillar.name}`} text="Choose a product family or send the exact part number directly to our team."/><CategoryGrid pillar={pillar}/></div></section><section id="brands" className="pattern-shared content-surface py-14 text-foreground scroll-mt-24"><div className="site-container"><SectionHeading eyebrow="Brands we stock" title="Genuine products from established manufacturers"/><BrandStrip brands={pillar.brands}/></div></section><section className="pattern-shared py-20"><div className="site-container"><SectionHeading eyebrow="Product literature" title="Download product PDFs"/><BrochureGrid brands={pillar.brands}/></div></section><EnquiryBand title={`Need help selecting the right ${pillar.name} product?`} category={pillar.name}/></div>}
export function SubCategoryPage({pillar,sub}:{pillar:Pillar;sub:SubCategory}){const [quote,setQuote]=useState("");const [showcase,setShowcase]=useState("");const isVBelts=pillar.key==="power-transmission"&&sub.slug==="v-belts";return <div className={`theme-${pillar.key}`}><PageHero kicker={pillar.name} title={sub.name} description={`${sub.short} We supply genuine branded products for maintenance, replacement and OEM requirements across India.`} image={images[pillar.image]} accent={pillar.key} compact/><section className="pattern-category py-20"><div className="site-container"><SectionHeading eyebrow="Available range" title={`${sub.name} product types`} text={isVBelts?"Select a product type to compare profiles, size guidance and typical applications.":"The range is organised by product type rather than individual SKU. Send the code or size you need for a direct match."}/><ProductTypes pillar={pillar} sub={sub} onQuote={setQuote} onView={isVBelts?setShowcase:undefined}/><RangeSelectionGuidance sub={sub}/></div></section><section className="pattern-shared content-surface py-16 text-foreground"><div className="site-container grid gap-10 lg:grid-cols-2"><div><p className="eyebrow text-primary-soft">Applications</p><h2 className="section-title mt-3">Built for industrial duty</h2><p className="mt-5 leading-7 text-background/70">{sub.name} are used in {sub.applications}. RB International supports single replacements, planned maintenance and bulk requirements with application guidance.</p></div><div><p className="eyebrow text-primary-soft">Available brands</p><div className="mt-5 flex flex-wrap gap-2">{sub.brands.length === 0 && <p className="text-background/70">Contact us for brand availability.</p>}{sub.brands.map(b=><a key={b} href={`/${pillar.key}#brands`} className="border border-background/20 px-3 py-2 text-sm font-bold hover:text-primary">{b}</a>)}</div></div></div></section><section className="pattern-shared py-16"><div className="site-container"><SectionHeading title="Related product families"/><div className="flex flex-wrap gap-3">{pillar.subcategories.filter(x=>x.slug!==sub.slug).map(x=><a key={x.slug} href={`/${pillar.key}/${x.slug}`} className="border border-border bg-background px-4 py-3 text-sm font-bold hover:border-category hover:text-category">{x.name}</a>)}</div></div></section><EnquiryBand title={`Looking for ${sub.name}? Tell us your requirement.`} category={pillar.name} requirement={sub.name}/><VBeltsShowcase product={showcase} open={!!showcase} onOpenChange={v=>!v&&setShowcase("")} onEnquire={setQuote}/><EnquiryDialog open={!!quote} onOpenChange={v=>!v&&setQuote("")} seed={{category:pillar.name,requirement:quote}}/></div>}

function RangeSelectionGuidance({sub}:{sub:SubCategory}) {
  const guidance = rangeGuidance[sub.slug];
  if (!guidance) return null;
  return <section aria-labelledby="selection-guidance" className="mt-10 border-t border-border pt-8">
    <h2 id="selection-guidance" className="text-2xl font-black">{rangeGuidanceContent.title}</h2>
    <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">{guidance.explanation}</p>
    <h3 className="mt-6 text-lg font-bold">{rangeGuidanceContent.inputsTitle}</h3>
    <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">{guidance.selection.map(item => <li key={item}>{item}</li>)}</ul>
    <details className="mt-6 border-y border-border py-4">
      <summary className="cursor-pointer font-bold focus-visible:outline-2 focus-visible:outline-primary">{guidance.question}</summary>
      <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">{guidance.answer}</p>
    </details>
    <p className="mt-4 text-sm leading-6 text-muted-foreground">{rangeGuidanceContent.disclaimer}</p>
    <nav aria-label={rangeGuidanceContent.relatedTitle} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="text-sm font-bold">{rangeGuidanceContent.relatedTitle}:</span>
      {relatedRanges(sub).map(item => <a key={item.to} href={item.to} className="text-sm font-semibold text-primary underline underline-offset-4">{item.name}</a>)}
    </nav>
  </section>;
}
