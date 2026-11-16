# Commercial eligibility, credibility and technical content

## Merchant Center assessment

Current website: enquiry-based industrial product ranges, no SKU-level priced offers, cart, payment checkout, live inventory feed, or complete online sale/return terms. Prioritize organic collection-page SEO. No Merchant Center feed, prices, stock availability, GTIN/MPN values, merchant shipping schema or invented Offer objects were created.

For a future Shopping implementation, first obtain approved individual product records, manufacturer IDs where applicable, exact descriptions/images, displayed fixed prices and currencies, actual purchasable availability, shipping/tax/return terms and a working purchase flow. Only then reconcile a feed against each landing page and reassess Google eligibility.

References: [Merchant Center website and purchase requirements](https://support.google.com/merchants/answer/6363310), [fixed-price shop requirements](https://support.google.com/merchants/answer/12160471).

## Structured-data decision

The 18 family URLs list multiple product types and brands. They are CollectionPage + ItemList pages, not single product detail pages. Their list items now link to the corresponding visible product-type cards and use the same descriptions. Shared Organization/LocalBusiness, WebSite and breadcrumbs are retained. Contact's genuine visible Q&A remains represented; a B2B FAQ does not imply eligibility for Google's restricted FAQ rich results.

No Article schema is appropriate: there are no genuine authored editorial articles. No Review/AggregateRating schema is added for third-party business reviews. Eligible individual Product markup can be introduced once approved individual product pages exist; no new pages are created here. [Google's single-product guidance](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).

## Content and credibility review

Retained the supplied identity, address, phone numbers, enquiry email, GST text, founder names, company photographs, source-linked review integrations and certificate assets. Enquiry constants now use the existing shared identity instead of duplicate literals; the two published email addresses are separate contact channels, not conflicting organizations. No new certification, customer relationship, performance claim, endorsement, testimonial or biography was invented.

Owner confirmation remains necessary for the existing approximate timeline, placeholder founder biographies, historic rating counts, testimonial reuse permissions and blanket authorization/stock claims across every brand. The existence of a brand logo alone does not prove a current dealer authorization. Preserve the documented distinction between certificates and general brand ranges; review certificate validity dates before representing a current authorization. The historical Pidilite certificate is explicitly dated 2014–2015, not a current authorization.

Existing catalogue issues to review with the owner/manufacturer before publication of more detailed specifications:

- `Gates Polyflex JB` currently appears in the Timing Belts list, though Polyflex JB is a joined V-belt range. Confirm the intended classification and relocate only with catalogue approval.
- Conveyor Belts' older short description and opt-in sample gallery mention modular belts, while the newly supplied product-type list omits them. Confirm whether they remain offered; no unsupported range expansion is made here.
- Optical/servo/robotic compatibility, precise temperature/load limits, food-contact approvals and stock need model-specific documentation. Existing opt-in V-belt tables are general guidance, not verified stock specifications.
- The existing brochure action generates an explicitly labelled placeholder PDF after an email request. Obtain approved manufacturer literature before treating these downloads as technical product documents.
- Manufacturer and supplier are different roles; source pages and brand logos do not justify naming RBI as the manufacturer of a branded product.
- Confirm whether the legacy `rbibelting.in` domain is controlled by the owner and should be migrated. No external redirects or account settings were changed.

## Guidance added to existing pages

Every family page contains a factual explanation, the information required for selection, one relevant question/answer and contextual related-component links. Contact FAQs use native expandable details so all answers are in initial HTML while retaining the expandable presentation. No detailed product photography was moved out of opt-in showcases.

Selection text requests application inputs rather than promising exact sizes, construction or commercial offers. Technical context was cross-checked against manufacturer guidance, including [THK ball screws](https://tech.thk.com/en/products/pdf/en_b15_006.pdf), [Henkel threadlocker selection](https://next.henkel-adhesives.com/us/en/products.html/producttype_2.3.5.4.1.13.html), [Habasit food-contact documentation](https://newwebsitecm.habasit.com/en-US/Support-and-Services/Regulatory), and [Gates belt identification](https://dpk3n3gg92jwt.cloudfront.net/domains/gates.pt/pdf/BeltPMManual.pdf). These sources explain principles; they are not evidence that RBI stocks a particular model.

The approach follows [Google's AI-feature guidance](https://developers.google.com/search/docs/appearance/ai-features). Clear, crawlable content and accurate schema do not guarantee indexing, rankings or AI citations. No special AI endpoint or speculative crawler restrictions were introduced.
