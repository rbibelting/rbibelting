import { useEffect,useRef,useState } from "react";
import { Link,useRouterState } from "@tanstack/react-router";
import { Menu,Search,X,ArrowUp,ChevronDown,MapPin,Phone,Mail,Clock,Instagram,Linkedin,Youtube,Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Brand } from "@/components/brand";
import { JustdialReviews } from "@/components/justdial-reviews";
import { EnquiryDialog,type EnquirySeed,WA_PHONE } from "@/components/enquiry";
import { footerContact,footerQuickLinks,footerProductLinks,navItems,pillarList,searchProducts } from "@/lib/site-data";
import logo from "@/assets/rb-logo.jpeg";
const ENQUIRY_INTERVAL=5*60*1000;
const ENQUIRY_NEXT_AT="rb-enquiry-popup-next-at";
export function SiteShell({children}:{children:React.ReactNode}){const footerRef=useRef<HTMLElement>(null);const searchTriggerRef=useRef<HTMLButtonElement>(null);const [footerVisible,setFooterVisible]=useState(false);const path=useRouterState({select:s=>s.location.pathname});const [menu,setMenu]=useState(false),[search,setSearch]=useState(false),[query,setQuery]=useState(""),[enquiry,setEnquiry]=useState(false),[seed,setSeed]=useState<EnquirySeed>({}),[top,setTop]=useState(false);
useEffect(()=>{setMenu(false);setSearch(false)},[path]);useEffect(()=>{const f=()=>setTop(window.scrollY>700);addEventListener("scroll",f,{passive:true});return()=>removeEventListener("scroll",f)},[]);
useEffect(()=>{
  const preventContextMenu=(event:Event)=>event.preventDefault();
  const preventImageDrag=(event:Event)=>{
    const target=event.target;
    if(target instanceof Element && target.closest("img,canvas,svg image"))event.preventDefault();
  };
  document.addEventListener("contextmenu",preventContextMenu,true);
  document.addEventListener("dragstart",preventImageDrag,true);
  return()=>{
    document.removeEventListener("contextmenu",preventContextMenu,true);
    document.removeEventListener("dragstart",preventImageDrag,true);
  };
},[]);
const context=path.split("/").filter(Boolean).map(x=>x.replaceAll("-"," ")).join(" / ");const matches=searchProducts(query);const open=(s:EnquirySeed={})=>{sessionStorage.setItem(ENQUIRY_NEXT_AT,String(Date.now()+ENQUIRY_INTERVAL));setSeed(s);setEnquiry(true)};
const onEnquiryOpenChange=(isOpen:boolean)=>setEnquiry(isOpen);
const hasDirectForm=path==="/contact"||path==="/franchise";
useEffect(()=>{
  setFooterVisible(false);
  if(path==="/"){
    const update=()=>{
      const section=document.getElementById("own-range");
      setFooterVisible(!!section && section.getBoundingClientRect().top <= window.innerHeight + 160);
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return()=>{
      window.removeEventListener("scroll",update);
      window.removeEventListener("resize",update);
    };
  }
  const footer=footerRef.current;
  if(!footer)return;
  const observer=new IntersectionObserver(([entry])=>setFooterVisible(entry?.isIntersecting??false));
  observer.observe(footer);
  return()=>observer.disconnect();
},[path]);
useEffect(()=>{
  if(enquiry||search)return;
  let timer:number;
  const show=()=>{
    // Wait until the visitor can see the popup and has finished with any other dialog.
    if(document.hidden||document.querySelector('[role="dialog"][data-state="open"]')){timer=window.setTimeout(show,1000);return}
    sessionStorage.setItem(ENQUIRY_NEXT_AT,String(Date.now()+ENQUIRY_INTERVAL));
    setSeed({requirement:"I would like help selecting the right product for: "});
    setEnquiry(true);
  };
  let nextAt=Number(sessionStorage.getItem(ENQUIRY_NEXT_AT));
  if(!Number.isFinite(nextAt)||nextAt<=Date.now()){
    nextAt=Date.now()+ENQUIRY_INTERVAL;
    sessionStorage.setItem(ENQUIRY_NEXT_AT,String(nextAt));
  }
  const delay=Math.max(0,nextAt-Date.now());
  timer=window.setTimeout(show,delay);
  return()=>window.clearTimeout(timer);
},[enquiry,search]);
return <><header className="site-header sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur"><div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 xl:grid-cols-[auto_minmax(0,1fr)_auto]"><Link to="/" aria-label="RB International Belting & Automation home"><Brand compact/></Link><nav className="hidden min-w-0 items-center justify-center gap-1 xl:flex">{navItems.map(n=><div key={n.to} className="group relative"> <Link to={n.to} className="inline-flex h-11 items-center gap-1 px-2 text-xs font-bold uppercase text-foreground hover:text-primary" activeProps={{className:"text-primary"}}>{n.label}{pillarList.some(p=>`/${p.key}`===n.to)&&<ChevronDown className="size-3"/>}</Link>{pillarList.find(p=>`/${p.key}`===n.to)&&<div className="invisible absolute left-0 top-full w-72 translate-y-2 border border-border bg-background p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">{pillarList.find(p=>`/${p.key}`===n.to)?.subcategories.map(s=><a key={s.slug} href={`${n.to}?product=${encodeURIComponent(s.slug)}`} className="block border-b border-border px-3 py-2 text-sm font-medium last:border-0 hover:bg-muted hover:text-primary">{s.name}</a>)}</div>}</div>)}</nav><div className="flex items-center gap-1"><Button type="button" className="h-11 gap-2 rounded-md border border-primary px-3 font-bold shadow-sm sm:px-4 [&_svg]:size-5" ref={searchTriggerRef} aria-label="Search products" aria-haspopup="dialog" onClick={()=>setSearch(true)}><Search/><span className="hidden min-[360px]:inline">Search</span></Button><Button variant="ghost" size="icon" className="size-11 shrink-0 xl:hidden" aria-label={menu?"Close menu":"Open menu"} aria-expanded={menu} aria-controls="mobile-navigation" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</Button></div></div>{menu&&<nav id="mobile-navigation" aria-label="Mobile navigation" className="max-h-[calc(100dvh-5rem-env(safe-area-inset-top))] overflow-auto border-t border-border bg-background px-4 py-3 xl:hidden">{navItems.map(n=><Link key={n.to} to={n.to} className="block border-b border-border py-3 font-bold">{n.label}</Link>)}</nav>}</header>
<Dialog open={search} onOpenChange={setSearch}>
  <DialogContent onCloseAutoFocus={event=>{event.preventDefault();if(!document.querySelector('[role="dialog"][data-state="open"]'))searchTriggerRef.current?.focus();}} className="top-[max(1rem,env(safe-area-inset-top))] flex max-h-[min(42rem,calc(100dvh-2rem-env(safe-area-inset-top)-env(safe-area-inset-bottom)))] w-[calc(100%-2rem)] max-w-2xl translate-y-0 flex-col gap-0 overflow-hidden p-4 sm:p-5 [&>button]:hidden">
    <DialogTitle className="sr-only">Search products</DialogTitle>
    <DialogDescription className="sr-only">Search by product, brand or part type to view a range or send an enquiry.</DialogDescription>
    <div className="flex shrink-0 items-center gap-3">
      <Search className="shrink-0 text-primary" aria-hidden="true" />
      <input value={query} onChange={e=>setQuery(e.target.value.slice(0,100))} aria-label="Search product, brand or part type" placeholder="Search product, brand or part type" className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none" />
      <Button variant="ghost" size="icon" className="size-11 shrink-0" aria-label="Close search" onClick={()=>setSearch(false)}><X/></Button>
    </div>
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-border pt-2">
      {matches.map((m,i)=><div key={`${m.name}-${i}`} className="flex flex-col gap-3 border-b border-border px-2 py-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between sm:gap-4"><a href={m.to} onClick={()=>setSearch(false)} className="min-w-0 flex-1 hover:text-primary"><span className="block">{m.name}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{m.context}</span></a><div className="flex shrink-0 flex-wrap items-center gap-2"><Button asChild variant="outline" size="sm"><a href={m.to} onClick={()=>setSearch(false)}>View range</a></Button><Button type="button" size="sm" onClick={()=>{
  const pillar=pillarList.find(p=>m.to.startsWith(`/${p.key}`));
  const category=pillar?.key==="power-transmission"?"Power Transmission":pillar?.key==="automation"?"Automation":pillar?.key==="adhesives"?"Adhesives":undefined;
  setSearch(false);
  open({...(category?{category}:{}),requirement:`I am looking for ${m.name}. `});
}}>Quick enquiry</Button></div></div>)}{query&&matches.length===0&&<Button variant="outline" className="my-3 h-auto w-full justify-start whitespace-normal border-primary/30 bg-primary/10 px-4 py-4 text-left font-bold text-primary hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground" onClick={()=>{setSearch(false);open({requirement:query})}}>No exact match? Submit an enquiry for “{query}”</Button>}
    </div>
  </DialogContent>
</Dialog>
<main>{children}<JustdialReviews/></main><Footer footerRef={footerRef}/>{footerVisible&&!hasDirectForm&&<button className="quick-enquiry" onClick={()=>open({requirement:context?`I am looking for ${context}`:""})}>Can't find what you need?</button>}{!hasDirectForm&&<a className="whatsapp-float" href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(`Hi, I'm reaching out from your website. I'm looking for: ${context}`)}`} aria-label="Message RB International Belting & Automation on WhatsApp"><WhatsAppLogo/></a>}{top&&<Button size="icon" variant="outline" className="fixed bottom-24 right-5 z-30 bg-background shadow-lg" onClick={()=>scrollTo({top:0,behavior:"smooth"})} aria-label="Scroll to top"><ArrowUp/></Button>}<EnquiryDialog open={enquiry} onOpenChange={onEnquiryOpenChange} seed={seed}/></>}
function WhatsAppLogo(){return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.02 3.2C9.02 3.2 3.32 8.88 3.32 15.86c0 2.23.58 4.41 1.69 6.34L3.2 28.8l6.75-1.77a12.65 12.65 0 0 0 6.06 1.54h.01c6.99 0 12.68-5.68 12.68-12.66S23.01 3.2 16.02 3.2Zm0 23.23c-1.91 0-3.78-.51-5.41-1.48l-.39-.23-4.01 1.05 1.07-3.91-.25-.4a10.5 10.5 0 0 1-1.6-5.6c0-5.81 4.75-10.54 10.59-10.54s10.58 4.73 10.58 10.54-4.75 10.57-10.58 10.57Zm5.8-7.91c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.83.76.33 1.36.52 1.83.67.77.24 1.47.21 2.02.13.62-.09 1.88-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/></svg>}
function Footer({footerRef}:{footerRef:React.RefObject<HTMLElement|null>}) {
  return (
    <footer ref={footerRef} className="bg-foreground text-background">
      <div className="site-container grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-[1.25fr_.85fr_1.1fr_1.35fr]">
        <div className="min-w-0 text-center md:text-left">
          <img src={logo} alt="RB International Belting & Automation logo" width={80} height={80} className="mx-auto size-20 rounded-full object-contain md:mx-0" />
          <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-background/70 md:mx-0">{footerContact.description}</p>
          <div className="mt-5 flex justify-center gap-2.5 md:justify-start"><a href="https://www.instagram.com/rbibelting/" aria-label="RB International Belting & Automation on Instagram" className="grid size-9 place-items-center rounded-full border border-background/15 bg-background/5 text-background/75 hover:text-primary-soft"><Instagram className="size-4"/></a>
            <span title="LinkedIn profile unavailable" className="grid size-9 place-items-center rounded-full border border-background/15 bg-background/5 text-background/50"><Linkedin className="size-4" aria-hidden="true" /><span className="sr-only">LinkedIn profile unavailable</span></span>
            <span title="YouTube profile unavailable" className="grid size-9 place-items-center rounded-full border border-background/15 bg-background/5 text-background/50"><Youtube className="size-4" aria-hidden="true" /><span className="sr-only">YouTube profile unavailable</span></span>
            <span title="Facebook profile unavailable" className="grid size-9 place-items-center rounded-full border border-background/15 bg-background/5 text-background/50"><Facebook className="size-4" aria-hidden="true" /><span className="sr-only">Facebook profile unavailable</span></span>
          </div>
        </div>
        <div className="min-w-0 text-center md:text-left">
          <h2 className="footer-title tracking-[0.25em]">Quick Links</h2>
          {footerQuickLinks.map(link => <a key={link.to} href={link.to} className="footer-link justify-center text-sm md:justify-start">{link.label}</a>)}
        </div>
        <div className="min-w-0 text-center md:text-left">
          <h2 className="footer-title tracking-[0.25em]">Products</h2>
          {footerProductLinks.map(links => <div key={links.map(link => link.to).join(",")} className="py-[.35rem] text-sm leading-6 text-background/70">
            {links.map((link, index) => <span key={link.to}>{index > 0 && " & "}<a href={link.to} className="hover:text-primary-soft">{link.label}</a></span>)}
          </div>)}
        </div>
        <div className="min-w-0 text-center md:text-left">
          <h2 className="footer-title tracking-[0.25em]">Reach Us</h2>
          <a className="footer-contact justify-center text-sm md:justify-start" href={footerContact.mapUrl} target="_blank" rel="noopener noreferrer" title="Open in Google Maps"><MapPin className="text-primary-soft" />{footerContact.address}</a>
          <a className="footer-contact justify-center text-sm md:justify-start" href="tel:+919890961752"><Phone className="text-primary-soft" />+91 98909 61752</a>
          <a className="footer-contact justify-center text-sm md:justify-start" href="tel:+918788195839"><Phone className="text-primary-soft" />+91 87881 95839</a>
          <a className="footer-contact justify-center break-all text-sm md:justify-start" href={`mailto:${footerContact.email}`}><Mail className="text-primary-soft" />{footerContact.email}</a>
          <p className="footer-contact justify-center text-sm md:justify-start"><Clock className="text-primary-soft" />{footerContact.hours}</p>
        </div>
      </div>
      <p className="site-container pb-4 text-center text-sm leading-6 text-background/60">{footerContact.serviceAreas}</p>
      <div className="border-t border-background/10 py-3 text-center text-xs text-background/60">&copy; 2026 RB International Belting & Automation. All rights reserved.</div>
    </footer>
  );
}
