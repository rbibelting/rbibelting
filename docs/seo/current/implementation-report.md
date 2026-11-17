# RBI Belting SEO review and implementation

Date: 17 November 2026. Canonical origin: https://www.rbibelting.com. Changes are local and have not been deployed.

## A. Existing SEO preserved

All 25 sitemap URLs already have distinct titles/descriptions, one H1, matching clean canonicals, meaningful server-rendered HTML and connected JSON-LD. Existing Organization/LocalBusiness, WebSite, collection lists, breadcrumbs and Contact FAQs are preserved. Shared taxonomy, range selection guidance, related links, industry links, encoded email/WhatsApp enquiry handoffs, analytics events, GTM loader, sitemap generator, robots.txt and Google verification file remain intact. No new routes, packages, product specifications or commerce claims were added. Existing metadata was retained because the audit found no duplicates or missing entries.

## B. Confirmed gaps

- Pages declared large social cards without providing Open Graph or Twitter images; Twitter title/description were implicit.
- WebPage graphs lacked a preferred representative image.
- Four original conveyor PNGs total about 8 MB and were served without responsive alternatives.
- ProductPhoto did not default below-fold images to lazy loading or asynchronous decoding.
- Shared page-hero images lacked explicit loading priority.
- The browser checker could click the search control before hydration after a default `load` navigation; changed the Home and Contact interaction navigations to wait for network idle.

## C. Completed changes and files

- `src/lib/site-data.ts`: shared representative page-image selection and responsive conveyor-image helper; existing descriptions and originals preserved.
- `src/lib/seo.ts`: absolute, contextual Open Graph/Twitter image URLs, image alt metadata, explicit Twitter title/description and matching WebPage `primaryImageOfPage`.
- `src/components/product-photo.tsx`: responsive WebP derivatives, default lazy loading and async decoding, retaining explicit eager-loading override.
- `src/components/division-cards.tsx`: same responsive derivatives for existing conveyor slides.
- `src/components/page-sections.tsx`: high priority for the existing above-fold hero image.
- `public/product-images/conveyor-belts/*-{640,1280}.webp`: eight derivatives from four original images; no original removed, renamed or overwritten.
- `scripts/check-image-seo.py`: repeatable social-image, schema-image, image URL/srcset, internal destination and fragment audit; produces the page-wise CSV.
- `scripts/check-browser-seo.mjs`: hydration-aware home navigation and configurable report directory to preserve historical results.
- `docs/seo/current/`: this report, baseline/current SSR evidence, image measurements, full page-wise metadata and validation evidence.

## D. Page-wise SEO summary

See [page-wise-seo.csv](page-wise-seo.csv) for every public URL, exact title, description, primary keyword, canonical, schema types and indexing directive. Existing keyword ownership is preserved from the shared prior keyword map. No extra minor-keyword or location pages were created. Public pages retain default index/follow; no admin/login routes exist in the current public taxonomy. Query-driven product popups canonicalize to their clean division URL. Missing pages return HTTP 404.

Product families remain CollectionPage + ItemList because they represent ranges, not purchasable individual models. No unsupported Product, Article, rating, review, availability or offer markup was introduced. Local schema uses existing business details; no unverified address, hours, location, authorization or certification was added.

## E. Image SEO

All rendered images already had alt attributes. Existing informative descriptions and empty decorative alts are preserved; no keyword stuffing or redundant title attributes were added. Current filenames already describe products, divisions, brands and certificates, so no existing URLs were renamed. Eight responsive WebP derivatives preserve the original photography and aspect ratios. New descriptive suffixes indicate resolution; source PNG URLs remain accessible. Social image metadata describes the existing division photos; general company pages use the existing factory photo. A conveyor derivative was visually inspected; all 64 unique image/internal asset destinations and linked fragments pass the local audit. This establishes coverage and accessibility, not independent verification of every pictured product specification.

Google's current image guidance supports descriptive alt text, responsive images with a crawlable src fallback, relevant page context and representative Open Graph/schema images: https://developers.google.com/search/docs/appearance/google-images.

## F. Performance and validation

