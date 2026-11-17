import powerDivisionPhoto from "@/assets/power-transmission.jpg";
import automationDivisionPhoto from "@/assets/automation.jpg";
import adhesivesDivisionPhoto from "@/assets/adhesives.jpg";
import classicalDivisionPhoto from "@/assets/v-belts/classical-clean.jpg";
import coggedDivisionPhoto from "@/assets/v-belts/cogged-clean.jpg";
import factoryPhoto from "@/assets/factory-hero.jpg";
import bandedPhoto from "@/assets/v-belts/banded-clean.jpg";
import narrowPhoto from "@/assets/v-belts/narrow-clean.jpg";

const imageDescriptions: Record<string, string> = {
  [factoryPhoto]: "Factory production floor with CNC machinery and assembly equipment",
  [powerDivisionPhoto]: "Industrial drive belts and pulleys on production machinery",
  [automationDivisionPhoto]: "Automated industrial production equipment",
  [adhesivesDivisionPhoto]: "Industrial maintenance and repair workbench",
  [classicalDivisionPhoto]: "Classical wrapped V-belts for industrial drive systems",
  [coggedDivisionPhoto]: "Raw-edge cogged V-belts with notched inner profiles",
  [bandedPhoto]: "Banded V-belts with multiple belt sections joined together",
  [narrowPhoto]: "Narrow-profile drive belts for compact industrial drives",
  "/product-images/conveyor-belts/pu-pvc-conveyor-belt.png": "PU and PVC conveyor belting for material handling",
  "/product-images/conveyor-belts/plastic-modular-conveyor-belt.png": "Plastic modular conveyor belt with interlocking segments",
  "/product-images/conveyor-belts/rubber-conveyor-belt.png": "Rubber conveyor belting for industrial material handling",
  "/product-images/conveyor-belts/cleated-conveyor-belt.png": "Conveyor belt with raised cleats for inclined material transport",
};
export const getImageAlt = (src: string, fallback: string) => imageDescriptions[src] ?? fallback;

// Original image URLs remain available; responsive derivatives preserve the photography.
export function responsiveProductImage(src: string) {
  if (!src.startsWith("/product-images/conveyor-belts/") || !src.endsWith(".png")) return {};
  const stem = src.slice(0, -4);
  return {
    src: `${stem}-1280.webp`,
    srcSet: `${stem}-640.webp 640w, ${stem}-1280.webp 1280w`,
    sizes: "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 640px",
  };
}

export function pageImage(path: string) {
  const section = path.split("/")[1];
  const src =
    section === "power-transmission"
      ? powerDivisionPhoto
      : section === "automation"
        ? automationDivisionPhoto
        : section === "adhesives"
          ? adhesivesDivisionPhoto
          : factoryPhoto;
  return { src, alt: getImageAlt(src, "Industrial production equipment") };
}

