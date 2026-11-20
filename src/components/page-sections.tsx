import { validateBrochure, validateBrochureEmail, validateBrochurePhone, type BrochureField } from "@/lib/brochure-validation";
import { useEffect,useRef,useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight,CheckCircle2,ChevronRight,Download,Home,Mail,MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductRangeDialog } from "@/components/product-range-dialog";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EnquiryDialog, EnquiryForm, enquiryEmailLink } from "@/components/enquiry";
import { SectionHeading } from "@/components/section-heading";
import { describeType,productTypeAnchor,formContent,brochureDownloads,getBrandLogoAlt,getBrandLogo,getImageAlt,productPhotoShowcases,type Pillar,type SubCategory } from "@/lib/site-data";
import powerImg from "@/assets/power-transmission.jpg";import automationImg from "@/assets/automation.jpg";import adhesivesImg from "@/assets/adhesives.jpg";
import classicalImg from "@/assets/v-belts/classical-clean.jpg";import coggedImg from "@/assets/v-belts/cogged-clean.jpg";import bandedImg from "@/assets/v-belts/banded-clean.jpg";import narrowImg from "@/assets/v-belts/narrow-clean.jpg";
const images={power:powerImg,automation:automationImg,adhesives:adhesivesImg};
const vBeltPhotos=[{image:classicalImg,title:"Classical wrapped belts",note:"General-purpose wrapped profiles for dependable plant maintenance."},{image:coggedImg,title:"Raw-edge cogged belts",note:"Flexible profiles for compact drives and improved heat dissipation."},{image:bandedImg,title:"Banded drive systems",note:"Joined belts for vibration control and shock-loaded applications."},{image:narrowImg,title:"Narrow and variable-speed profiles",note:"Compact section options for high-power and adjustable-speed drives."}];
const formCategory=(key:string)=>key==="power-transmission"?"Power Transmission":key==="automation"?"Automation":"Adhesives";
const rangePhotos=(pillar:Pillar,sub:SubCategory)=>productPhotoShowcases[`${pillar.key}/${sub.slug}`] ?? (sub.slug==="v-belts"?vBeltPhotos:[{image:images[pillar.image],title:sub.name,note:sub.short}]);
export function Breadcrumbs({items}:{items:{label:string;to:string}[]}){return <section className="border-b border-border bg-background"><div className="site-container py-5"><nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-2 text-sm font-semibold"><li><Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"><Home className="size-4"/>Home</Link></li>{items.map((item,index)=>{const current=index===items.length-1;return <li key={item.to} className="flex items-center gap-2"><ChevronRight className="size-4 text-muted-foreground/60"/>{current?<span aria-current="page" className="text-primary">{item.label}</span>:<a href={item.to} className="text-muted-foreground hover:text-primary">{item.label}</a>}</li>})}</ol></nav></div></section>}
export function PageHero({kicker,title,description,image,accent="brand",compact=false}:{kicker:string;title:string;description:string;image?:string;accent?:string;compact?:boolean}){
  return (
    <section className={`page-hero bg-foreground pattern-${accent} ${compact ? "page-hero-compact md:h-[300px]" : "page-hero-full"}`}>
      <div className="absolute inset-0 hidden bg-foreground/75 md:block" />
      {image && (
        <img
          src={image}
          alt={getImageAlt(image, `${kicker} industrial equipment`)}
          width={1408}
          height={912}
          fetchPriority="high"
          className="h-auto w-full md:absolute md:inset-0 md:-z-10 md:size-full md:object-cover"
        />
      )}
      <div className={`site-container relative flex flex-col justify-center text-background md:h-full ${compact ? "py-6" : "py-8 md:py-28"}`}>
        <p className="eyebrow text-primary-soft">{kicker}</p>
        <h1 className={`mt-3 max-w-4xl font-black leading-tight ${compact ? "text-2xl sm:text-3xl md:text-4xl" : "text-4xl md:text-6xl"}`}>{title}</h1>
        <p className={`max-w-2xl text-background/80 ${compact ? "mt-3 text-sm leading-6 md:text-base md:leading-7" : "mt-6 text-lg leading-8"}`}>{description}</p>
      </div>
    </section>
  );
}
export { SectionHeading };
export { PillarCards } from "@/components/division-cards";
export { BrandStrip } from "@/components/brand-strip";
export function CategoryGrid({pillar}:{pillar:Pillar}){
  const searchStr=useRouterState({select:state=>state.location.searchStr});
  const [selected,setSelected]=useState<SubCategory|null>(null);
  const [enquiry,setEnquiry]=useState<SubCategory|null>(null);
  const checkedInitialSearch=useRef(false);
  useEffect(()=>{
    const isInitialRefresh=!checkedInitialSearch.current&&typeof performance!=="undefined"&&(performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type==="reload";
    checkedInitialSearch.current=true;
    if(isInitialRefresh){setSelected(null);return}
    const slug=new URLSearchParams(searchStr).get("product");
    setSelected(pillar.subcategories.find(sub=>sub.slug===slug)??null);
  },[pillar,searchStr]);
  return <>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {pillar.subcategories.map((s,i)=><article className="category-card" key={s.slug}>
        <span className="text-xs font-black text-category">0{i+1}</span>
        <h3 className="mt-5 text-xl font-black"><a href={`/${pillar.key}/${s.slug}`} className="text-left hover:text-category focus-visible:outline-2 focus-visible:outline-category">{s.name}</a></h3>
        <p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{s.short}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={()=>setSelected(s)}>View range <ArrowRight/></Button>
          <Button type="button" variant="outline" size="sm" onClick={()=>setEnquiry(s)}>Quick enquiry</Button>
        </div>
      </article>)}
    </div>
    <ProductRangeDialog key={selected?.slug ?? "range"} pillar={pillar} sub={selected} photos={selected?rangePhotos(pillar,selected):[]} open={!!selected} onOpenChange={open=>!open&&setSelected(null)} onEnquire={sub=>{setSelected(null);setEnquiry(sub)}}/>
    <EnquiryDialog open={!!enquiry} onOpenChange={open=>!open&&setEnquiry(null)} seed={{category:formCategory(pillar.key),requirement:enquiry?`${enquiry.name} requirement: `:""}}/>
  </>;
}
function BrochureRequestDialog({
  brand,
  open,
  onOpenChange,
}: {
  brand: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<BrochureField, string>>>({});
  const submitted = useRef(false);

  useEffect(() => {
    setErrors({});
    submitted.current = false;
  }, [open, brand]);

  if (!brand) return null;

  const submit = (form: HTMLFormElement) => {
    if (submitted.current) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const nextErrors = validateBrochure({ name, phone, email, company });
    setErrors(nextErrors);
    const firstError = (Object.keys(nextErrors) as BrochureField[])[0];
    if (firstError) {
      form.querySelector<HTMLInputElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    submitted.current = true;
    const message = `Please share the ${brand} catalogue.\nName: ${name}\nCompany: ${company}\nPhone: ${phone}\nEmail: ${email}`;
    window.location.href = enquiryEmailLink(`Catalogue request: ${brand}`, message);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <p className="eyebrow">Request catalogue</p>
          <DialogTitle className="text-2xl">{brand}</DialogTitle>
          <DialogDescription className="sr-only">Open an email draft requesting the selected catalogue.</DialogDescription>
        </DialogHeader>
        <form
          noValidate
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            submit(event.currentTarget);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="br-name">Name *</Label>
              <Input id="br-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "br-name-error" : undefined} onChange={() => setErrors((current) => { const next = { ...current }; delete next.name; return next; })} required maxLength={100} className="mt-1 h-12" />
              {errors.name && <p id="br-name-error" role="alert" className="mt-1 text-sm text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="br-company">Company</Label>
              <Input id="br-company" name="company" autoComplete="organization" aria-invalid={!!errors.company} aria-describedby={errors.company ? "br-company-error" : undefined} onChange={() => setErrors((current) => { const next = { ...current }; delete next.company; return next; })} maxLength={120} className="mt-1 h-12" />
              {errors.company && <p id="br-company-error" role="alert" className="mt-1 text-sm text-destructive">{errors.company}</p>}
            </div>
            <div>
              <Label htmlFor="br-phone">Phone *</Label>
              <Input id="br-phone" name="phone" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby="br-phone-error" onChange={(event) => { const error = validateBrochurePhone(event.currentTarget.value); setErrors((current) => { const next = { ...current }; if (error) next.phone = error; else delete next.phone; return next; }); }} onBlur={(event) => { const error = validateBrochurePhone(event.currentTarget.value); setErrors((current) => { const next = { ...current }; if (error) next.phone = error; else delete next.phone; return next; }); }} type="tel" inputMode="tel" required maxLength={20} className={`mt-1 h-12 ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`} />
              <p id="br-phone-error" aria-live="polite" className={errors.phone ? "mt-1 text-sm font-medium text-destructive" : "sr-only"}>{errors.phone ?? ""}</p>
            </div>
            <div>
              <Label htmlFor="br-email">Email *</Label>
              <Input id="br-email" name="email" onBlur={(event) => { const error = validateBrochureEmail(event.currentTarget.value); setErrors((current) => { const next = { ...current }; if (error) next.email = error; else delete next.email; return next; }); }} autoComplete="email" aria-invalid={!!errors.email} aria-describedby="br-email-error" onChange={(event) => { const error = validateBrochureEmail(event.currentTarget.value); event.currentTarget.setCustomValidity(error ?? ""); setErrors((current) => { const next = { ...current }; if (error) next.email = error; else delete next.email; return next; }); }} type="email" inputMode="email" required maxLength={200} className={`mt-1 h-12 ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`} />
              <p id="br-email-error" aria-live="polite" aria-atomic="true" className={errors.email ? "mt-1 text-sm font-medium text-destructive" : "sr-only"}>{errors.email ?? ""}</p>
            </div>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">{formContent.contactDisclaimer}</p>
          <Button type="submit" size="lg" className="h-12 w-full"><Mail />Open email draft</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export function BrochureGrid({ brands }: { brands: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  return <>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {brands.slice(0, 8).map((brand) => {
        const pdf = brochureDownloads[brand];
        return <article key={brand} className="border border-border bg-background p-5">
          <Download className="text-primary" />
          <h3 className="mt-5 text-lg font-black">{brand}</h3>
          {pdf ? (
            <Button asChild variant="outline" size="sm" className="mt-5">
              <a href={pdf} download={`${brand} Catalogue.pdf`}>Download PDF</a>
            </Button>
          ) : (
            <Button type="button" variant="outline" size="sm" className="mt-5" onClick={() => setSelected(brand)}>
              Request catalogue
            </Button>
          )}
        </article>;
      })}
    </div>
    <BrochureRequestDialog brand={selected} open={!!selected} onOpenChange={(open) => !open && setSelected(null)} />
  </>;
}
export function ProductTypes({pillar,sub,onQuote,onView}:{pillar:Pillar;sub:SubCategory;onQuote?:(name:string)=>void;onView?:(name:string)=>void}){return <div className="grid gap-4 md:grid-cols-2">{sub.types.map((t,i)=><article key={t} id={productTypeAnchor(t)} className="product-type scroll-mt-28"><div className="flex items-start justify-between gap-4"><span className="grid size-9 shrink-0 place-items-center bg-category text-sm font-black text-category-foreground">{String(i+1).padStart(2,"0")}</span><CheckCircle2 className="text-category"/></div><h3 className="mt-6 text-xl font-black">{t}</h3><p className="mt-3 leading-7 text-muted-foreground">{describeType(t)}</p>{onView?<Button className="mt-5" onClick={()=>onView(t)}>View range <ArrowRight/></Button>:onQuote&&<Button variant="outline" className="mt-5" onClick={()=>onQuote(t)}><MessageSquareText/>Request quote</Button>}</article>)}</div>}
export function EnquiryBand({title,category,requirement}:{title:string;category:string;requirement?:string}){return <section id="enquire" className="pattern-shared bg-muted py-16"><div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Technical enquiry</p><h2 className="section-title mt-3">{title}</h2><p className="mt-5 leading-7 text-muted-foreground">Share a part number, size, brand, drawing or application. Our team will help identify the right option.</p></div><div className="border border-border bg-background p-5 shadow-sm md:p-8"><EnquiryForm seed={requirement?{category,requirement}:{category}} compact/></div></div></section>}
export {images};
