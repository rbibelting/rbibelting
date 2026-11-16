# Advanced SEO implementation report

Date: 16 November 2026. Canonical origin: **https://www.rbibelting.com**. Scope: requirements 18–28 from the supplied brief. This report supersedes the October report's old Vercel-domain and Product-on-range decisions. Earlier reports remain historical records.

Validation below covers the implementation before deployment. A repository push does not confirm hosting deployment. The live-before-deployment audit records the prior public version, not a post-deployment validation of these changes. No external accounts, DNS, GTM configuration, analytics properties or hosting settings were changed.

## 1. Successfully implemented changes

### Content, AEO/GEO and existing product pages — 18, 20, 23

- Added one distinct family explanation, selection checklist, practical Q&A and related-component links to each of the 18 existing range pages. All reusable text remains in `src/lib/site-data.ts`.
- These explain selection concepts and request technical inputs; they do not invent stock sizes, load/temperature limits, pricing, offers, compliance approvals or manufacturer relationships. Existing detailed photography/specification showcases stay opt-in.
- Connected industries to relevant ranges and family brands to the actual division brand section. Product-family card titles now have ordinary crawlable links; existing View range popups and Quick enquiry actions remain.
- Contact answers now exist in initial HTML inside accessible native expandable elements. Existing company identity and enquiry contact constants share the same data source. Form instances have unique field/label IDs, preventing collisions when an inline form and popup coexist.
- Normalized division names to the form's existing category options so Automation and Adhesives enquiries preserve their category instead of falling back to a mismatched value.
- No new testimonials, certifications, editorial bylines, case studies or claims of AI citations were added. Existing unapproved business content is flagged for owner review below.

### Research and intent mapping — 19, 22

- Created [keyword-gap-report.md](keyword-gap-report.md) before considering new pages. It documents public research queries, four relevant supplier websites, observed page structures, opportunities and research limits.
- Created [keyword-url-map.csv](keyword-url-map.csv): all 25 public URLs with primary query theme, intent, secondary topic and differentiation boundary.
- Created [product-type-map.csv](product-type-map.csv): all 103 types mapped to their existing family URL and card fragment. Informational selection questions belong on the relevant family page; broad supplier, brand-navigation, product-discovery, local and enquiry intents remain distinct.
- No new keyword-variant, city, brand, comparison or product-model pages were introduced. Existing paths were retained to avoid migration/redirect churn.

### Rendering, schema and crawl efficiency — 21, 24, 27

- Retained SSR as the least disruptive compatible rendering model. No SPA-only rewrite or new prerendering dependency was needed.
- Corrected all 18 multi-product family graphs from `Product` to existing `CollectionPage` + `ItemList`. Every list item uses visible names/descriptions and links to a real type card. Shared Organization/LocalBusiness, WebSite and BreadcrumbList remain connected to one canonical origin.
- No fictitious offers, ratings, prices, inventory, Article records or self-serving review markup were introduced. Product-rich-result eligibility is not claimed for collection pages; external Google validation remains manual.
- Sitemap and robots.txt now regenerate before production builds from the shared taxonomy and website identity. Only the 25 clean public URLs are included; no popup queries, fragment variants or invented last-modification dates.
- Added repeatable data, initial-HTML, structured-data and browser regression tooling without adding application dependencies. Query popup URLs retain the clean division canonical; valid and missing routes are checked explicitly.

### Measurement and Merchant Center — 25, 26

- Added `enquiry_handoff` to the existing GTM data layer after valid email/WhatsApp form input. It contains only an allowlisted category and method. No message, search text, email, phone or name is sent by this helper.
- Added a short per-form duplicate-click guard. A handoff is a proxy for intent, not a received/qualified lead or completed purchase. No second GTM loader or page_view sender was added.
- Prepared [measurement-plan.md](measurement-plan.md) with GSC/GA4 metrics, organic-session attribution, GTM setup, duplicate-event checks, CWV/mobile review and a Looker Studio dashboard specification.
- Prepared [merchant-and-content-assessment.md](merchant-and-content-assessment.md). Current enquiry-only ranges do not meet the reviewed direct-purchase/fixed-price requirements for a Shopping feed. Prioritized organic range SEO; no feed or invented commerce data was generated.

## 2. Validated improvements — 21, 24, 27, 28

Evidence files:

| Evidence | Result / scope |
| --- | --- |
| [baseline.json](baseline.json) | Before-change local SSR audit of all 25 public URLs |
| [live-before-deployment.json](live-before-deployment.json) | Public site read-only audit; 25 HTTP 200 pages, unknown routes return 404; not a post-deployment pass |
| [production-validation.json](production-validation.json) | Production Node SSR: all 25 pages have meaningful initial HTML, one H1, one matching canonical, description, title and a JSON-LD graph; no missing alt attributes detected |
| [metadata-comparison.json](metadata-comparison.json) | Existing 25 titles, descriptions and canonical URLs preserved; no duplicate titles/descriptions |
| [browser-validation.json](browser-validation.json) | All 25 pages at 1440px and 390px: 50 rendered checks, no horizontal document overflow, one canonical/graph/H1 and family guidance; no browser page errors |
| [redirect-validation.json](redirect-validation.json) | Live apex HTTPS redirects once to www; HTTP apex takes two hops (HTTPS then www), with no loop; canonical www returns 200 |
| [typecheck-comparison.json](typecheck-comparison.json) | Strict TypeScript is not green: baseline and current have the same 38 diagnostics and no new normalized diagnostic signatures |

Additional checks:

