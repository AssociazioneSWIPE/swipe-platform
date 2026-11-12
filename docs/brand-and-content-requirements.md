# Approved reference documents

User direction: preserve SWIPE's visual identity while modernising the presentation. This note supersedes visual guesses in the earlier current-site inventory.

## Sources

- `SWIPE BRAND GUIDE LINES-1.pdf` (16 PDF pages, supplied 12 November 2026).
- `implementation of the english translation of the website-2.pdf` (4 PDF pages, supplied 12 November 2026).
- Existing logo and illustration retrieved unchanged from the current association website; original URLs are in `current-site-inventory.md`.

The source PDFs remain unchanged in the user's Downloads folder. This note records design decisions so the implementation does not depend on access to that folder.

## Brand implementation

- Primary red: `#ed1c24`, matching RGB 237/28/36 and the large “Rosso Swipe” label. The small HEX label `#E3B9B2` in the PDF conflicts with these. Prefer the consistent RGB, prominent label and current-site red.
- Secondary pink: `#f5598b`; secondary yellow: `#fec60d`. Black and white support this palette. The old site's orange is not the chart's specified secondary yellow.
- Primary type: Rubik, with semibold headings. Secondary editorial type: Noticia Text regular, corresponding to the PDF's “Noticia” specimen.
- Both fonts are self-hosted through Fontsource; the distributed font packages include their licences.
- Logo: use the original white asset without recolouring, stretching, rotation, extra elements, borders or shadows. Its embedded whitespace is retained. Minimum displayed file width is 150px, leaving the visible wordmark at least the chart's 113px minimum.
- The original illustration remains unchanged, including its embedded background. Decorative layout changes must not alter brand marks.
- Small text on the brand red uses dark ink for contrast; white is reserved for sufficiently large headings. Pink and yellow sections also use dark ink.
- Tone: direct, inclusive, informal and peer-led. Avoid fabricated statistics, activities, partnerships, research participation or testimonials.

## Requested content changes and current scope

| Requirement | Implemented in this increment | Remaining editorial/product work |
| --- | --- | --- |
| Italian / English access | Localised navigation, fixed section routes and language switching | Review proposed English copy and migrate approved translations |
| Guides repository | Structured records and archive; verified SW+S book image and landing-page link | Populate additional guide records with their actual covers |
| Press repository | Editable landing page and structured archive | Collect verified articles/interviews/video links |
| Podcasts repository | Editable landing page and structured archive | Supply the existing episode and its approved destination |
| Events / activities | Category documents, detail pages, descriptions, photo galleries and optional dated gatherings | Enter approved descriptions, dates and photos |
| Research | Editable approach text and structured project list | Approve proposed volunteer-capacity copy and enter verified past projects |
| Association/contact | Dedicated editable bilingual pages | Migrate approved association content and implement the contact endpoint |

Sanity page destinations and navigation choices share `packages/config/routes.ts`. No live content was created or published by this increment. The hosted Studio needs redeploying before the extra destinations appear there. Existing page documents remain valid.

User update: dated gatherings were requested before the next deployment. Each activity category can now contain editions with a required title/start date, an optional end date and an optional public location. Both index and detail pages show them. Dates are day-only, localised in Italian/English and sorted by start date descending; existing undated categories still work. This adds date information while retaining the category-based presentation rather than a calendar grid.

## Frontend delivery

The redesigned homepage uses the approved palette, local fonts, original artwork, a peer-led introduction, resource entry points, Journal, activities/research and support. Native disclosure elements provide keyboard-operable desktop groups and a mobile menu without a React island.

The fallback copy is a proposed presentation based on the supplied materials, not an approved translation or a complete content migration. Home heading, introduction, main image and rich text remain overridable through the existing Home document. Static section labels and supplementary homepage statements currently live in `apps/web/src/lib/site.ts`.

The canonical site URL has been corrected from the prototype domain to `https://associazioneswipe.it`. This changes generated sitemap URLs; it does not switch DNS, replace the current site, or implement legacy redirects.