The four originals total **8,018,068 bytes**; the four 1280px derivatives total **227,064 bytes** (97.17% smaller), and the four 640px derivatives total **68,834 bytes** (99.14% smaller). These totals compare the same four photographs; actual network savings depend on viewport, pixel density and images loaded. Exact source/derivative byte counts and dimensions are in [image-measurements.json](image-measurements.json). These are measured file-size improvements, not a Core Web Vitals score. No LCP, INP, CLS or ranking improvement is claimed without field/lab measurements.

- Existing production build passed using Bun (npm/Node are absent from the shell PATH); no hosting configuration changed.
- Shared data checks pass for 25 sitemap paths, 18 range guidance entries and enquiry/analytics normalization.
- Initial-HTML audit passes all 25 public routes: unique metadata, one H1/canonical/graph, no orphaned sitemap pages, no missing alt attributes, correct 404s and clean query canonicals.
- Structured-data validator passes all 25 routes, connected entity references, breadcrumbs, visible type-card links and contact FAQ consistency. This is local validation, not Google's rich-result approval.
- Social/asset/link audit passes 25 pages and 64 unique destinations with no missing linked fragments. See [image-link-validation.json](image-link-validation.json).
- Full ESLint was run and reports 1,224 errors and 9 warnings from existing repository lint debt. Baseline/current checks on all five changed application files show identical error and warning counts; see [lint-comparison.json](lint-comparison.json). No unrelated formatting rewrite was performed.
- Browser validation passes all 50 page/viewport checks (25 routes at 1440px and 390px), with no horizontal overflow and one canonical/H1/JSON-LD graph each. Six interaction checks pass for FAQs, search/range popups, prefilled enquiries, invalid-form feedback, sanitized duplicate-click handoff tracking, one GTM loader and no browser page errors. See [browser-validation.json](browser-validation.json). Third parties were blocked, so live analytics delivery and external widgets remain unverified.

## G. Pending manual work

1. Review and deploy through the existing hosting workflow; no automatic deployment was performed. Recheck production SSR and image URLs after deployment.
2. Search Console: inspect representative pages and image crawl/indexing issues, confirm sitemap processing and compare query/page performance. Check real CWV/CrUX or PageSpeed before claiming target compliance.
3. Google Rich Results Test/Schema Markup Validator: validate deployed representative pages; collection pages do not imply Product rich-result eligibility.
4. Google Business Profile: owner should verify exact trading name, primary category, Bhosari address, hours, phones, website and current photography. Compare authorized directory listings against the same details; no inconsistent external listing is asserted without current evidence/access.
5. Hosting: verify HTTPS/apex/www and legacy URL redirects. Prior reports observed a two-hop HTTP-apex redirect; fix at the hosting edge only after confirming the current configuration and historical URL inventory. Local application changes cannot establish edge behavior.
6. Confirm existing brand authorization, timeline/testimonial claims and current certificates, including future-dated material. Approve catalogues before adding model specifications or new researched articles. Existing footer social placeholders require verified destination URLs.
7. GTM/GA4: validate existing tags and sanitized handoff events in Tag Assistant/DebugView without duplicating page views. A mail/WhatsApp handoff is not proof of a received lead.
8. Resolve repository lint/typecheck debt separately. Review original versus optimized images at full size before release if exact catalogue color/detail fidelity is business critical.

No design, theme, sections, navigation, animation, backend, database, analytics installation or sitemap architecture was rebuilt.

## Reproduce the checks

With the local SSR server on port 8080:

```sh
SEO_STRICT=1 python3 scripts/audit-seo.py http://localhost:8080 docs/seo/current/ssr-validation.json
python3 scripts/check-image-seo.py http://localhost:8080
bun scripts/check-seo-data.mjs
bun scripts/validate-schema.mjs http://localhost:8080
SEO_REPORT_DIR=docs/seo/current PLAYWRIGHT_MODULE=file:///path/to/playwright/index.mjs bun scripts/check-browser-seo.mjs http://localhost:8080
bun --bun run build
bun --bun run lint
```

The image derivatives were encoded from the unchanged originals using temporary tooling (Pillow WebP quality 85, method 6, Lanczos resize to 640/1280px width). No image-processing runtime or application dependency was installed.
