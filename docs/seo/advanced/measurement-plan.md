# SEO measurement and dashboard specification

No real GSC, GA4 or GTM account data was accessed. This is an implementation and configuration plan, not a performance report. Establish a baseline only after the property collects data.

## Sources and definitions

| Measure | Source | Dimensions / interpretation | Review |
| --- | --- | --- | --- |
| Organic clicks, impressions, CTR, average position | GSC Search results | Query, canonical page, country, device; split branded/nonbranded after reviewing actual queries | Weekly; compare equal periods and seasonality |
| Indexed pages and exclusion reasons | GSC Page indexing + Sitemaps | Submitted canonical URLs, selected canonical, crawl failures; 25 existing indexable URLs | Weekly and after deployment |
| Landing-page performance | GA4 organic-search sessions + GSC page metrics | Full canonical path, division and family; session acquisition dimensions for traffic attribution | Weekly |
| Enquiry handoffs | GA4 custom `enquiry_handoff` event, configured in GTM | `enquiry_method`, `product_category`; proxy for intent, not confirmation of a received or qualified lead | Weekly |
| Qualified organic enquiries | Sales records / approved CRM joined through an approved process | Requires a real received enquiry and sales qualification; unavailable today | Monthly after a process is approved |
| Mobile experience | GSC device breakdown, Chrome/Lighthouse and browser testing | Viewport overflow, keyboard/form behaviour and mobile landing paths; do not rely on the retired standalone Mobile Usability report | After UI changes |
| Core Web Vitals | GSC CWV, PageSpeed Insights / CrUX when sufficient field samples exist | LCP, INP, CLS by device and URL group; laboratory checks do not establish field pass rates | Monthly |
| Keyword and category performance | GSC query-to-page exports and GA4 paths | Compare against `keyword-url-map.csv`; flag persistent overlap rather than a single query fluctuation | Monthly |

## GTM / GA4 setup required

The existing site-wide container remains `GTM-TKJQBWN6`. No second loader, hardcoded GA4 measurement ID or manual page_view sender is added.

1. In the authorized GTM account, confirm the correct GA4 Google tag and measurement ID, and preview the current container before publishing.
2. Create Data Layer Variables `enquiry_method` and `product_category`.
3. Create **one** custom-event trigger for `enquiry_handoff` and **one** GA4 event tag of the same name with those parameters. Respect the site's chosen consent settings. Do not add a second tag for the same event.
4. Register the two event-scoped custom dimensions in GA4 if they are needed in standard reporting. Optionally mark the handoff event as a key event, clearly labelled “Enquiry handoff”. Do not call it a qualified lead or successful delivery.
5. Preview a valid email and WhatsApp handoff. Invalid forms must emit no event; rapid double-clicks must emit one. Check the GTM preview timeline and GA4 DebugView. Local automation checked the dataLayer only; it did not confirm delivery into GA4.
6. Inspect existing Enhanced Measurement and history-change triggers for SPA page views. Choose one route-change strategy; do not enable competing manual and automatic page_view tags. Test navigation, browser Back and refresh. The installed container is external and cannot be audited from source alone.
7. Never send name, phone, email, requirement, free-text search terms, message body or mailto/WhatsApp destination URL as event parameters. In GA4/GTM, check that other automatic click/form tracking does not capture those URL contents. Review consent/privacy disclosures with the owner; this implementation does not assert regulatory compliance.

`enquiry_handoff` fires only after existing validation and just before opening an encoded email or WhatsApp link. It does not wait for GA4 or delay the enquiry; browser/ad blockers, app navigation or consent may prevent measurement. There is no server lead store. A 1.5-second per-form lock prevents rapid duplicate handoffs while allowing a later retry.

## Looker Studio dashboard specification

Connect authorized read-only GSC (Site Impression and URL Impression as appropriate) and GA4 sources. Keep metrics on their proper source and scope; avoid a naive many-to-many query/page join that multiplies sessions or clicks.

- **Overview:** date comparison, GSC clicks/impressions/CTR/position, organic GA4 sessions, handoff count, explicit definitions.
- **Acquisition:** GSC query and landing-page tables; brand/nonbrand and mobile/desktop filters; country breakdown.
- **Product divisions:** path-derived Power Transmission, Automation, Adhesives; family tables; organic sessions and handoffs.
- **Technical health:** manual/current GSC index coverage and CWV notes, last deployment date and latest regression result. These are not live metrics unless a supported connector is configured.
- **Enquiries:** handoff event by method/category and organic-session attribution. Separate sales-confirmed leads if authorized data becomes available.

Define organic session filtering consistently; use a GA4 exploration/segment when associating handoff events with organic sessions rather than assuming every event was organic. Exclude staff/test visits through approved GA4 settings. Mark the event launch date so historical comparisons do not treat missing instrumentation as zero demand.

Official references: [GA4 events](https://developers.google.com/analytics/devguides/collection/ga4/events), [GSC Performance report](https://support.google.com/webmasters/answer/7576553), [GSC Core Web Vitals](https://support.google.com/webmasters/answer/9205520).