export type PillarKey = "power-transmission" | "automation" | "adhesives";
export type DivisionCardPhoto = { src: string; alt: string; label?: string; fit?: "cover" | "contain" };
export const divisionCardContent = {
  divisionLabel: "Division",
  linkLabel: "Explore range",
};
export const divisionCards: Record<PillarKey, { title: string; description: string; photos: readonly DivisionCardPhoto[] }> = {
  "power-transmission": {
    title: "Power Transmission",
    description: "Belts, pulleys and couplings for reliable industrial drives and conveying.",
    photos: [
      { src: powerDivisionPhoto, alt: "Industrial drive belts and pulleys on production machinery", label: "Drive Belts & Pulleys" },
      { src: classicalDivisionPhoto, alt: "Classical wrapped V-belts for industrial drives", label: "Classical V-Belts", fit: "contain" },
      { src: coggedDivisionPhoto, alt: "Raw-edge cogged drive belts", label: "Cogged V-Belts", fit: "contain" },
      { src: "/product-images/conveyor-belts/rubber-conveyor-belt.png", alt: "Rubber conveyor belting", label: "Rubber Conveyor Belts", fit: "contain" },
      { src: "/product-images/conveyor-belts/cleated-conveyor-belt.png", alt: "Cleated conveyor belt profile", label: "Cleated Conveyor Belts", fit: "contain" },
    ],
  },
  automation: {
    title: "Automation & Motion",
    description: "Linear motion, robotics and drives for precise machine control and automation.",
    photos: [
      { src: automationDivisionPhoto, alt: "Automated industrial production equipment" },
      { src: "/division-images/automation-linear-motion.jpg", alt: "Linear guides and ball screw assembly" },
      { src: "/division-images/automation-robotics.jpg", alt: "Robotic arm at an automated assembly cell" },
      { src: "/division-images/automation-servo-drives.jpg", alt: "Servo motors and precision motion-control drives" },
    ],
  },
  adhesives: {
    title: "Adhesives & Chemicals",
    description: "Adhesives, sealants and maintenance chemicals for dependable bonding and repair.",
    photos: [
      { src: adhesivesDivisionPhoto, alt: "Industrial maintenance and repair workbench" },
      { src: "/division-images/adhesives-threadlocking.jpg", alt: "Threadlocking adhesive applied to a metal fastener" },
      { src: "/division-images/adhesives-epoxy-bonding.jpg", alt: "Structural epoxy bonding of metal components" },
      { src: "/division-images/adhesives-tapes-sealants.jpg", alt: "Industrial tapes and sealants for maintenance" },
    ],
  },
};
export const brandPartnersContent = {
  eyebrow: "Our Brand Partners",
  title: "Authorized Dealers and Stockists for 50+ Industrial Brands",
};
export const serviceBenefits = [
  { title: "Same-Day Dispatch", description: "Stocked items shipped the same day from our Pune warehouse." },
  { title: "2-Hour Response", description: "Submit your requirement. Our team gets back within 2 business hours." },
  { title: "Application Support", description: "Share your machine, size, or part code. We help you find the exact match." },
];
export const footerContact = {
  description: "RB International Belting & Automation, Pune. Authorized dealers for Gates, Fenner, PIX, Pidilite. Suppliers of V-belts, timing belts, conveyor belts, ball screws, servo motors, industrial adhesives.",
  email: "sales@rbcorp.in",
  gst: "27AAHFR3595G1ZU",
  address: "Shop No 5, Kamath Complex, Telco Road, Landewadi, Bhosari Industrial Estate, Pune 411026",
  mapUrl: "https://maps.app.goo.gl/v51wGZH4o8cT1e3D8",
};
// Verified public company details shared by structured data. Placeholder social links are excluded.
export const websiteIdentity = {
  url: "https://www.rbibelting.com",
  name: "RB International Belting & Automation",
  description: "Industrial power transmission products, automation components and industrial adhesives supplied from Pune across India and export markets.",
  telephone: ["+918788195839", "+919890961752"] as const,
  email: ["response@rbibelting.in", footerContact.email] as const,
  socialProfiles: ["https://www.instagram.com/rbibelting/"],
  address: {
    streetAddress: "Shop No 5, Kamath Complex, Telco Road, Landewadi, Bhosari Industrial Estate",
    addressLocality: "Pune",
    postalCode: "411026",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 09:30-18:30",
};

export const companyHistory = {
  eyebrow: "Milestones",
  title: "From a belting shop to three industrial divisions",
  description: "The timeline below contains approximate milestones and will be confirmed before final publication.",
  milestones: [
    { year: "2003", description: "Founded in Bhosari, Pune as a belting supply firm." },
    { year: "2006", description: "Built authorized dealer relationships with major belting brands." },
    { year: "2010", description: "Expanded into industrial adhesives through RB Adhesive Company." },
    { year: "2014", description: "Added automation and motion control products." },
    { year: "2018", description: "Crossed 300 active client accounts across Maharashtra." },
    { year: "2020", description: "Expanded service to PAN India and international markets." },
    { year: "2023", description: "Completed 20 years with 500+ active clients and 50+ brand relationships." },
  ],
} as const;
export const companyLeadership = [
  {
    name: "Mr. Vishwanath Baigar",
    role: "Founder & Director",
    description: "With over two decades of hands-on experience in power transmission, he helped build RB International from a Bhosari shop into a multi-division supplier.",
    portrait: {
      src: "/team/vishwanath-baigar.jpeg",
      width: 983,
      height: 1280,
    },
    note: "Biography is a placeholder pending approval.",
  },
  {
    name: "Mr. Omprakash D. Rokhade",
    role: "Co-Founder & Director",
    description: "His focus on supply chain efficiency, inventory and customer relationships supports dependable stock availability and delivery.",
    portrait: {
      src: "/team/omprakash-rokhade.jpeg",
      width: 1155,
      height: 1362,
    },
    note: "Biography is a placeholder pending approval.",
  },
] as const;
export const formContent = {
  categoryPlaceholder: "Select a category",
  contactDisclaimer: "By submitting, you agree to be contacted by RB International regarding your enquiry.",
  generalTitle: "General enquiry",
  careersCategory: "Careers / Join our team",
  requirementPlaceholder: "Part number, size, brand, application or quantity",
};
export function getEnquiryCategory(value?: string) {
  if (value === "power-transmission") return "Power Transmission";
  if (value === "automation" || value === "Automation & Motion Control") return "Automation";
  if (value === "adhesives" || value === "Industrial Adhesives & Chemicals") return "Adhesives";
  return value;
}
export const productRangeContent = {
  detailsLabel: "Product range details",
  typesTabLabel: "Product types",
  brandsTabLabel: "Brands",
  videosTitle: "Product videos",
  videoFallback: "Download this video to watch it on your device.",
  typesTitle: "Available product types",
  applicationsTitle: "Applications",
  brandsTitle: "Available brands",
  benefits: ["Genuine brands", "Selection support", "PAN India supply"],
  enquiryHint: "For a quote: size/code, brand, quantity & city.",
  enquiryLabel: "Enquire now",
};
export type ProductVideo = {
  src: string;
  poster: string;
  title: string;
  duration: string;
};
export const productVideoShowcases: Record<string, readonly ProductVideo[]> = {
  "automation/linear-motion": [
    {
      src: "/product-videos/conveyor-equipment-demo.mp4",
      poster: "/product-videos/conveyor-equipment-demo.jpg",
      title: "Equipment demonstration",
      duration: "15 sec",
    },
    {
      src: "/product-videos/magnetic-levitation-conveyor.mp4",
      poster: "/product-videos/magnetic-levitation-conveyor.jpg",
      title: "Magnetic levitation conveyor",
      duration: "13 sec",
    },
  ],
};
export type ProductShowcasePhoto = { image: string; title: string; note: string };
export const productPhotoShowcases: Record<string, readonly ProductShowcasePhoto[]> = {
  "power-transmission/conveyor-belts": [
    { image: "/product-images/conveyor-belts/pu-pvc-conveyor-belt.png", title: "PU / PVC conveyor belt", note: "" },
    { image: "/product-images/conveyor-belts/plastic-modular-conveyor-belt.png", title: "Plastic modular conveyor belt", note: "" },
    { image: "/product-images/conveyor-belts/rubber-conveyor-belt.png", title: "Rubber conveyor belt", note: "" },
    { image: "/product-images/conveyor-belts/cleated-conveyor-belt.png", title: "Cleated conveyor belt", note: "" },
  ],
};
export const upcomingRange = {
  eyebrow: "Coming soon",
  title: "RB International: our own range",
  description: "We are developing our own line of automation components and select belting products. Register interest with our team.",
  linkLabel: "Register interest",
  href: "/contact",
  detailsTitle: "What we're developing",
  focusAreas: [
    {
      title: "Automation components",
      description: "A planned range for machinery and motion control applications.",
    },
    {
      title: "Selected belting products",
      description: "Belting options for industrial equipment and maintenance needs.",
    },
  ],
  interestTitle: "Help shape the range",
  interestDescription: "Share your application, required sizes and expected quantities when you register your interest.",
};
type BrandLogo = { src: string; fit?: "contain" | "cover"; position?: string; scale?: number; background?: string; stripFrame?: { width: number; height: number; viewBox: string } };
export const brandLogos: Record<string, BrandLogo> = {
  "Gates": { src: "/brand-logos/gates.svg" },
  "Fenner": { src: "/brand-logos/fenner.png" },
  "PIX": { src: "/brand-logos/pix.png", fit: "cover", position: "center 55%", stripFrame: { width: 447, height: 447, viewBox: "36 126 375 196" } },
  "Pidilite": { src: "/brand-logos/pidilite.avif" },
  "Optibelt": { src: "/brand-logos/optibelt.jpeg" },
  "Goodyear": { src: "/brand-logos/goodyear.png", background: "#101d44" },
  "Continental ContiTech": { src: "/brand-logos/continental-contitech.png" },
  "Megadyne": { src: "/brand-logos/megadyne.png", fit: "cover" },
  "Carlisle": { src: "/brand-logos/carlisle.jpg" },
  "Hutchinson": { src: "/brand-logos/hutchinson.jpg", fit: "cover" },
  "Mitsuboshi": { src: "/brand-logos/mitsuboshi.png" },
  "Polymaxx": { src: "/brand-logos/polymaxx.png" },
  "Loctite": { src: "/brand-logos/loctite.png", fit: "cover" },
  "3M": { src: "/brand-logos/3m.png", fit: "cover" },
  "Anabond": { src: "/brand-logos/anabond.png", fit: "cover", position: "center 40%" },
  "Araldite": { src: "/brand-logos/araldite.jpeg", fit: "cover" },
  "Amico": { src: "/brand-logos/amico.jpg" },
  "Speb 7": { src: "/brand-logos/speb7.png", fit: "cover" },
  "WD-40": { src: "/brand-logos/wd40.avif" },
  "Arofine Polymers": { src: "/brand-logos/arofine-polymers.png", fit: "cover" },
  "SAV Chemicals": { src: "/brand-logos/sav-chemicals.png", fit: "cover" },
  "Atul": { src: "/brand-logos/atul.svg" },
  "Metlok": { src: "/brand-logos/metlok.jpeg", fit: "cover", position: "center 45%" },
  "Bondtite": { src: "/brand-logos/bondtite.webp", fit: "cover" },
  "Dr. Fixit": { src: "/brand-logos/dr-fixit.png" },
  "Fevicol": { src: "/brand-logos/fevicol.jpg", fit: "cover" },
  "Ecodrive": { src: "/brand-logos/ecodrive.png" },
  "Lapox": { src: "/brand-logos/lapox.png", fit: "cover" },
  "Lord Adhesive": { src: "/brand-logos/lord.webp", fit: "cover" },
  "M-Seal": { src: "/brand-logos/m-seal.jpg" },
  "MxBon": { src: "/brand-logos/mxbon.png" },
  "Polygrip": { src: "/brand-logos/polygrip.webp", fit: "cover" },
  "Bando": { src: "/brand-logos/bando.png", fit: "cover" },
  "Nitta": { src: "/brand-logos/nitta.png" },
  "Habasit": { src: "/brand-logos/habasit.png", scale: 1.65 },
  "TOCO": { src: "/brand-logos/toco-transparent.png" },
  "THK": { src: "/brand-logos/thk.png", fit: "cover" },
  "HIWIN": { src: "/brand-logos/hiwin.png" },
  "Rexroth": { src: "/brand-logos/rexroth.png" },
  "ROBOT": { src: "/brand-logos/robot.jpeg", scale: 1.65 },
};
const brandLogoAliases: Record<string, string> = {
  "Goodyear Eagle NRG": "Goodyear",
  "Pidilite IBS": "Pidilite",
  "Bond Tide": "Bondtite",
};
export const logoBrands = Object.keys(brandLogos);
export type CertificateFrame = {
  width: number;
  height: number;
  sourceCorners: readonly [
    readonly [number, number],
    readonly [number, number],
    readonly [number, number],
    readonly [number, number],
  ];
};
export type DealerCertificate = {
  id: string;
  brand: string;
  title: string;
  detail: string;
  group: "authorizations" | "recognition";
  image: string;
  width: number;
  height: number;
  rotation?: -90 | 90;
  straighten?: boolean;
  frame?: CertificateFrame;
  previewCropPosition?: string;
};
export const dealerRelationships = {
  eyebrow: "Dealer relationships",
  title: "Authorized dealers and distributors",
  description: "Our dealer authorizations, partner certificates and recognition. Select an image to view it in detail.",
  viewLabel: "View image",
  enlargeLabel: "View full certificate",
  viewerLabel: "Certificate document",
  previousLabel: "Previous image",
  nextLabel: "Next image",
};
export const dealerCertificates: readonly DealerCertificate[] = [
  {
    id: "sav-chemicals-mxbon-distributor",
    brand: "SAV Chemicals / MXBON",
    title: "Authorized distributor",
    detail: "RB Traders · MXBON products and services for Pune / PCMC",
    group: "authorizations",
    image: "/certificates/sav-chemicals-mxbon-distributor.jpeg",
    width: 1213,
    height: 864,
  },
  {
    id: "gates-2026",
    straighten: true,
    brand: "Gates",
    title: "Authorized distributor",
    detail: "January–December 2026 · Industrial power transmission products",
    group: "authorizations",
    image: "/certificates/gates-distributor-2026.jpeg",
    width: 1280,
    height: 976,
    frame: {
      width: 1280,
      height: 916,
      sourceCorners: [[60, 40], [1277, 40], [1277, 928], [15, 930]],
    },
  },
  {
    id: "pix-2026-27",
    straighten: true,
    brand: "PIX",
    title: "Authorised business partner",
    detail: "FY 2026–27 · Power transmission products",
    group: "authorizations",
    image: "/certificates/pix-business-partner-2026-27.jpeg",
    width: 1280,
    height: 954,
    frame: {
      width: 1280,
      height: 916,
      sourceCorners: [[5, 40], [1272, 24], [1272, 943], [5, 944]],
    },
  },
  {
    id: "pidilite-2027",
    brand: "Pidilite / WD-40",
    title: "Authorized channel partner",
    detail: "Valid to 31 March 2027 · Pune, Chakan & Talegaon",
    group: "authorizations",
    image: "/certificates/pidilite-channel-partner-2027.jpeg",
    width: 992,
    height: 1280,
  },
  {
    id: "jk-fenner-2025-26",
    brand: "JK Fenner",
    title: "Authorised dealer",
    detail: "April 2025–March 2026 · V-belt range",
    group: "authorizations",
    image: "/certificates/jk-fenner-dealer-2025-26.jpeg",
    width: 988,
    height: 1280,
  },
  {
    id: "pidilite-ibs-2014-15",
    brand: "Pidilite IBS",
    title: "Authorised reseller",
    detail: "April 2014–March 2015 · Chakan, Pune",
    group: "authorizations",
    image: "/certificates/pidilite-ibs-reseller-2014-15.jpeg",
    rotation: -90,
    width: 719,
    height: 1280,
    frame: {
      width: 1280,
      height: 916,
      sourceCorners: [[714.03, 158.09], [668.26, 986.24], [64.68, 1036.5], [62.99, 104.99]],
    },
  },
  {
    id: "wd40-platinum-2022-23",
    straighten: true,
    brand: "WD-40 / Pidilite",
    title: "Platinum Club certificate",
    detail: "FY 2022–23 · Platinum program qualification",
    group: "recognition",
    image: "/certificates/wd40-platinum-club-2022-23.jpeg",
    width: 1280,
    height: 895,
    frame: {
      width: 1180,
      height: 790,
      sourceCorners: [[97, 98], [1181, 84], [1251, 830], [73, 856]],
    },
  },
  {
    id: "3m-appreciation",
    straighten: true,
    brand: "3M",
    title: "Certificate of appreciation",
    detail: "Recognition for driving the safety culture in India",
    group: "recognition",
    image: "/certificates/3m-appreciation.jpeg",
    width: 1280,
    height: 1067,
    frame: {
      width: 1280,
      height: 916,
      sourceCorners: [[44, 162], [1273, 135], [1274, 1014], [16, 1017]],
    },
  },
  {
    id: "indiamart-trust-seal",
    brand: "IndiaMART",
    title: "Trust Seal certificate",
    detail: "January 2026–August 2027 · Certificate ID 68585",
    group: "recognition",
    image: "/certificates/indiamart-trust-seal-2027.jpeg",
    width: 1209,
    height: 1600,
  },
  {
    id: "wd40-platinum-recognition",
    brand: "WD-40",
    title: "Platinum Club recognition",
    detail: "Award presentation photograph",
    group: "recognition",
    image: "/certificates/wd40-platinum-club-recognition.jpeg",
    width: 600,
    height: 800,
    previewCropPosition: "center 45%",
  },
];
export const appreciationCertificates = dealerCertificates.filter((certificate) =>
  ["wd40-platinum-2022-23", "3m-appreciation", "indiamart-trust-seal", "wd40-platinum-recognition"].includes(certificate.id),
);
export const authorizationCertificates = dealerCertificates.filter(
  (certificate) => !appreciationCertificates.includes(certificate),
);
export const appreciationContent = {
  eyebrow: "Awards & recognition",
  title: "Appreciation certificates",
  description: "Certificates of appreciation, recognition and trust from our industry partners.",
};

export const getBrandLogo = (brand: string) => brandLogos[brandLogoAliases[brand] ?? brand];
export const justdialReviews = {
  title: "Customer reviews",
  description: "Customer feedback on our products and service.",
  invitationTitle: "Share your experience",
  source: "Justdial",
  scriptSrc: "https://www.justdial.com/Jd-Widget",
  badgeStyle: "b1",
  badgeCode: "Y3RyY3QlNDAlNDAlNDAwMjBQWFgyMCUyQlhYMjAlMkIxNzAxMDcxNjQ1NTUlMkJUNUQ0",
  listingUrl: "https://www.justdial.com/Pune/R-B-International-Belting-Nr-Hotel-Sai-Palace-Bhosari-Industrial-Estate/020PXX20-XX20-170107164555-T5D4_BZDET",
  linkLabel: "Read reviews",
  linkAccessibleLabel: "Read reviews on Justdial",
  rating: 5.0,
  reviewCount: 973,
  reviewCountLabel: "ratings",
  ratingsCheckedOn: "2026-10-19",
  loadingText: "Loading Justdial reviews...",
  unavailableText: "Read our customer reviews directly on Justdial.",
};
export const reviewPlatforms = [
  {
    id: "justdial",
    source: justdialReviews.source,
    title: justdialReviews.title,
    description: justdialReviews.description,
    listingUrl: justdialReviews.listingUrl,
    linkLabel: justdialReviews.linkLabel,
    linkAccessibleLabel: justdialReviews.linkAccessibleLabel,
    rating: justdialReviews.rating,
    reviewCount: justdialReviews.reviewCount,
    reviewCountLabel: justdialReviews.reviewCountLabel,
    ratingsCheckedOn: justdialReviews.ratingsCheckedOn,
  },
  {
    id: "google",
    source: "Google",
    title: "Customer reviews",
    description: "Read customer feedback and share your experience on Google.",
    listingUrl: "https://www.google.com/maps/place/R+B+International+Belting/@18.6224152,73.8385942,17z/data=!4m8!3m7!1s0x3bc2b87e4ebf7891:0x9d55af8e16815d4c!8m2!3d18.6224152!4d73.8385942!9m1!1b1!16s%2Fg%2F11f52g4513",
    linkLabel: "Read reviews",
    linkAccessibleLabel: "View RB International on Google Maps",
    rating: 4.9,
    reviewCount: 1021,
    reviewCountLabel: "reviews",
    ratingsCheckedOn: "2026-10-27",
  },
  {
    id: "indiamart",
    source: "IndiaMART",
    title: "Products & enquiries",
    description: "Explore our industrial products and connect with us on IndiaMART.",
    listingUrl: "https://m.indiamart.com/r-btraders-pune/profile.html",
    linkLabel: "View profile",
    linkAccessibleLabel: "View our business profile on IndiaMART",
    rating: 4.3,
    reviewCount: 25,
    reviewCountLabel: "ratings",
    ratingsCheckedOn: "2026-10-19",
  },
] as const;
export type SubCategory = { slug: string; name: string; short: string; types: string[]; brands: string[]; applications: string };
export type Pillar = { key: PillarKey; name: string; kicker: string; description: string; image: "power" | "automation" | "adhesives"; subcategories: SubCategory[]; brands: string[] };
const typeDescriptions: Record<string,string> = {
  "Classical V-Belts":"A, B, C, D, E section for standard industrial drives",
  "Narrow V-Belts":"SPA, SPB, SPC, SPZ for high-power compact drives",
  "Micro V-Belts":"PJ, PK, PL, PM multi-rib for precision equipment",
  "Cogged V-Belts":"Notched profile for better flexibility and heat dissipation",
  "Variable Speed Belts":"Wide-angle belts for adjustable speed drives",
  "Link/Nutlink V-Belts":"Adjustable length, cut to size on site",
  "Banded V-Belts":"Multiple belts joined for heavy-duty shock loads",
};
export const describeType=(name:string)=>typeDescriptions[name] ?? `${name} for industrial equipment, replacement, maintenance and new machine builds. Ask our team for brand, size and application guidance.`;
const sub=(slug:string,name:string,short:string,types:string[],brands:string[],applications:string):SubCategory=>({slug,name,short,types,brands,applications});
export const pillars: Record<PillarKey,Pillar> = {
 "power-transmission": { key:"power-transmission",name:"Power Transmission",kicker:"Belts & Drives",image:"power",description:"Belts, pulleys, couplings and tools that keep production lines moving, from one-off replacements to complete drive packages.",brands:["Fenner","Gates","Optibelt","Goodyear Eagle NRG","Continental ContiTech","Megadyne","Carlisle","PIX","Hutchinson","Mitsubishi","Polymaxx"],subcategories:[
  sub("v-belts","V-Belts","Classical, narrow, cogged, banded and variable speed V-belts for industrial drives.",["Classical V-Belts","Narrow V-Belts","Micro V-Belts","Banded V-Belts","Variable Speed Belts","Link/Nutlink V-Belts","Cogged V-Belts"],["Fenner","Gates","Optibelt","PIX","Continental ContiTech","Carlisle","Hutchinson","Goodyear"],"Air Compressors | Centrifugal Pumps | Submersible Pumps | Blowers & Exhaust Fans | Lathe Machines | Milling Machines | Grinding Machines | Textile Looms | Packaging Machines | Conveyor Drives | Crushers & Mixers | HVAC Units | Diesel Generators | Printing Machines | Rice Mill Equipment | Sugar Cane Crushers | Flour Mill Machines"),
  sub("timing-belts","Timing Belts","Rubber, PU, coated and carbon-fibre synchronous belts for accurate power transfer.",["Rubber Timing Belts","PU Timing Belts","PU Coated Timing Belts","Eagle PD Timing Belts","Gates Polychain GT Carbon","Gates Polyflex JB","HTD Belts","Special Timing Belts"],["Gates","Megadyne","Optibelt","Continental ContiTech","Goodyear"],"CNC Routers & Machines | Pick-and-Place Systems | Packaging Lines | Labelling Machines | Printing Presses | Bottling & Filling Lines | Paper Converting Machines | Textile Spinning Frames | Injection Moulding Machines | Medical Diagnostic Equipment | 3D Printers | Laser Cutting Machines | Automatic Doors & Gates | Vending Machines"),
  sub("conveyor-belts","Conveyor Belts","PU, PVC, modular, rubber and food-grade belts for material movement.",["General Purpose Conveyor Belts","PVC Conveyor Belts","PU Conveyor Belts","Both Side Fabric Conveyor Belts","Cleated & Sidewall Conveyor Belts","Diamond PVC Conveyor Belts","Ruff-Tuff Conveyor Belts","PVC V-Guide Center Profile","Cotton Conveyor Belts","Teflon Conveyor Belts","Rubber Conveyor Belts","Sugar Boiler Belts","Stone Crusher Belts","Bucket Elevator Belts","Alligator Joint Belts"],["Megadyne","Habasit","Polymaxx","Continental ContiTech"],"Food Processing Lines | Pharmaceutical Conveyance | Airport Baggage Handling | Warehouse Sorting | Bottling Plants | Cement & Mining Transport | Packaging End-of-Line | Logistics & Distribution | Grain & Agro Processing"),
  sub("caterpillar-belts","Caterpillar Belts","Caterpillar haul-off belts for gripping and pulling extruded products through production lines.",["Caterpillar Haul-Off Belts"],[],"Pipe Extrusion Lines | Cable Extrusion Lines | Profile Extrusion Lines"),
  sub("flat-belts","Flat Belts","High-efficiency flat transmission, steel cord, round PU and woven belts.",["Flat Transmission Belts","Steel Cord Flat Belts","Round PU Cords/Belts","Woven Belts"],["Megadyne","Hutchinson","Polymaxx"],"High-Speed Spindle Drives | Woodworking Planers & Saws | Textile Ring Frames | Paper Mill Rollers | Polishing & Buffing Machines | Leather Processing Equipment | Card Clothing Machines | Light-Duty Conveying | Envelope & Stationery Machines | Tobacco Processing Equipment"),
  sub("pulleys-and-bushes","V-Pulleys & Bushes","Precision timing and V-pulleys with taper lock and keyless bushes.",["Timing Pulleys","CI Timing Pulleys","V-Pulleys","Taper Lock Bushes","Keyless Bushes"],["Fenner","Gates","PIX"],"All V-Belt Driven Equipment | All Timing Belt Driven Equipment | Motor-to-Shaft Power Transmission | Speed Reduction/Increase Assemblies | Conveyor Head & Tail Drums | Machine Tool Spindles | Pump Drive Assemblies | Fan & Blower Shaft Assemblies"),
  sub("couplings","Couplings","Flexible, servo and encoder couplings for reliable shaft connection.",["Eurogrip Flexible Couplings","Servo Couplings","Encoder Couplings","Star Couplings","S-P Wrap Flex / Spider Couplings","Cushion Star Couplings","HRC Couplings","Pin-bush Couplings","Tyre Couplings","Gear Couplings","Resilient Grid Couplings"],["Gates","Fenner","Polymaxx"],"Motor-to-Gearbox Connections | Servo Motor Shaft Linkage | Encoder Feedback Systems | CNC Spindle Drives | Pump-to-Motor Coupling | Conveyor Drive Units | Stepper Motor Assemblies | Precision Positioning Systems"),
  sub("accessories","Accessories & Tools","Tension testers, maintenance tools, cleaners and rust preventives.",["Belt Tension Testers","Maintenance Tools","Rust Preventives & Cleaners","Digital Tension Meter","X’Align Laser-guided Pulley Alignment Tool","PIX Service Kit","Collapsible Belt Length Measure","Belt Length Measurer","Analog Tension Tester","Belt Profile Gauge","PIX Belt Kit","Pulley Gauges","PIX Pentagon (Poly-V Belt Gauge)","PIX Pentagon (Timing Belt Gauges)","Banded Pulley Gauges"],["Gates","Fenner","WD-40","CRC"],"Belt Tension Measurement (all belt types) | Preventive Maintenance Checks | Belt Installation & Alignment | Rust Prevention on Shafts, Pulleys & Machine Surfaces | Bearing & Coupling Cleanup | Drive System Inspection") ]},
 automation:{key:"automation",name:"Automation & Motion Control",kicker:"Precision components",image:"automation",description:"Linear motion, robotics, motors and controllers for machine builders and production teams upgrading speed, accuracy and repeatability.",brands:["Gates","Megadyne","Polymaxx","Mitsubishi"],subcategories:[
  sub("linear-motion","Linear Motion Systems","Ball screws, guideways, shafts and rack systems for accurate movement.",["Ball Screws","Ball Screw Support Units","Linear Guideways","Linear Shafts","Racks & Pinions"],["Mitsubishi","Polymaxx"],"CNC Milling Machines | CNC Routers (Wood, Stone, Metal) | Laser Cutting Machines | Plasma Cutting Tables | 3D Printers (Industrial) | Pick-and-Place Gantries | Wafer Handling (Electronics) | PCB Drilling Machines | Coordinate Measuring Machines (CMM) | Engraving Machines | Glass Cutting Tables | Die Cutting Machines"),
  sub("robotics","Robotics & Actuators","Gantry robots, XYTH systems and mono stages for automated handling.",["Gantry Robots/Actuators","XYTH Series","Mono Stage Systems"],["Mitsubishi","Polymaxx"],"Automated Assembly Lines | Material Handling Gantries | Palletizing Systems | Cartesian Pick-and-Place | Dispensing & Gluing Systems | Welding Automation | Sorting & Grading Lines | Vision-Guided Inspection Stations | Loading/Unloading Automation | Multi-Axis Positioning Systems"),
  sub("motors-and-drives","Motors & Drives","Servo, stepper and precision gearbox solutions for controlled motion.",["Servo Motors & Drives","Stepper Motors","Gearbox PAB/PPG/PPGA Series"],["Mitsubishi","Polymaxx"],"CNC Machine Spindles | Robotic Arm Joints | Conveyor Speed Control | Packaging Machine Indexing | Textile Winding Machines | Label Applicators | Rotary Tables | Automatic Sliding Doors | Semiconductor Equipment | Pump & Fan Variable Speed Control | Elevator & Lift Systems"),
  sub("controllers","Controllers","CNC and DSP controllers for coordinated industrial machine control.",["CNC Controllers","DSP Controllers"],["Mitsubishi","Polymaxx"],"CNC Router Control (3-axis, 4-axis) | CNC Engraving Machines | Woodworking CNC Centres | Stone Cutting CNC | Mould Processing CNC | Manual Pulse Generator (MPG) Handwheels for CNC | DSP Offline Control Units | Motion Control Interface Boards") ]},
 adhesives:{key:"adhesives",name:"Industrial Adhesives & Chemicals",kicker:"RB Adhesive Company",image:"adhesives",description:"A complete MRO range covering threadlocking, sealing, structural bonding, tapes, cleaners and specialty maintenance chemicals.",brands:["Pidilite","Loctite","3M","Anabond","Araldite","Amico","Polymaxx","Speb 7","WD-40","Arofine Polymers","SAV Chemicals","Atul","Metlok"],subcategories:[
  sub("threadlockers","Threadlockers & Retaining Compounds","Lock fasteners and secure cylindrical assemblies against vibration.",["Medium Strength Threadlockers","High Strength Threadlockers","Bearing Retainers","Flange Sealants"],["Loctite","Anabond","3M"],"Bolt & Nut Assemblies (all machinery) | Stud Locking on Engines & Pumps | Bearing Retaining on Shafts | Cylindrical Part Fixing | Set Screw Locking | Hydraulic Fitting Sealing | Electrical Panel Fastener Locking"),
  sub("sealants","Silicone Sealants & Gasket Makers","Flexible sealing and formed-in-place gasketing for industrial assemblies.",["RTV Silicone Sealants","Gasket Makers","High Temperature Sealants"],["Boss Silicone","Anabond","Polymaxx"],"Flange Sealing on Pumps & Compressors | Gearbox Gasket Replacement | Engine Covers & Oil Pans | HVAC Duct Sealing | Electrical Enclosure Sealing | Pipe Joint Sealing | Windshield & Glass Bonding | Cold Room & Clean Room Sealing"),
  sub("structural","Structural & Epoxy Adhesives","High-strength bonding for metal, composite, plastic and repair work.",["Two-Part Epoxies","Structural Acrylics","Metal Repair Compounds","Industrial Bonding Adhesives"],["Araldite","Lapox","Loctite","Lord Adhesive","Bond Tide","Metlok","MxBon"],"Metal-to-Metal Bonding | Broken Part Repair | Fixture & Jig Assembly | Machine Base Grouting & Levelling | Crack Filling in Castings | Composite Material Bonding | Tool & Die Repair | Pipe & Tank Leak Repair"),
  sub("general-purpose","General Purpose & Wood Adhesives","Reliable bonding products for wood, maintenance and rapid repairs.",["Wood Adhesives","Instant Adhesives","Construction Chemicals","Contact Adhesives"],["Fevicol","Pidilite IBS","Fevi Kwik","Dr. Fixit","Polygrip"],"Furniture Assembly | Plywood & Laminate Bonding | Packaging Box Making | POP & Interior Work | Tile & Flooring Fixing | Waterproofing Applications | Shoe & Leather Bonding | Paper & Carton Sealing"),
  sub("specialty","Specialty Chemicals & MRO","Cleaners, lubricants, rust preventives, putties and maintenance products.",["Penetrating Lubricants","Electrical Cleaners","Steel Putty","Hot Melt Adhesives","Rust Preventives"],["WD-40","CRC","Speb 7","M-Seal","Arofine Polymers","SAV Chemicals"],"Rust Removal from Machine Surfaces | Bolt & Nut Loosening (Seized Parts) | Contact Cleaning on Electrical Panels | Mould Release Applications | General Lubrication & Penetration | Quick Metal Repair (M-Seal) | Moisture Displacement on Electrical Components | Preventive Spray Coating on Exposed Metal"),
  sub("tapes","Industrial Tapes & Compounds","Industrial tapes and compounds for fixing, masking, sealing and protection.",["Double-Sided Tapes","Foam Tapes","Masking Tapes","Specialty Compounds"],["3M","Polymaxx"],"Surface Mounting & Bonding (replacing screws) | Electrical Insulation & Wrapping | Masking during Paint & Coating | Packaging & Carton Sealing | Floor Marking in Factories | Nameplate & Label Mounting | Heat Shielding & Insulation Wrapping") ]}
};
export const pillarList=Object.values(pillars);
export const allBrands=Array.from(new Set(pillarList.flatMap(p=>p.brands)));
export const industryCoverage = {
  eyebrow: "Industry coverage",
  title: "Industrial Belts, Adhesives & Automation for Every Sector",
  instruction: "Select an industry to explore how we support your production.",
};
export const industries = [
  { name: "Automotive & Auto Components", image: "factory", description: "Belts, drives and motion components for assembly lines and automotive production equipment." },
  { name: "Food & Beverage Processing", image: "belting", description: "Conveyor and drive belt selection for processing, bottling and handling equipment." },
  { name: "Packaging & Printing", image: "automation", description: "Timing belts, motion components and adhesives for packaging and printing machinery." },
  { name: "Pharmaceuticals", image: "automation", description: "Belting and motion components for filling, labelling and packaging equipment." },
  { name: "Textiles & Garments", image: "belting", description: "Drive belts and transmission components for spinning, weaving and textile processing machinery." },
  { name: "Cement, Mining & Heavy Industries", image: "belting", description: "Belts, pulleys and couplings for demanding drives and bulk material handling equipment." },
  { name: "Logistics, Warehousing & Material Handling", image: "automation", description: "Conveyor belts and motion components for sorting, conveying and warehouse handling systems." },
  { name: "OEM & Machine Building", image: "automation", description: "Belting, linear motion and drive components for new machines and equipment upgrades." },
  { name: "General Manufacturing & Job Shops", image: "factory", description: "Replacement belts, maintenance adhesives and drive components for everyday workshop needs." },
] as const;
export const navItems=[{label:"Home",to:"/"},{label:"About",to:"/about"},{label:"Power Transmission",to:"/power-transmission"},{label:"Automation",to:"/automation"},{label:"Adhesives",to:"/adhesives"},{label:"Contact",to:"/contact"},{label:"Franchise",to:"/franchise"}] as const;
export const productTypeAnchor = (name: string) => `type-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
export const searchItems = pillarList.flatMap(pillar => [
  { name: pillar.name, to: `/${pillar.key}`, context: "Product division", keywords: `${pillar.name} ${pillar.kicker}` },
  ...pillar.subcategories.flatMap(sub => [
    { name: sub.name, to: `/${pillar.key}?product=${encodeURIComponent(sub.slug)}`, context: pillar.name, keywords: [sub.name, ...sub.types, ...sub.brands, sub.applications].join(" ") },
    ...sub.types.map(type => ({ name: type, to: `/${pillar.key}?product=${encodeURIComponent(sub.slug)}`, context: `${pillar.name} · ${sub.name}`, keywords: `${type} ${sub.name} ${sub.brands.join(" ")}` })),
    ...sub.brands.map(brand => ({ name: `${brand} — ${sub.name}`, to: `/${pillar.key}?product=${encodeURIComponent(sub.slug)}`, context: pillar.name, keywords: `${brand} ${sub.name} ${sub.types.join(" ")}` })),
  ]),
]).concat(logoBrands.map(brand => ({ name: brand, to: "/#brand-partners", context: "Brand partner", keywords: brand })));

const normalizeSearch = (value: string) => value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
export function searchProducts(query: string) {
  const normalized = normalizeSearch(query);
  if (!normalized) return [];
  const exactMatches = searchItems.filter(item => normalizeSearch(item.name) === normalized);
  if (exactMatches.length) return exactMatches;
  const tokens = normalized.split(/\s+/);
  return searchItems
    .filter(item => {
      const words = normalizeSearch(item.name).split(/\s+/);
      return tokens.every(token => words.some(word => token.length === 1 ? word === token : word.startsWith(token)));
    })
    .map(item => {
      const name = normalizeSearch(item.name);
      const score = name === normalized ? 0 : name.startsWith(normalized) ? 1 : name.includes(normalized) ? 2 : tokens.every(token => name.includes(token)) ? 3 : 4;
      return { item, score };
    })
    .sort((a, b) => a.score - b.score)
    .map(({ item }) => item);
}


// Supplied Google Maps review snapshot, collected 27 October 2026.
export const customerReviews = {
  business: {
    name: 'R B International Belting',
    rating: 4.9,
    total: 1021,
    url: 'https://maps.app.goo.gl/ZxpSzXR6i1a6FpYD9'
  },

  reviews: [
    {
      author: 'Rohit channe',
      rating: 5,
      date: '2026-10-06',
      text: 'Satisfied with the product quality The belt runs smoothly and has good strength and durability.'
    },
    {
      author: 'Gaurav Washimkar',
      rating: 5,
      date: '2026-10-06',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXFYZC5aRl2aRhI8y-IImmUQaahz_Okw3XTGXXxYqGTzezyWuK3',
      text: 'Excellent service and very fast good comunication',
      photos: [
        'https://lh3.googleusercontent.com/grass-cs/AABkmLezAoMaBql8nsi_kI0tAKsIzpaLuqNXIXKjrl4OXtaAk4UGq_WsQJrRlriO0roluL7ZxOppaJBWq1hmEbdlCD5GSX8_93_veatUEzrBU-OnokWYXBbY-jPU5oiTvnO7xCNL67X7Udj2Pjw1'
      ]
    },
    {
      author: 'Eknath Pore',
      rating: 5,
      date: '2026-09-27',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXtLC9c6gbDBZtOrFozsBhRBXBULk6M0faedEF1h3SMjI0e-3c4',
      text: 'Good quality v- belt with perfect fitting smooth operation and reliable performance durable and suitable for industrial use.'
    },
    {
      author: 'Aniket Parande',
      rating: 5,
      date: '2026-09-27',
      text: 'Excellent v belt quality with proper fitting smooth running and good durability reliable for regular industrial use'
    },
    {
      author: 'Ravinder Suryawanshi',
      rating: 5,
      date: '2026-09-27',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXl58yXSGO70zwosnSs6vF2ShC7ym__AIhQR0keWojLvb38lsin',
      text: 'Excellent conveyor belt quality with strong material proper fitting and smooth movement reliable for continuous industries use'
    },
    {
      author: 'mahesh gurav',
      rating: 5,
      date: '2026-09-27',
      text: 'Good quality pully with precise fitting smooth rotation and durable construction reliable for industrial applications'
    },
    {
      author: 'Atul desai',
      rating: 5,
      date: '2026-06-27',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjXOotP60d-XqULFRvMuDhs2n8FBcwbwa1eZzuSCSWiQzHLNuGE',
      text: 'They have all types and all sizes belts at reasonable rates. And very fast service.'
    },
    {
      author: 'Manjeet Singh',
      rating: 5,
      date: '2026-02-27',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjWUtMsxIq4UIf2jAhQdAEGoUU_f_CZ2or8jiWHMQSFdJVju47Q',
      text: 'I’m glad to rate this store. Great and reliable products available here. All range of timing belts available at competitive prices.',
      photos: [
        'https://lh3.googleusercontent.com/grass-cs/AABkmLdvTUWiEyXEZokJPQPw6F54Gv3Utp2UmuAAho81KeXz5nlm_cp3B_cE5E6dzsuokP4gYTnL1ABh71Y0_KNKQeNy6rXCsKG0mTHSB836CG_3K1scAeEzY4KXi3T7iyB6gqVFCR2lGZ9sJDM7'
      ]
    },
    {
      author: 'Dhiraj Vikas Shinde',
      rating: 5,
      date: '2026-01-27',
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjVr-OuB4nvEvUhGVrxWuaDNsZmHPVgFTXFrdXTPijNrPGK68j8eaA',
      text: 'Excellent quality products and reliable service. R B International Belting Company provides durable and high-performance belts. Their team is professional, responsive, and always delivers on time. Highly recommended.',
      photos: [
        'https://lh3.googleusercontent.com/grass-cs/AABkmLdoHGTomUAzm6Wm17BHCDFDN0h_rUqJCJLNg7O5CcT8UbQ9U1qnxAwRfjtb_ga92yKr-5EN7rDo-nYs-QmxjgKqxO6HCKN1HYGdBkwN3EtmGzPsRYo1-k0LFr418ih1zvTF2qi7wA8-AzUR'
      ]
    }
  ]
};

// Family-level guidance: selection inputs, not promised model specifications or stock.
export type RangeGuidance = {
  explanation: string;
  selection: readonly string[];
  question: string;
  answer: string;
  related: readonly string[];
};
export const rangeGuidance: Record<string, RangeGuidance> = {
  "v-belts": {
    explanation: "V-belts transmit power through friction between the belt and pulley grooves. Match the belt section and length reference to the pulley and drive before choosing a replacement.",
    selection: ["Existing belt marking, section and length reference", "Pulley groove profile, drive speed, power and number of belts", "Temperature, contamination and whether a matched set is required"],
    question: "Is a V-belt interchangeable with a timing belt?",
    answer: "No. A timing belt uses teeth engaging with a matching pulley, while a V-belt runs in grooves. The pulley and drive design determine which belt is suitable.",
    related: ["timing-belts", "pulleys-and-bushes", "accessories"],
  },
  "timing-belts": {
    explanation: "Synchronous timing belts use teeth and a matching pulley profile to coordinate shaft movement. The tooth profile, pitch and width must suit the drive; the existing part code is the best starting point.",
    selection: ["Belt code, tooth profile, pitch, tooth count or specified length, and width", "Pulley details, drive power, speed and positioning requirement", "Existing construction and environmental conditions"],
    question: "What does timing belt pitch mean?",
    answer: "Pitch is the spacing between adjacent belt teeth. Matching pitch alone is insufficient: tooth shape, width and pulley compatibility must also be checked against the manufacturer specification.",
    related: ["pulleys-and-bushes", "linear-motion", "motors-and-drives"],
  },
  "conveyor-belts": {
    explanation: "Conveyor belts carry materials between process stages. Select the surface, construction and joint for the conveyed product, loading, cleaning method and conveyor geometry.",
    selection: ["Belt width, length, thickness and existing material or code", "Conveyed material, load, speed, incline and roller diameter", "Joint, cleats, sidewalls, cleaning chemicals and any required food-contact documentation"],
    question: "Can any PU or PVC belt be used for food contact?",
    answer: "Do not assume suitability from the material name. Request the selected manufacturer's documentation for the exact belt and intended contact, cleaning and temperature conditions.",
    related: ["flat-belts", "caterpillar-belts", "accessories"],
  },
  "caterpillar-belts": {
    explanation: "Caterpillar haul-off belts grip and pull extruded pipe, cable or profiles along a production line. Contact surface and geometry need to match the haul-off machine and the product being pulled.",
    selection: ["Machine model, existing belt reference, dimensions and drawing", "Extruded product, line speed and pulling load", "Contact-surface requirements and operating temperature"],
    question: "What information identifies a replacement haul-off belt?",
    answer: "Provide the existing code or drawing, belt dimensions, machine details and photographs of the contact surface and drive side. Confirm construction and fit before ordering.",
    related: ["conveyor-belts", "timing-belts"],
  },
  "flat-belts": {
    explanation: "Flat transmission belts transfer motion between compatible pulley surfaces. Choose the construction and dimensions for the drive; a conveyor belt and a transmission belt are not automatically interchangeable.",
    selection: ["Existing belt code, width, thickness and length", "Pulley dimensions, drive speed, power and joint arrangement", "Contact surface, tensioning method and operating environment"],
    question: "How do flat transmission belts differ from conveyor belts?",
    answer: "Transmission belts primarily transfer power, while conveyor belts primarily carry materials. Suitability depends on the machine, construction and manufacturer specification rather than appearance alone.",
    related: ["conveyor-belts", "v-belts", "accessories"],
  },
  "pulleys-and-bushes": {
    explanation: "Pulleys engage the belt and set the drive ratio. Bushes connect compatible hubs to shafts. Belt profile, pulley geometry and shaft fit must be checked together.",
    selection: ["V-groove section or timing tooth profile and pitch", "Pulley diameter, grooves or tooth count, and belt width", "Shaft diameter, keyway, hub dimensions and bush reference"],
    question: "Is the shaft diameter enough to choose a taper lock bush?",
    answer: "No. The bush series, matching hub, bore, keyway and application loads must also suit the assembly. Share the existing bush reference or a dimensioned drawing.",
    related: ["v-belts", "timing-belts", "couplings"],
  },
  "couplings": {
    explanation: "Shaft couplings connect rotating components. Coupling selection depends on torque, speed, shaft geometry and the permitted misalignment or positioning behaviour of the application.",
    selection: ["Both shaft diameters, keyways and space between shaft ends", "Torque or motor power, operating speed and load changes", "Alignment, backlash requirement, environment and existing coupling code"],
    question: "Can a flexible coupling replace correct shaft alignment?",
    answer: "No. Flexible elements accommodate only the limits specified by their manufacturer. Confirm alignment and installation requirements for the selected coupling.",
    related: ["motors-and-drives", "linear-motion", "pulleys-and-bushes"],
  },
  "accessories": {
    explanation: "Belt measuring, tension and pulley-alignment tools help identify replacement parts and maintain belt drives. Choose the instrument and procedure for the belt and machine involved.",
    selection: ["Belt type, drive layout and measurement task", "Required measurement range and manufacturer tensioning instructions", "Instrument reference and any calibration or service requirements"],
    question: "Is there one correct tension for every industrial belt?",
    answer: "No. Tension depends on the belt, span and drive design. Use the belt or machine manufacturer's specified method and values for the exact installation.",
    related: ["v-belts", "timing-belts", "pulleys-and-bushes"],
  },
  "linear-motion": {
    explanation: "Linear motion systems guide or drive movement along a straight path. Guideways support and constrain motion; ball screws convert rotary movement into linear travel.",
    selection: ["Existing guideway or screw code and a dimensioned drawing", "Load, travel, mounting orientation and required positioning behaviour", "Screw lead, drive speed, end supports, lubrication and environmental conditions"],
    question: "What is the lead of a ball screw?",
    answer: "Lead is the linear travel produced by one screw revolution. It affects the relationship between motor speed and travel speed; load, accuracy and support details still need to be checked.",
    related: ["motors-and-drives", "couplings", "robotics"],
  },
  "robotics": {
    explanation: "Gantry robots and actuators move loads between defined positions in automated processes. The axis arrangement and controls must be matched to the task and machine integration.",
    selection: ["Payload including tooling, travel on each axis and cycle requirement", "Mounting orientation, available space and working environment", "Controller, feedback, safety and integration requirements"],
    question: "What should a gantry enquiry include?",
    answer: "Share the task, payload, travel, required cycle, machine drawing and existing control system. Final configuration requires a review of the mechanical and control requirements.",
    related: ["linear-motion", "motors-and-drives", "controllers"],
  },
  "motors-and-drives": {
    explanation: "Motors and drives provide controlled rotary motion. The motor, drive, feedback and any gearbox must work together with the load and control system.",
    selection: ["Existing motor and drive codes, supply and controller interface", "Load torque, speed range, acceleration and operating cycle", "Mounting, shaft, feedback, brake and gearbox details where applicable"],
    question: "Can a servo drive be selected only from motor power?",
    answer: "No. Electrical ratings, feedback, control interface, duty and manufacturer compatibility also matter. Share both motor and drive references when replacing an installed system.",
    related: ["controllers", "couplings", "linear-motion"],
  },
  "controllers": {
    explanation: "Machine controllers coordinate motion and process signals. Replacement or integration requires matching the axis functions, drive interface, feedback and machine software requirements.",
    selection: ["Machine type, controller code, axis count and existing software", "Drive interfaces, feedback and input/output requirements", "Program format, operator interface and integration documentation"],
    question: "What is needed to check controller compatibility?",
    answer: "Provide the machine and controller references, wiring/interface documents and the required process functions. A similar enclosure or connector does not establish compatibility.",
    related: ["motors-and-drives", "robotics", "linear-motion"],
  },
  "threadlockers": {
    explanation: "Threadlockers help secure threaded fasteners against loosening. Select the grade for the fastener material, size, required removal method and service conditions.",
    selection: ["Fastener material, diameter and existing grade", "Required strength, disassembly method and service temperature", "Surface cleanliness, coatings and curing requirements"],
    question: "Is the strongest threadlocker always the best choice?",
    answer: "No. Strength and removal method must suit the joint and maintenance plan. Check the manufacturer's technical data sheet for the actual fastener and service conditions.",
    related: ["sealants", "general-purpose", "specialty"],
  },
  "sealants": {
    explanation: "Industrial sealants help prevent leakage through specified joints. The joint design, gap, fluids and temperature determine which sealing chemistry is suitable.",
    selection: ["Joint type, substrate materials and gap", "Fluid or gas exposure, pressure and temperature conditions", "Required cure time, disassembly and existing product grade"],
    question: "Can one sealant be used on every threaded or flange joint?",
    answer: "No. Joint geometry, materials and exposure conditions differ. Select against the manufacturer's data sheet and the requirements of the actual assembly.",
    related: ["threadlockers", "general-purpose", "structural"],
  },
  "general-purpose": {
    explanation: "Wood, contact and instant adhesives serve different bonding tasks. Select a product for the actual substrates, joint design and service conditions rather than treating all general-purpose adhesives as equivalent.",
    selection: ["Substrate materials, porosity, coatings and joint gap", "Indoor or outdoor exposure, moisture and expected load", "Assembly time, clamping, curing conditions and existing product reference"],
    question: "Can wood adhesive and instant adhesive be used interchangeably?",
    answer: "No. Their application and curing requirements differ. Confirm the chosen grade for the actual substrates, bond area and service conditions using the manufacturer's technical data sheet.",
    related: ["structural", "tapes", "specialty"],
  },
  "structural": {
    explanation: "Structural adhesives bond components through a prepared joint. Substrates, joint design, load and curing conditions must be considered together rather than selecting by brand alone.",
    selection: ["Both substrates, coatings, bond area and joint gap", "Load type, vibration, fluids and service temperature", "Surface preparation, working time and cure process"],
    question: "Can an adhesive bond any two materials without preparation?",
    answer: "No. Surface condition and material compatibility affect bonding. Use the chosen manufacturer's technical data sheet and validate the proposed joint in the intended application.",
    related: ["sealants", "tapes", "specialty"],
  },
  "specialty": {
    explanation: "Maintenance chemicals include cleaners, lubricants and repair products with different functions. Choose the product for the substrate, contamination and operating conditions, with its safety data sheet available.",
    selection: ["Maintenance task, substrate and contamination", "Temperature, electrical isolation and material-compatibility requirements", "Existing grade, application method and technical/safety data sheets"],
    question: "Can any electrical cleaner be used on an energized panel?",
    answer: "Do not assume this is safe. Follow the equipment isolation procedure and the exact cleaner's safety and technical instructions before use.",
    related: ["threadlockers", "structural", "accessories"],
  },
  "tapes": {
    explanation: "Industrial tapes join, mask or protect surfaces depending on their backing and adhesive. Surface energy, contact pressure, load and exposure conditions affect selection.",
    selection: ["Substrates, surface finish and tape width", "Load direction, temperature, moisture and chemical exposure", "Required thickness, removability and surface preparation"],
    question: "Does tape width alone determine bond suitability?",
    answer: "No. Adhesive compatibility, surface preparation, bond area and service conditions also matter. Confirm the exact tape grade against the manufacturer's technical guidance.",
    related: ["structural", "sealants", "specialty"],
  },
};
export function relatedRanges(sub: SubCategory) {
  return (rangeGuidance[sub.slug]?.related ?? []).flatMap(slug =>
    pillarList.flatMap(pillar => pillar.subcategories.filter(item => item.slug === slug).map(item => ({
      name: item.name, to: `/${pillar.key}/${item.slug}`,
    }))),
  );
}
export const rangeGuidanceContent = {
  title: "Selection and application guidance",
  inputsTitle: "Details to include in your enquiry",
  relatedTitle: "Related components",
  disclaimer: "Exact size, material, compatibility and availability are confirmed against the selected manufacturer's documentation. No model-specific specification is implied by this range page.",
};

export const industryProductLinks = {
  factory: [{name: "Conveyor Belts", to: "/power-transmission/conveyor-belts"}, {name: "Couplings", to: "/power-transmission/couplings"}],
  belting: [{name: "V-Belts", to: "/power-transmission/v-belts"}, {name: "Conveyor Belts", to: "/power-transmission/conveyor-belts"}],
  automation: [{name: "Linear Motion Systems", to: "/automation/linear-motion"}, {name: "Motors & Drives", to: "/automation/motors-and-drives"}],
} as const;
