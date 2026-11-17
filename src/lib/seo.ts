import logo from "@/assets/rb-logo.jpeg";
import {
  footerContact,
  catalogueProductModels,
  pillarList,
  describeType,
  productTypeAnchor,
  websiteIdentity,
  pageImage,
  type Pillar,
} from "@/lib/site-data";

type SchemaNode = Record<string, unknown>;
export const siteUrl = websiteIdentity.url;
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;
const reference = (id: string) => ({ "@id": id });
const businessId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${absoluteUrl(items.at(-1)?.path ?? "/")}#breadcrumb`,
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

function organizationSchema(): SchemaNode {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": businessId,
    name: websiteIdentity.name,
    url: absoluteUrl("/"),
    description: footerContact.description,
    logo: { "@type": "ImageObject", url: absoluteUrl(logo) },
    image: absoluteUrl(logo),
    telephone: websiteIdentity.telephone,
    email: websiteIdentity.email,
    address: { "@type": "PostalAddress", ...websiteIdentity.address },
    openingHours: websiteIdentity.openingHours,
    hasMap: footerContact.mapUrl,
    sameAs: websiteIdentity.socialProfiles,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: websiteIdentity.telephone[0],
      email: websiteIdentity.email[0],
    },
  };
}

function categoryList(pillar: Pillar, url: string): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": `${url}#products`,
    name: pillar.name,
    numberOfItems: pillar.subcategories.length,
    itemListElement: pillar.subcategories.map((sub, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sub.name,
      url: absoluteUrl(`/${pillar.key}/${sub.slug}`),
    })),
  };
}

export function pageStructuredData(title: string, description: string, path: string, extra?: object | object[]) {
  const url = absoluteUrl(path);
  const parts = path.split("/").filter(Boolean);
  const pillar = pillarList.find((entry) => entry.key === parts[0]);
  const sub = pillar?.subcategories.find((entry) => entry.slug === parts[1]);
  const supplied = (Array.isArray(extra) ? extra : extra ? [extra] : []) as SchemaNode[];
  const breadcrumb = supplied.find((node) => node["@type"] === "BreadcrumbList");
  const faq = supplied.find((node) => node["@type"] === "FAQPage");
  const pageType = path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : pillar ? "CollectionPage" : "WebPage";
  const page: SchemaNode = {
    "@type": faq ? [pageType, "FAQPage"] : pageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(pageImage(path).src),
      caption: pageImage(path).alt,
    },
    inLanguage: "en",
    isPartOf: reference(websiteId),
    publisher: reference(businessId),
    ...(breadcrumb ? { breadcrumb: reference(breadcrumb["@id"] as string) } : {}),
    ...(path === "/about" || path === "/contact" ? { about: reference(businessId) } : {}),
    ...(faq ? { mainEntity: faq["mainEntity"] } : {}),
  };
  const nodes: SchemaNode[] = [
    organizationSchema(),
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: absoluteUrl("/"),
      name: websiteIdentity.name,
      description: websiteIdentity.description,
      inLanguage: "en",
      publisher: reference(businessId),
    },
    page,
  ];
  if (breadcrumb) {
    const { "@context": _context, ...node } = breadcrumb;
    nodes.push(node);
  }
  if (pillar && !parts[1]) {
    nodes.push(categoryList(pillar, url));
    page["mainEntity"] = reference(`${url}#products`);
  } else if (pillar && sub) {
    const products = catalogueProductModels.filter(product => product.path === path && sub.types.includes(product.name));
    const productIds = new Map<string, string>(products.map(product => [product.name, `${url}#product-${productTypeAnchor(product.name)}`]));
    nodes.push(...products.map(product => ({
      "@type": "Product",
      "@id": productIds.get(product.name),
      name: product.name,
      description: describeType(product.name),
      category: sub.name,
      brand: { "@type": "Brand", name: product.brand },
      url: `${url}#${productTypeAnchor(product.name)}`,
      mainEntityOfPage: reference(`${url}#webpage`),
    })));

    nodes.push({
      "@type": "ItemList",
      "@id": `${url}#product-types`,
      name: `${sub.name} product types`,
      numberOfItems: sub.types.length,
      itemListElement: sub.types.map((name, index) => ({
        "@type": "ListItem", position: index + 1, name,
        url: `${url}#${productTypeAnchor(name)}`,
        item: productIds.has(name)
          ? reference(productIds.get(name)!)
          : { "@type": "Thing", name, description: describeType(name), url: `${url}#${productTypeAnchor(name)}` },
      })),
    });
    page["mainEntity"] = reference(`${url}#product-types`);
  }
  return { "@context": "https://schema.org", "@graph": nodes };
}

export const serializeStructuredData = (schema: object) =>
  JSON.stringify(schema).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");

export function pageHead(title: string, description: string, path: string, schema?: object | object[]) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl(path) },
      { property: "og:image", content: absoluteUrl(pageImage(path).src) },
      { property: "og:image:alt", content: pageImage(path).alt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: absoluteUrl(pageImage(path).src) },
      { name: "twitter:image:alt", content: pageImage(path).alt },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(path) }],
    scripts: [{ type: "application/ld+json", children: serializeStructuredData(pageStructuredData(title, description, path, schema)) }],
  };
}
