import powerDivisionPhoto from "@/assets/power-transmission.jpg";
import automationDivisionPhoto from "@/assets/automation.jpg";
import adhesivesDivisionPhoto from "@/assets/adhesives.jpg";
import classicalDivisionPhoto from "@/assets/v-belts/classical-clean.jpg";
import coggedDivisionPhoto from "@/assets/v-belts/cogged-clean.jpg";
import factoryPhoto from "@/assets/factory-hero.jpg";
import bandedPhoto from "@/assets/v-belts/banded-clean.jpg";
import narrowPhoto from "@/assets/v-belts/narrow-clean.jpg";
import rbInternationalLogo from "@/assets/rb-logo.jpeg";

const imageDescriptions: Record<string, string> = {
  [factoryPhoto]: "Industrial factory floor with CNC machines and component assembly lines",
  [powerDivisionPhoto]: "Industrial power transmission belts running over metal pulleys beside an electric motor",
  [automationDivisionPhoto]: "Gantry robot and linear motion equipment on an automated manufacturing line",
  [adhesivesDivisionPhoto]: "Technician applying industrial adhesive to a threaded fastener beside gears and a gearbox",
  "/division-images/automation-linear-motion.jpg": "Ball screw assembly and linear guideways with sliding carriages on a CNC machine bed",
  "/division-images/automation-robotics.jpg": "Industrial robotic arm handling a metal component on an automated assembly line",
  "/division-images/automation-servo-drives.jpg": "Servo motors and electronic servo drives for industrial motion control",
  "/division-images/adhesives-threadlocking.jpg": "Blue threadlocking adhesive applied to a metal bolt beside machined flanges",
  "/division-images/adhesives-epoxy-bonding.jpg": "Two-part structural adhesive dispensed through a mixing nozzle along a metal joint",
  "/division-images/adhesives-tapes-sealants.jpg": "Industrial sealing tapes and sealant cartridge beside a bolted pipe flange",
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
};
export const divisionCards: Record<PillarKey, { title: string; description: string; linkLabel: string; photos: readonly DivisionCardPhoto[] }> = {
  "power-transmission": {
    title: "Power Transmission",
    description: "V-belts, timing belts, conveyor belts, pulleys and couplings. Fenner, Gates, Optibelt, PIX, Continental and more.",
    linkLabel: "Explore Belts & Drives",
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
    description: "Ball screws, linear guideways, servo motors, CNC controllers and gantry robots for precision automation.",
    linkLabel: "Explore Automation",
    photos: [
      { src: automationDivisionPhoto, alt: "Automated industrial production equipment" },
      { src: "/division-images/automation-linear-motion.jpg", alt: "Linear guides and ball screw assembly" },
      { src: "/division-images/automation-robotics.jpg", alt: "Robotic arm at an automated assembly cell" },
      { src: "/division-images/automation-servo-drives.jpg", alt: "Servo motors and precision motion-control drives" },
    ],
  },
  adhesives: {
    title: "Adhesives & Chemicals",
    description: "Loctite, Pidilite, 3M, Anabond, WD-40. Threadlockers, sealants, epoxies and MRO chemicals.",
    linkLabel: "Explore Adhesives",
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
export const homeHeroContent = {
  eyebrow: "Authorized Dealers for Fenner | Gates | PIX | Pidilite | Loctite | Since 2003",
  title: "Industrial Belts, Automation & Adhesives Supplier",
  description: "Supplying 500+ manufacturers across Maharashtra, Gujarat, Tamil Nadu, Karnataka, major SEZs and industrial estates. 50+ brands in stock. Exports to Middle East, Australia and Southeast Asia.",
  productsLabel: "View Products",
  divisionsTitleLines: ["V-Belts, Automation Components &", "Industrial Adhesives: Complete Range"],
};
export const serviceBenefits = [
  { title: "Same-Day Dispatch", description: "Stocked items shipped same day from Pune. Serving Maharashtra, Gujarat, Tamil Nadu, Karnataka and export markets." },
  { title: "2-Hour Response", description: "Submit your requirement. Our team gets back within 2 business hours." },
  { title: "Application Support", description: "Share your machine, size, or part code. We help you find the exact match." },
  { title: "Genuine Products Only", description: "Authorized dealer for Gates, Fenner, PIX, Pidilite. No grey market. No duplicates." },
];
export const footerContact = {
  description: "Authorized dealers for Gates, Fenner, PIX, Pidilite. Supplying V-belts, timing belts, conveyor belts, automation components and industrial adhesives to manufacturers across India since 2003.",
  email: "rbtraders1@yahoo.co.in",
  gst: "27AAHFR3595G1ZU",
  hours: "Mon to Sun: 9:30 AM to 6:30 PM",
  serviceAreas: "Serving manufacturers in Pune, Mumbai, Nashik, Aurangabad, Kolhapur, Ahmedabad, Surat, Rajkot, Chennai, Coimbatore, Bangalore, Indore, Kolkata, Hyderabad, Jaipur and export markets in the Middle East, Europe and Australia.",
  address: "Shop No 5, Kamath Complex, Telco Road, Landewadi, Bhosari Industrial Estate, Pune - 411026",
  mapUrl: "https://maps.app.goo.gl/v51wGZH4o8cT1e3D8",
};
export const footerQuickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Power Transmission", to: "/power-transmission" },
  { label: "Automation", to: "/automation" },
  { label: "Adhesives", to: "/adhesives" },
  { label: "Franchise", to: "/franchise" },
  { label: "Contact", to: "/contact" },
];
export const footerProductLinks = [
  [{ label: "V-Belts", to: "/power-transmission/v-belts" }, { label: "Timing Belts", to: "/power-transmission/timing-belts" }],
  [{ label: "Conveyor Belts", to: "/power-transmission/conveyor-belts" }],
  [{ label: "Pulleys", to: "/power-transmission/pulleys-and-bushes" }, { label: "Couplings", to: "/power-transmission/couplings" }],
  [{ label: "Ball Screws & Linear Motion", to: "/automation/linear-motion" }],
  [{ label: "Servo Motors & Drives", to: "/automation/motors-and-drives" }],
  [{ label: "Loctite, Pidilite & 3M Adhesives", to: "/adhesives" }],
];
export const brochureDownloads: Record<string, string> = {
  PIX: "/catalogues/pix-catalogue.pdf",
  TOCO: "/catalogues/toco-catalogue.pdf",
};
// Verified public company details shared by structured data. Placeholder social links are excluded.
export const websiteIdentity = {
  url: "https://www.rbibelting.com",
  name: "RB International Belting & Automation",
  description: "Industrial power transmission products, automation components and industrial adhesives supplied from Pune across India and export markets.",
  telephone: ["+918788195839", "+919890961752"] as const,
  email: [footerContact.email] as const,
  socialProfiles: ["https://www.instagram.com/rbibelting/"],
  address: {
    streetAddress: "Shop No 5, Kamath Complex, Telco Road, Landewadi, Bhosari Industrial Estate",
    addressLocality: "Pune",
    postalCode: "411026",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 09:30-18:30",
};

export const companyValues = [
  { icon: "trust", title: "Trust", description: "20+ years and no compromise on genuine products." },
  { icon: "speed", title: "Speed", description: "2-hour response target and same-day dispatch on stocked items." },
  { icon: "expertise", title: "Technical expertise", description: "We help solve application problems, not just sell parts." },
  { icon: "stock", title: "Stock availability", description: "If it exists, we have it or we can source it." },
] as const;

export const aboutHeroContent = {
  title: "About RB International Belting & Automation, Pune",
  description: "Founded in 2003. 23+ years of supplying V-belts, timing belts, conveyor belts, automation components and industrial adhesives to 500+ manufacturers across India.",
};

export const companyHistory = {
  eyebrow: "Milestones",
  title: "From a belting shop to three industrial divisions",
  milestones: [
    { year: "2003", description: "Founded in Bhosari, Pune as a belting supply firm." },
    { year: "2006", description: "Built authorized dealer relationships with major belting brands." },
    { year: "2010", description: "Expanded into industrial adhesives by adding a dedicated division at RB International Belting & Automation." },
    { year: "2014", description: "Added automation and motion control products." },
    { year: "2018", description: "Crossed 300 active client accounts across Maharashtra." },
    { year: "2020", description: "Expanded service to PAN India and international markets." },
    { year: "2023", description: "Completed 20 years with 500+ active clients and 50+ brand relationships." },
    { year: "2025", description: "Filed trademark for RB International Belting & Automation." },
    { year: "2026", description: "Launched rbibelting.com. Digital transformation and franchise readiness underway." },
  ],
} as const;
export const companyLeadership = [
  {
    name: "Mr. Vishwanath Baigar",
    role: "Partner",
    description: "Mr. Vishwanath brings over two decades of experience in power transmission and industrial supply. His direct relationships with brand principals at Gates, Fenner, PIX and Pidilite, combined with deep technical knowledge of belting applications across automotive, packaging and manufacturing, drive the company’s sales growth and market reputation.",
    portrait: {
      src: "/team/vishwanath-baigar.jpeg",
      width: 983,
      height: 1280,
    },
    note: "",
  },
  {
    name: "Mr. Omprakash D. Rokhade",
    role: "Partner",
    description: "Mr. Omprakash has led RB International Belting & Automation’s operational expansion and client relationships from the start. His focus on inventory management, supply chain reliability and customer service has enabled the company to serve 500+ active accounts across India.",
    portrait: {
      src: "/team/omprakash-rokhade.jpeg",
      width: 1155,
      height: 1362,
    },
    note: "",
  },
] as const;
export const formContent = {
  categoryPlaceholder: "Select a category",
  contactDisclaimer: "By submitting, you agree to be contacted by RB International Belting & Automation regarding your enquiry.",
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
export type ProductShowcasePhoto = { image: string; title: string; note: string; alt?: string };
export const productPhotoShowcases: Record<string, readonly ProductShowcasePhoto[]> = {
  "power-transmission/v-belts": [
    { image: "/product-images/v-belts/banded-v-belts.png", title: "Banded V-Belts", note: "", alt: "Three joined black V-belts shown from the inner cogged side, with reinforcing cords visible at the cut ends." },
    { image: "/product-images/v-belts/classical-v-belts.jpg", title: "Classical V-Belts", note: "", alt: "Looped black classical V-belts arranged in nested circles, with a trapezoidal cross-section visible at the cut end." },
    { image: "/product-images/v-belts/cogged-v-belts.png", title: "Cogged V-Belts", note: "", alt: "Black cogged V-belt curved into a loop, showing transverse notches along its inner surface." },
    { image: "/product-images/v-belts/link-nutlink-v-belts.jpg", title: "Link/Nutlink V-Belts", note: "", alt: "Orange interlocking link belt arranged in a loop, with metal connector pins visible between links." },
    { image: "/product-images/v-belts/micro-v-belts.jpg", title: "Micro V-Belts", note: "", alt: "Black multi-rib micro V-belts shown with the narrow longitudinal ribs visible in cross-section." },
    { image: "/product-images/v-belts/narrow-v-belts.png", title: "Narrow V-Belts", note: "", alt: "Long black narrow-section V-belt arranged in an oval loop, with printed belt markings." },
    { image: "/product-images/v-belts/variable-speed-belts.png", title: "Variable Speed Belts", note: "", alt: "Black variable-speed belt loop showing its toothed inner face and printed belt markings." },
  ],
  "power-transmission/conveyor-belts": [
    { image: "/product-images/conveyor-belts/general-purpose-conveyor-belt.jpg", title: "General Purpose Conveyor Belts", note: "", alt: "Roll of black multi-ply general purpose conveyor belting with a cut end showing its layered construction." },
    { image: "/product-images/conveyor-belts/pvc-conveyor-belts.jpg", title: "PVC Conveyor Belts", note: "", alt: "Roll of green PVC conveyor belting with a smooth top cover and visible fabric reinforcement underneath." },
    { image: "/product-images/conveyor-belts/pu-conveyor-belts.jpg", title: "PU Conveyor Belts", note: "", alt: "Roll of white polyurethane conveyor belting with a pale smooth top surface and fabric backing." },
    { image: "/product-images/conveyor-belts/both-side-fabric-conveyor-belt.jpg", title: "Both Side Fabric Conveyor Belts", note: "", alt: "Gray woven conveyor belt roll with fabric texture visible on both belt surfaces." },
    { image: "/product-images/conveyor-belts/cleated-sidewall-conveyor-belt.jpg", title: "Cleated & Sidewall Conveyor Belts", note: "", alt: "Black conveyor belt with raised transverse cleats and a raised sidewall profile, shown rolled out." },
    { image: "/product-images/conveyor-belts/diamond-pvc-conveyor-belt.jpg", title: "Diamond PVC Conveyor Belts", note: "", alt: "Green PVC conveyor belt roll with a raised diamond-pattern surface and fabric backing." },
    { image: "/product-images/conveyor-belts/ruff-tuff-conveyor-belt.jpg", title: "Ruff-Tuff Conveyor Belts", note: "", alt: "Black rough-top conveyor belt roll with a coarse textured carrying surface and fabric backing." },
    { image: "/product-images/conveyor-belts/cotton-conveyor-belts.jpg", title: "Cotton Conveyor Belts", note: "", alt: "Roll of light-colored woven cotton conveyor belting with its textile surface visible." },
    { image: "/product-images/conveyor-belts/teflon-conveyor-belts.png", title: "Teflon Conveyor Belts", note: "", alt: "Tan PTFE-coated fabric conveyor belts shown as several rolled and folded lengths." },
    { image: "/product-images/conveyor-belts/rubber-conveyor-belt.jpg", title: "Rubber Conveyor Belts", note: "", alt: "Roll of black rubber conveyor belting with a cut end showing multiple reinforcement layers." },
    { image: "/product-images/conveyor-belts/alligator-joint-conveyor-belt.jpg", title: "Alligator Joint Belts", note: "", alt: "Black conveyor belt roll with a metal alligator-laced mechanical fastener across the cut end." },
    { image: "/product-images/conveyor-belts/bucket-elevator-belts.jpg", title: "Bucket Elevator Belts", note: "", alt: "Bucket elevator belt system showing attached elevator buckets traveling around a pulley." },
  ],
};
export const upcomingRange = {
  eyebrow: "In-House Range",
  title: "RB International Belting & Automation: Our Own Product Line",
  description: "Select automation components and industrial belts designed, tested and supplied directly by RB International Belting & Automation.",
  linkLabel: "Enquire About Our Range",
  href: "/contact",
  detailsTitle: "Our Product Range",
  focusAreas: [
    {
      title: "Automation Components",
      description: "Servo drives, controllers and motion components for CNC machines and industrial automation applications.",
    },
    {
      title: "Industrial Belts",
      description: "Select belt profiles manufactured to our specifications for OEM and replacement requirements.",
    },
  ],
  interestTitle: "Interested in distributing RB International Belting & Automation products in your city?",
  franchiseLabel: "Explore Franchise",
  franchiseHref: "/franchise",
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
  "RB International Belting & Automation": { src: rbInternationalLogo },
};
const brandLogoAliases: Record<string, string> = {
  "Goodyear Eagle NRG": "Goodyear",
  "Pidilite IBS": "Pidilite",
  "Bond Tide": "Bondtite",
};
// Describe the logo and its catalogue context without implying unverified authorization.
export const brandLogoAltText: Record<string, string> = {
  "Gates": "Gates logo — industrial drive belts",
  "Fenner": "Fenner logo — V-belts and power transmission products",
  "PIX": "PIX logo — industrial belts and belt maintenance tools",
  "Pidilite": "Pidilite logo — adhesives and bonding products",
  "Optibelt": "Optibelt logo — industrial power transmission belts",
  "Goodyear": "Goodyear logo — industrial drive belts",
  "Continental ContiTech": "Continental ContiTech logo — drive belts and conveyor belting",
  "Megadyne": "Megadyne logo — timing belts and power transmission products",
  "Carlisle": "Carlisle logo — industrial drive belts",
  "Hutchinson": "Hutchinson logo — power transmission belts",
  "Mitsuboshi": "Mitsuboshi logo — industrial belting",
  "Polymaxx": "Polymaxx logo — industrial belts, motion components and adhesives",
  "Loctite": "Loctite logo — threadlockers and industrial adhesives",
  "3M": "3M logo — industrial adhesives and tapes",
  "Anabond": "Anabond logo — threadlockers and silicone sealants",
  "Araldite": "Araldite logo — structural and epoxy adhesives",
  "Amico": "Amico logo — industrial adhesives",
  "Speb 7": "Speb 7 logo — adhesives and maintenance chemicals",
  "WD-40": "WD-40 logo — lubricants and maintenance products",
  "Arofine Polymers": "Arofine Polymers logo — adhesives and maintenance chemicals",
  "SAV Chemicals": "SAV Chemicals logo — industrial adhesives and chemicals",
  "Atul": "Atul logo — industrial bonding products",
  "Metlok": "Metlok logo — structural and epoxy adhesives",
  "Bondtite": "Bondtite logo — structural bonding adhesives",
  "Dr. Fixit": "Dr. Fixit logo — waterproofing and construction chemicals",
  "Fevicol": "Fevicol logo — wood and general-purpose adhesives",
  "Ecodrive": "Ecodrive logo — industrial products",
  "Lapox": "Lapox logo — epoxy adhesives",
  "Lord Adhesive": "Lord Adhesive logo — structural bonding adhesives",
  "M-Seal": "M-Seal logo — repair putty and sealing compounds",
  "MxBon": "MxBon logo — industrial bonding adhesives",
  "Polygrip": "Polygrip logo — contact adhesives",
  "Bando": "Bando logo — industrial belts",
  "Nitta": "Nitta logo — industrial belting",
  "Habasit": "Habasit logo — conveyor belting",
  "TOCO": "TOCO logo — linear motion products",
  "THK": "THK logo — linear motion products",
  "HIWIN": "HIWIN logo — linear motion products",
  "Rexroth": "Rexroth logo — industrial automation products",
  "ROBOT": "ROBOT logo — linear motion technology",
  "RB International Belting & Automation": "RB International Belting & Automation logo",
};
export const getBrandLogoAlt = (brand: string) =>
  brandLogoAltText[brandLogoAliases[brand] ?? brand] ?? `${brand} logo`;

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
  alt: string;
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
    alt: "SAV Chemicals certificate appointing RB Traders as an authorized MXBON distributor for Pune and PCMC",
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
    alt: "Gates authorized distributor certificate for R.B. Traders, Pune, covering industrial power transmission products in 2026",
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
    alt: "PIX authorized business partner certificate for R B Traders, Chakan, for power transmission products, FY 2026–27",
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
    alt: "Pidilite channel partner certificate for R.B. Traders covering Pune, Chakan and Talegaon, valid to 31 March 2027",
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
    alt: "JK Fenner V-belt dealer certificate for R.B. Traders, Chakan, for April 2025–March 2026",
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
    alt: "Pidilite IBS authorized reseller certificate for R B Traders, Chakan, Pune, for April 2014–March 2015",
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
    alt: "WD-40 and Pidilite Platinum Club certificate recognizing R.B. Traders for qualification in FY 2022–23",
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
    alt: "3M certificate of appreciation awarded to R B Traders for promoting safety culture in India",
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
    alt: "IndiaMART Trust Seal certificate for R B Traders, Maharashtra, issued January 2026 and valid through August 2027",
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
    alt: "Award recipient holding a WD-40 Platinum Club certificate and trophy at a recognition event",
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
    linkAccessibleLabel: "View RB International Belting & Automation on Google Maps",
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
  "Gates Polyflex JB":"Polyurethane belts in 3M, 5M, 7M and 11M pitches, designed for fatigue, wear, heat, oil and chemical resistance",
  "Gates Polyflex JB Belts":"Polyurethane belts in 3M, 5M, 7M and 11M pitches, designed for fatigue, wear, heat, oil and chemical resistance",
  "Rubber Timing Belts":"CTB trapezoidal and HTD/STD profiles, from MXL and XL through XXH and pitches from 3M to 20M",
  "PU Timing Belts":"Polyurethane synchronous belts in T, AT, HTD and CTB profiles, including T2.5, T5, T10, T20, AT5 and AT10 pitches",
  "Eagle PD Timing Belts":"Helical offset tooth timing belts available in 8M and 14M pitches",
  "Gates Polychain GT Carbon":"High-torque Gates Poly Chain GT belts for compact drives; available in 8MGT and 14MGT pitches",
  "Gates Polychain Belts":"High-torque synchronous belts for compact drives, available in 8MGT and 14MGT pitches",
  "Round PU Cords/Belts":"Weldable extruded polyurethane round profiles for power transmission and conveying, in diameters from 3 to 25 mm",
  "Steel Cord Flat Belts":"Flat power transmission belts for high-rpm applications, available in nylon, leather, PVC, PU, rubber and canvas",
};
export const describeType=(name:string)=>typeDescriptions[name] ?? `${name} for industrial equipment, replacement, maintenance and new machine builds. Ask our team for brand, size and application guidance.`;
const sub=(slug:string,name:string,short:string,types:string[],brands:string[],applications:string):SubCategory=>({slug,name,short,types,brands,applications});
export const pillars: Record<PillarKey,Pillar> = {
 "power-transmission": { key:"power-transmission",name:"Power Transmission",kicker:"Belts & Drives",image:"power",description:"Belts, pulleys, couplings and tools that keep production lines moving, from one-off replacements to complete drive packages.",brands:["Fenner","Gates","Optibelt","Goodyear Eagle NRG","Continental ContiTech","Megadyne","Carlisle","PIX","Hutchinson","Mitsuboshi","Bando","Nitta","Habasit"],subcategories:[
  sub("v-belts","V-Belts","Classical, narrow, cogged, banded and variable speed V-belts for industrial drives.",["Classical V-Belts","Narrow V-Belts","Micro V-Belts","Banded V-Belts","Variable Speed Belts","Link/Nutlink V-Belts","Cogged V-Belts"],["Fenner","Gates","Optibelt","PIX","Continental ContiTech","Carlisle","Hutchinson","Goodyear","Bando","Megadyne"],"Air Compressors | Centrifugal Pumps | Submersible Pumps | Blowers & Exhaust Fans | Lathe Machines | Milling Machines | Grinding Machines | Textile Looms | Packaging Machines | Conveyor Drives | Crushers & Mixers | HVAC Units | Diesel Generators | Printing Machines | Rice Mill Equipment | Sugar Cane Crushers | Flour Mill Machines | CNC/VMC/SPM Machines"),
  sub("timing-belts","Timing Belts","Rubber and PU synchronous belts in CTB, HTD, STD and PowerGrip GT profiles, including Poly Chain GT and Eagle PD options for compact, high-torque drives. PU profiles include T and AT pitches.",["Rubber Timing Belts","PU Timing Belts","PU Coated Timing Belts","Eagle PD Timing Belts","Gates Polychain GT Carbon","Gates Polyflex JB","HTD Belts","Special Timing Belts"],["Gates","Megadyne","Optibelt","Continental ContiTech","Goodyear","Bando"],"CNC Routers & Machines | Pick-and-Place Systems | Packaging Lines | Labelling Machines | Printing Presses | Bottling & Filling Lines | Paper Converting Machines | Textile Spinning Frames | Injection Moulding Machines | Medical Diagnostic Equipment | 3D Printers | Laser Cutting Machines | Automatic Doors & Gates | Vending Machines | CNC/VMC/SPM Machines"),
  sub("conveyor-belts","Conveyor Belts","PU, PVC, modular, rubber and food-grade belts for material movement.",["General Purpose Conveyor Belts","PVC Conveyor Belts","PU Conveyor Belts","Both Side Fabric Conveyor Belts","Cleated & Sidewall Conveyor Belts","Diamond PVC Conveyor Belts","Ruff-Tuff Conveyor Belts","PVC V-Guide Center Profile","Cotton Conveyor Belts","Teflon Conveyor Belts","Rubber Conveyor Belts","Sugar Boiler Belts","Stone Crusher Belts","Bucket Elevator Belts","Alligator Joint Belts"],["Megadyne","Habasit","Polymaxx","Continental ContiTech"],"Food Processing Lines | Pharmaceutical Conveyance | Airport Baggage Handling | Warehouse Sorting | Bottling Plants | Cement & Mining Transport | Packaging End-of-Line | Logistics & Distribution | Grain & Agro Processing | Solar Panel Manufacturing | Automotive Assembly Lines | Electronics & PCB Assembly | Beverage & Dairy Canning | Bakery & Confectionery Lines | Seafood & Meat Processing | Corrugated Box & Paper | Textile & Garment Handling | E-Commerce Parcel Sorting | Tyre & Rubber Plants"),
  sub("caterpillar-belts","Caterpillar Belts","Caterpillar haul-off belts for gripping and pulling extruded products through production lines.",["Flat Caterpillar / Feeder Belts","Grooved / Dual-Sided Grooved Belts","Ribbed Caterpillar Belts","Chain Conveyor / Ribbed Caterpillar Belts"],[],"Plastic Pipe & Tube Extrusion | Internet Optic Fibre | Drip Irrigation Systems | Wire & Cable Manufacturing | Aluminium & Steel Profile Extrusion | Rubber Hose & Profile Lines | Wood-Plastic Composite & PVC Profiles | Packaging & Sheet Extrusion Lines"),
  sub("flat-belts","Flat Belts","High-efficiency flat transmission, steel cord, round PU and woven belts.",["Flat Transmission Belts","Steel Cord Flat Belts","Round PU Cords/Belts","Woven Belts"],["Megadyne","Hutchinson","Polymaxx"],"High-Speed Spindle Drives | Woodworking Planers & Saws | Textile Ring Frames | Paper Mill Rollers | Polishing & Buffing Machines | Leather Processing Equipment | Card Clothing Machines | Light-Duty Conveying | Envelope & Stationery Machines | Tobacco Processing Equipment"),
  sub("pulleys-and-bushes","Timing Pulleys, V-Pulleys & Bushes","Precision timing and V-pulleys with taper lock and keyless bushes.",["Timing Pulleys","CI Timing Pulleys","V-Pulleys","Taper Lock Bushes","Keyless Bushes"],["Fenner","Gates","PIX"],"HVAC Blowers & Exhaust Fans | Industrial Air Compressors | Centrifugal & Process Pumps | Conveyor Head & Tail Drives | CNC & Machine Tool Spindles | Packaging & Indexing Machinery | Crushers & Vibrating Screens | Textile Spinning & Weaving Looms | High-Torque Gearbox Reducers | Automated Robotics & Linear Actuators"),
  sub("couplings","Couplings","Flexible, servo and encoder couplings for reliable shaft connection.",["Eurogrip Flexible Couplings","Servo Couplings","Encoder Couplings","Star Couplings","S-P Wrap Flex / Spider Couplings","Cushion Star Couplings","HRC Couplings","Pin-bush Couplings","Tyre Couplings","Gear Couplings","Resilient Grid Couplings"],["Gates","Fenner","Polymaxx"],"Motor-to-Gearbox Connections | Servo Motor Shaft Linkage | Encoder Feedback Systems | CNC Spindle Drives | Pump-to-Motor Coupling | Conveyor Drive Units | Stepper Motor Assemblies | Precision Positioning Systems"),
  sub("accessories","Accessories & Tools","Tension testers, maintenance tools, cleaners and rust preventives.",["Belt Tension Testers","Maintenance Tools","Rust Preventives & Cleaners","Digital Tension Meter","X’Align Laser-guided Pulley Alignment Tool","PIX Service Kit","Collapsible Belt Length Measure","Belt Length Measurer","Analog Tension Tester","Belt Profile Gauge","PIX Belt Kit","Pulley Gauges","PIX Pentagon (Poly-V Belt Gauge)","PIX Pentagon (Timing Belt Gauges)","Banded Pulley Gauges"],["Gates","Fenner","WD-40","CRC"],"Belt Tension Measurement (all belt types) | Preventive Maintenance Checks | Belt Installation & Alignment | Rust Prevention on Shafts, Pulleys & Machine Surfaces | Bearing & Coupling Cleanup | Drive System Inspection") ]},
 automation:{key:"automation",name:"Automation & Motion Control",kicker:"Precision components",image:"automation",description:"Linear motion, robotics, motors and controllers for machine builders and production teams upgrading speed, accuracy and repeatability.",brands:["TOCO","THK","HIWIN","ROBOT","RB International Belting & Automation"],subcategories:[
  sub("linear-motion","Linear Motion Systems","Ball screws, guideways, shafts and rack systems for accurate movement.",["Ball Screws","Ball Screw Support Units","Linear Guideways","Linear Shafts","Racks & Pinions"],["Mitsubishi","Polymaxx","RB International Belting & Automation"],"CNC Milling Machines | CNC Routers (Wood, Stone, Metal) | Laser Cutting Machines | Plasma Cutting Tables | 3D Printers (Industrial) | Pick-and-Place Gantries | Wafer Handling (Electronics) | PCB Drilling Machines | Coordinate Measuring Machines (CMM) | Engraving Machines | Glass Cutting Tables | Die Cutting Machines"),
  sub("robotics","Gantry Robots & Actuators","Gantry robot systems and linear actuators for automated handling.",["TGP Series","XYTH Series","TGH Series","TGPS Series","TGB Series","Mono Stage Systems"],["Mitsubishi","Polymaxx","RB International Belting & Automation"],"Automated Assembly Lines | Material Handling Gantries | Palletizing Systems | Cartesian Pick-and-Place | Dispensing & Gluing Systems | Welding Automation | Sorting & Grading Lines | Vision-Guided Inspection Stations | Loading/Unloading Automation | Multi-Axis Positioning Systems"),
  sub("motors-and-drives","Motors & Drives","Servo, stepper and precision gearbox solutions for controlled motion.",["Servo Motors & Drives","Stepper Motors","Gearbox PAB/PPG/PPGA Series"],["Mitsubishi","Polymaxx","RB International Belting & Automation"],"CNC Machine Spindles | Robotic Arm Joints | Conveyor Speed Control | Packaging Machine Indexing | Textile Winding Machines | Label Applicators | Rotary Tables | Automatic Sliding Doors | Semiconductor Equipment | Pump & Fan Variable Speed Control | Elevator & Lift Systems"),
  sub("controllers","Controllers","CNC and DSP controllers for coordinated industrial machine control.",["CNC Controllers","DSP Controllers"],["Mitsubishi","Polymaxx","RB International Belting & Automation"],"CNC Router Control (3-axis, 4-axis) | CNC Engraving Machines | Woodworking CNC Centres | Stone Cutting CNC | Mould Processing CNC | Manual Pulse Generator (MPG) Handwheels for CNC | DSP Offline Control Units | Motion Control Interface Boards") ]},
 adhesives:{key:"adhesives",name:"Industrial Adhesives & Chemicals",kicker:"RB International Belting & Automation",image:"adhesives",description:"A complete MRO range covering threadlocking, sealing, structural bonding, tapes, cleaners and specialty maintenance chemicals.",brands:["Pidilite","Loctite","3M","Anabond","Araldite","Amico","Polymaxx","Speb 7","WD-40","Arofine Polymers","SAV Chemicals","Atul","Metlok"],subcategories:[
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
  { name: "Automotive & Auto Components", image: "/industry-sector-images/automotive-auto-components.jpg", imageAlt: "Technician operating a control panel beside an automated automotive components assembly line", imageWidth: 1920, imageHeight: 1071, description: "High-torque drive belts, precision linear motion, and structural adhesives for automotive assembly lines." },
  { name: "Food & Beverage Processing", image: "/industry-sector-images/food-beverage.jpg", imageAlt: "Food and beverage production line with blue conveyor belts and stainless steel processing equipment", imageWidth: 1200, imageHeight: 896, description: "Washdown-ready PU/PVC conveyor belts, timing drives, and food-safe sealants for hygienic processing lines." },
  { name: "Packaging & Printing", image: "/industry-sector-images/packaging-printing.jpg", imageAlt: "Packaging production line carrying printed cartons through automated machinery", imageWidth: 1200, imageHeight: 896, description: "Precision timing belts, servo motion systems, and fast-curing adhesives for continuous packaging and print runs." },
  { name: "Pharmaceuticals", image: "/industry-sector-images/pharmaceuticals.jpg", imageAlt: "Pharmaceutical production line with a cleanroom operator handling containers on a conveyor", imageWidth: 1200, imageHeight: 896, description: "Contamination-free conveyor belts, compact linear actuators, and cleanroom MRO solutions for pharma plants." },
  { name: "Textiles & Garments", image: "/industry-sector-images/textiles-garments.jpg", imageAlt: "Textile mill with rows of spinning machinery, yarn and an operator at a control panel", imageWidth: 1200, imageHeight: 896, description: "High-grip flat belts, multi-ribbed V-belts, and drive pulleys built for continuous 24/7 textile mill operation." },
  { name: "Cement, Mining & Heavy Industries", image: "/industry-sector-images/cement-mining-heavy-industries.jpg", imageAlt: "Industrial conveyor transporting aggregate through a heavy processing facility", imageWidth: 1200, imageHeight: 896, description: "Abrasion-resistant rubber conveyor belts, heavy V-drives, and high-load couplings for bulk material handling." },
  { name: "Logistics, Warehousing & Material Handling", image: "/industry-sector-images/logistics-warehousing-material-handling.jpg", imageAlt: "Warehouse sorting system with green conveyor belts, rollers and parcels", imageWidth: 1200, imageHeight: 896, description: "High-friction incline conveyor belts, geared motors, and roller-drive components for automated sorting hubs." },
  { name: "OEM & Machine Building", image: "/industry-sector-images/oem-machine-building.jpg", imageAlt: "Machine builder inspecting a linear motion assembly on an industrial machine", imageWidth: 1920, imageHeight: 1071, description: "Complete motion control packages, synchronous drives, and threadlockers for custom machine builders." },
  { name: "General Manufacturing & Job Shops", image: "/industry-sector-images/general-manufacturing-job-shops.jpg", imageAlt: "Machinist inspecting a metal component beside CNC machines in a job shop", imageWidth: 1920, imageHeight: 1071, description: "Everyday replacement V-belts, taper-lock pulleys, and industrial MRO adhesives for rapid plant maintenance." },
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
  "Automotive & Auto Components": [
    { name: "V-Belts", to: "/power-transmission/v-belts" },
    { name: "Robotics & Actuators", to: "/automation/robotics" },
    { name: "Structural & Epoxy Adhesives", to: "/adhesives/structural" },
  ],
  "Food & Beverage Processing": [
    { name: "Conveyor Belts", to: "/power-transmission/conveyor-belts" },
    { name: "Timing Belts", to: "/power-transmission/timing-belts" },
    { name: "Silicone Sealants & Gasket Makers", to: "/adhesives/sealants" },
  ],
  "Packaging & Printing": [
    { name: "Timing Belts", to: "/power-transmission/timing-belts" },
    { name: "Linear Motion Systems", to: "/automation/linear-motion" },
    { name: "Industrial Tapes & Compounds", to: "/adhesives/tapes" },
  ],
  Pharmaceuticals: [
    { name: "Conveyor Belts", to: "/power-transmission/conveyor-belts" },
    { name: "Linear Motion Systems", to: "/automation/linear-motion" },
    { name: "Specialty Chemicals & MRO", to: "/adhesives/specialty" },
  ],
  "Textiles & Garments": [
    { name: "Flat Belts", to: "/power-transmission/flat-belts" },
    { name: "V-Belts", to: "/power-transmission/v-belts" },
    { name: "V-Pulleys & Bushes", to: "/power-transmission/pulleys-and-bushes" },
  ],
  "Cement, Mining & Heavy Industries": [
    { name: "Conveyor Belts", to: "/power-transmission/conveyor-belts" },
    { name: "V-Belts", to: "/power-transmission/v-belts" },
    { name: "Couplings", to: "/power-transmission/couplings" },
  ],
  "Logistics, Warehousing & Material Handling": [
    { name: "Conveyor Belts", to: "/power-transmission/conveyor-belts" },
    { name: "Motors & Drives", to: "/automation/motors-and-drives" },
    { name: "V-Pulleys & Bushes", to: "/power-transmission/pulleys-and-bushes" },
  ],
  "OEM & Machine Building": [
    { name: "Linear Motion Systems", to: "/automation/linear-motion" },
    { name: "Controllers", to: "/automation/controllers" },
    { name: "Threadlockers & Retaining Compounds", to: "/adhesives/threadlockers" },
  ],
  "General Manufacturing & Job Shops": [
    { name: "V-Belts", to: "/power-transmission/v-belts" },
    { name: "V-Pulleys & Bushes", to: "/power-transmission/pulleys-and-bushes" },
    { name: "Specialty Chemicals & MRO", to: "/adhesives/specialty" },
  ],
} as const;

export const contactFaqs = [
  {
    question: "What details should I share for a fast quotation?",
    answer:
      "Share the product type, brand preference, size or part number, quantity, machine application and delivery location. Photos of existing markings or drawings help our team identify the correct option faster.",
  },
  {
    question: "Do you supply outside Pune?",
    answer:
      "Yes. We supply PAN India with same-day dispatch from Pune. We also export to Middle East, Europe, Australia and Southeast Asia.",
  },
  {
    question: "Can you help if I do not know the exact product code?",
    answer:
      "Yes. Send the application, current product photo, size, pulley or machine details, and our team will help shortlist suitable belting, automation or adhesive options.",
  },
  {
    question: "Are you authorized dealers for Gates and Fenner belts?",
    answer:
      "Yes. We are authorized dealers for Gates, Fenner, PIX, Optibelt, Loctite, Pidilite, 3M, WD-40 and other leading industrial brands. All products are genuine with manufacturer warranty.",
  },
  {
    question: "How quickly will your team respond?",
    answer:
      "Enquiries received during working hours typically get a response within 2-4 hours via phone, email or WhatsApp.",
  },
  {
    question: "What is the minimum order quantity?",
    answer: "No fixed MOQ for most stocked products. For custom or bulk orders, quantities may vary by product and brand. Contact us with your requirement for exact details.",
  },
];

export const mainPageSeo = {
  "/": {
    title: "RB International Belting & Automation | Industrial Belts, Automation & Exports India",
    description: "Leading supplier & exporter of industrial belts, automation components, and adhesives serving Pan-India industrial zones, SEZs, and global markets.",
  },
  "/about": {
    title: "About RB International Belting & Automation | Pan-India Industrial Supplier & Exporter",
    description: "Discover RB International Belting & Automation. We deliver reliable power transmission, automation, and chemical solutions to Indian SEZs, OEMs, and export clients worldwide.",
  },
  "/power-transmission": {
    title: "Power Transmission, V-Belts & Conveyor Belts Exporter India",
    description: "Source high-performance V-belts, timing belts, and conveyor belts in bulk from RB International Belting & Automation. Trusted supplier for Indian industrial hubs, SEZs & exports.",
  },
  "/automation": {
    title: "Industrial Automation & Motion Control Supplier India & SEZ",
    description: "Upgrade factory efficiency with precision automation and motion control components. Fast Pan-India delivery across industrial corridors, SEZs and exports.",
  },
  "/adhesives": {
    title: "Industrial Adhesives & Specialty Chemicals Supplier India",
    description: "High-strength industrial adhesives, sealants, and specialty chemicals for manufacturing units, SEZs, and bulk export orders across India and overseas.",
  },
  "/contact": {
    title: "Contact RB International Belting & Automation | Pan-India & Export Inquiries",
    description: "Connect with RB International Belting & Automation for bulk quotes, technical support, and export logistics across Pan-India industrial zones, SEZs, and global destinations.",
  },
  "/franchise": {
    title: "Industrial Supply & Automation Franchise Opportunities India",
    description: "Partner with RB International Belting & Automation to distribute industrial belts, automation, and adhesives in fast-growing Indian industrial corridors and upcoming SEZs.",
  },
} as const;

// Only named catalogue items opt into Product markup; family pages stay collections.
export const catalogueProductModels = [
  { path: "/power-transmission/timing-belts", name: "Gates Polychain GT Carbon", brand: "Gates" },
  { path: "/power-transmission/accessories", name: "PIX Service Kit", brand: "PIX" },
  { path: "/power-transmission/accessories", name: "PIX Belt Kit", brand: "PIX" },
] as const;

// Public-site crawl policy includes AI search, user retrieval and model-training bots.
export const aiCrawlerUserAgents = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
] as const;
