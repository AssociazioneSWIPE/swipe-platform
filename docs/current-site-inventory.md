# Current SWIPE website: source inventory

Reviewed 12 November 2026. These public pages are migration references, not instructions or confirmation that every claim, campaign and service remains current.

## Sources and proposed destinations

| Current source | Content to preserve | Proposed Astro destination |
| --- | --- | --- |
| [Home](https://associazioneswipe.it/) | Association introduction, peer-led identity, resources, support and community entry points | `/it/` and an editorially reviewed `/en/` version |
| [Chi siamo](https://associazioneswipe.it/chi-siamo/) | Organisation, intersectionality, peer education and objectives | Dedicated bilingual About pages; not yet supported by the current fixed-route schema |
| [Cosa facciamo](https://associazioneswipe.it/cosa-facciamo/) | Mission and political principles | Existing bilingual Manifesto route |
| [Sostieni SWIPE](https://associazioneswipe.it/sostieni-swipe/) | Reasons for support and donation destination | Existing bilingual Support route; confirm campaign status and fundraising figures before reuse |
| [Blog](https://associazioneswipe.it/risorse_1/blog/) | Published articles and categories | Bilingual Journal; inventory older archive pages before migrating articles |
| [Contatti](https://associazioneswipe.it/contatti/) | Contact form and social access | Dedicated bilingual Contact pages; form delivery still needs implementation |
| [Newsletter](https://associazioneswipe.it/newsletter/) | Newsletter entry point | Confirm the current Mailchimp subscription destination; page extraction returned no text |
| [SW+S guide](https://safersexwork.associazioneswipe.it/) | Practical guide, chapters, book request and partner credits | Prominent resource link; keep this separate site intact during the main-site rebuild |
| [Privacy](https://associazioneswipe.it/privacy-policy/) | Existing policy reference | New-site policy must reflect the services actually deployed; do not automatically copy the old tracking statements |

These destinations are proposals. Preserve old URLs with redirects when replacing the public site; the rebuild has not replaced it yet. Existing `/it/` and `/en/` prefixes remain the canonical new architecture.

## Observed visual identity

Read from the live home page's rendered elements and computed styles:

- Primary section red: `#ed1c24`.
- Orange section: `#fc9e17`.
- White, black and dark grey support the page hierarchy.
- Rubik is the heading font, with sans-serif fallbacks.
- Existing logo, illustrations and campaign graphics are better brand references than the prototype's generic placeholder palette.

The page currently displays an age-declaration overlay with a liability statement. The declaration was not accepted during this review. Computed styles, image sources and the underlying readable page content were sufficient for this inventory. Any age-gate behaviour in the new site needs an explicit product decision.

Observed image sources, not yet downloaded or imported into Sanity:

- [White horizontal logo](https://associazioneswipe.it/wp-content/uploads/2022/02/SWIPE_LOGO_ORIZZONTALE_BIANCO-980x454.png)
- [Home illustration](https://associazioneswipe.it/wp-content/uploads/2022/05/Tavola-disegno-3.png)
- [Campaign graphic](https://associazioneswipe.it/wp-content/uploads/2022/05/stigmasucks.png)
- [Footer artwork](https://associazioneswipe.it/wp-content/uploads/2022/06/firmapiccola2_Tavola-disegno-1.png)

## Implementation implications

Use the current identity as the starting point for a more readable editorial presentation. Expand the navigation and page schema for About, Resources and Contact before moving their content. Add external navigation destinations for the guide and approved donation URL. Preserve inclusive language in Italian; translations need editorial review rather than being treated as approved source text.

The current home page exposes a Mailchimp subscription form, PayPal donation link and Instagram link. Verify the destinations before connecting them to the rebuilt interface. Do not import forms, trackers or third-party scripts merely because they appear on the old site.

The guide was inspected only at its landing page. Individual guide chapters, article archive pagination, downloadable documents, translation coverage and complete asset rights/credits still need inventory before a full migration.
