# B2B schema and AI crawler access

17 November 2026. Changes are local and not deployed.

## Structured data

Existing Organization/LocalBusiness, WebSite, BreadcrumbList and Contact FAQPage are preserved within the single connected JSON-LD graph on each applicable page. The six Contact questions/answers match the visible FAQ data. No duplicate organization or FAQ graph was added.

Added three Product nodes for explicitly named, visible catalogue items:

- Gates Polychain GT Carbon: `/power-transmission/timing-belts#type-gates-polychain-gt-carbon`
- PIX Service Kit: `/power-transmission/accessories#type-pix-service-kit`
- PIX Belt Kit: `/power-transmission/accessories#type-pix-belt-kit`

Each record uses the displayed name and description, existing catalogue brand, page category and visible product-card URL. ItemList references the Product node; Product links back to the collection WebPage. The page remains CollectionPage. Other generic product-family/type entries retain their existing collection/Thing representation.

No product specifications, prices, offers, availability, SKU/GTIN identifiers, customer reviews, ratings or model photographs were fabricated. Product nodes are intentionally opt-in in `catalogueProductModels` in `src/lib/site-data.ts`. Extend this list when additional named catalogue items have approved source data.

These records provide Schema.org product semantics, not a claim of Google product-rich-result eligibility. Google product snippets require a page focused on a specific product/its variants and appropriate supported offer/review/rating data. This enquiry catalogue does not become a priced individual-product shop through JSON-LD.

References: [Schema.org Product definition](https://schema.org/Product), [Google product snippet guidance](https://developers.google.com/search/docs/appearance/structured-data/product-snippet), [Gates Poly Chain GT Carbon product family](https://www.gates.com/us/en/power-transmission/synchronous-belts/poly-chain-synchronous-belts.p.9268-000000-000045.html).

## Crawler access

The existing wildcard Allow already permitted crawling. Added explicit allow directives for OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User and Google-Extended. This documents permission for search indexing, user-requested retrieval and training-related crawlers. The public sitemap directive and general crawler access remain unchanged.

`scripts/generate-sitemap.mjs` now regenerates the same AI policy from `aiCrawlerUserAgents` in shared data, so a production build cannot erase it. The XML sitemap URLs/content were unchanged.

Sources: [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), [Anthropic crawler documentation](https://privacy.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [Google crawler controls](https://developers.google.com/crawling/docs/about-crawling).

## Validation

- Production build passed; generated robots.txt preserved the policy.
- Shared taxonomy/data checks passed.
- All 25 public routes passed SSR metadata, canonical, heading and connected-schema checks.
- Schema validator verifies all three Product entities, brand/name/description consistency, ItemList references, visible destination fragments, six matching FAQ answers, breadcrumbs and absence of fabricated commerce fields.
- The served robots.txt matches the file. Python's RobotFileParser confirms access for all nine listed AI agents, Googlebot and Bingbot to the homepage, Contact, Timing Belts and a product image.
- No hosting, WAF/CDN, Search Console or external account settings were changed. Production bot access must also be checked after deployment; robots.txt cannot override a separate hosting firewall rule.

Re-run with the SSR server running:

```sh
bun scripts/check-seo-data.mjs
bun scripts/validate-schema.mjs http://localhost:8080
SEO_STRICT=1 python3 scripts/audit-seo.py http://localhost:8080 /tmp/rbi-b2b-schema-audit.json
bun --bun run build
```
