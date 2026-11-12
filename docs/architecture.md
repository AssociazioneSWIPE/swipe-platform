# SWIPE platform foundation

## Structure

- `apps/web`: Astro 5 public site, statically rendered by default.
- `studio`: Sanity Studio schema, deliberately configured for the existing SWIPE project through environment variables.

## Localisation

The canonical public routes are `/it/` and `/en/`. Pages, articles and categories use a required `language` field. Article translation references connect their language-specific slugs; authors are shared. Settings use one fixed document per language, `siteSettings-it` and `siteSettings-en`.

## Sanity connection

Do not create a Sanity project. Put the current project ID and dataset in the repository-root `.env` (copy `.env.example`). Both Astro and the Studio load this same file:

```bash
PUBLIC_SANITY_PROJECT_ID=existing-project-id
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=existing-project-id
SANITY_STUDIO_DATASET=production
```

Without a project ID, the website renders local sample articles. With a configured project, it queries published content only, excludes articles dated in the future, and fails on query errors. The home page shows three articles; the Journal includes all eligible articles. The API uses a pinned version and bypasses the CDN during builds to retrieve freshly published content.

## Editorial model

Pages use a fixed route choice (home, manifesto, support), unique per language, with title, introduction, rich text, image and search metadata. Settings supply navigation, site name, description and footer. Articles add optional author, categories, cover image, search metadata and a translation reference. All public image fields require alternative text and support credits, captions and hotspots.

Rich text is rendered with Portable Text's HTML renderer, preserving headings, marks, links and nested lists. Images use Sanity's URL builder for responsive sizes and crop/hotspot support. No React island is needed for the public editorial pages.

The Studio structure groups content by language and exposes settings as fixed documents. Language-specific creation templates set the language automatically. See [the editor guide](editor-guide.md) for the publishing workflow.

## Next increments

1. Enter and approve real SWIPE content and brand assets in the existing empty dataset.
2. Set up hosted Studio access, a production website deployment, and publish-triggered rebuilds.
3. Add accessible form endpoints, Pagefind and live draft preview.