- XML sitemap matches all taxonomy routes; robots.txt references the canonical sitemap. No orphaned sitemap pages were found; maximum measured internal link depth from the homepage is two in both baseline and updated HTML.
- Each of the three division query URLs canonicalizes to its clean division page. Unknown top-level and product-family routes return 404, not a soft-404 with HTTP 200.
- Production JSON-LD parses, entity IDs are unique, references resolve, inner-page breadcrumbs end at the canonical page, and all 103 ItemList destinations match actual type-card IDs. Collection schema replaces 18 inappropriate single-Product records.
- Browser checks cover the existing exact-search popup, prefilled Quick enquiry, expandable Contact answers, invalid enquiry submission (no event), and a valid rapid double-click (one sanitized handoff event).
- Both the normal production build and a temporary `NITRO_PRESET=node_server` production build passed. The latter was used to exercise built SSR; no hosting preset change is committed.
- Third-party requests were blocked in automated browser tests to avoid sending test traffic. Therefore these checks do not validate live GA4 receipt, external widget loading or the current contents of the GTM container.
- Image-alt checks establish attribute coverage, not an independent authenticity/specification review. Viewport checks establish layout bounds at the tested widths, not a field Core Web Vitals score.

### Re-run instructions

From the project root, with Node.js and Python 3 available:

```sh
node scripts/check-seo-data.mjs
npm run build
```

To exercise a standalone production SSR process without changing the committed deployment configuration:

```sh
NITRO_PRESET=node_server npm run build
HOST=127.0.0.1 PORT=8091 node .output/server/index.mjs
```

With that server running, use another terminal:

```sh
SEO_STRICT=1 python3 scripts/audit-seo.py http://localhost:8091 docs/seo/advanced/production-validation.json
node scripts/validate-schema.mjs http://localhost:8091
```

Browser checks use an existing Playwright installation and Chrome, supplied through `PLAYWRIGHT_MODULE`/`CHROME_PATH` if needed; no browser/test dependency was added to the application's package manifest. Run `node scripts/check-browser-seo.mjs http://localhost:8091`. Test artifacts are in the report paths and `/tmp/rbi-schema-validation`.

## 3. Issues requiring manual action

1. **Deployment:** review and deploy the changes before expecting the new text/schema/events publicly. Once deployed, rerun the SSR and schema checks against `https://www.rbibelting.com` and inspect rendered HTML through Search Console.
2. **Existing TypeScript debt:** strict checking still reports 38 pre-existing diagnostics in category-pages, certificate rendering, division-cards, V-belt showcase and root error typing. The baseline checkout reproduced them; they are not new SEO regressions. Production builds pass, but strict typecheck should be resolved separately.
3. **Google tools:** signed-in URL Inspection, live Rich Results Test and Schema Markup Validator validation have not been completed in the owner's accounts. Local JSON-LD validation is not Google's rich-result approval. Re-submit/confirm the sitemap and check actual indexing exclusions after deployment.
4. **Analytics:** configure one GTM GA4 event tag/trigger, consent behaviour and custom dimensions as documented; test in Tag Assistant and DebugView. Inspect the existing container's page_view/history and automatic form/click tags for duplicates or collection of form/URL contents. No real analytics reports were retrieved.
5. **Business evidence:** approve or revise the existing approximate milestone timeline, placeholder founder biographies, dated review counts, testimonial permissions and brand authorization statements. Confirm current certificates separately from historical ones.
6. **Catalogue review:** confirm Gates Polyflex JB's current placement in Timing Belts and the modular-belt mismatch between older Conveyor Belts summary/sample images and its revised type list. Exact model attributes and availability require approved manufacturer/catalogue records.
7. **Legacy site:** confirm control of `rbibelting.in` and any cross-domain migration plan; no redirects or account changes were made. Preserve the current verified `www.rbibelting.com` canonical unless the owner deliberately changes the preferred domain.
8. **Performance and logs:** no authorized server logs, paid keyword metrics or field CWV data were available. Review GSC/CrUX/PageSpeed and actual server errors rather than speculating about crawl budget.

### Post-deployment manual Search Console inspection

Inspect the homepage, all three divisions and at least one family per division first:

- https://www.rbibelting.com/
- https://www.rbibelting.com/power-transmission
- https://www.rbibelting.com/power-transmission/v-belts
- https://www.rbibelting.com/power-transmission/conveyor-belts
- https://www.rbibelting.com/automation
- https://www.rbibelting.com/automation/linear-motion
- https://www.rbibelting.com/adhesives
- https://www.rbibelting.com/adhesives/threadlockers
- https://www.rbibelting.com/contact
- https://www.rbibelting.com/about

Then sample remaining family URLs from the 25-page sitemap, review `/franchise` as a coming-soon enquiry page, confirm `https://www.rbibelting.com/sitemap.xml` is read successfully and keep the existing Google verification file in place. Request indexing where appropriate; submission does not guarantee inclusion or timing.

## 4. Recommended future SEO work

- Collect an authorized GSC/GA4 baseline and validate keyword priorities with measured query/page data; do not invent search volume or competitor positions.
- Obtain approved technical catalogues and author sign-off before publishing model-specific specifications or individual product pages.
- Add genuine customer-approved application case studies with named technical contributors only when evidence and permission exist.
- Resolve the existing typecheck debt and implement an agreed CI/deployment workflow for these repeatable checks.
- Audit field performance once enough traffic is available and check actual image/widget impact. Avoid claiming a CWV pass from a local browser audit.
- Reassess Merchant Center only after genuine priced/purchasable product landing pages and required commercial policies exist.

References and research sources are linked in the keyword, measurement and merchant/content reports. No schema, AI optimization, sitemap or indexing request guarantees rankings, AI citations or rich-result display.
