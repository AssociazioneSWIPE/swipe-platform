# SWIPE platform foundation

## Structure

- `apps/web`: Astro 5 public site, statically rendered by default.
- `studio`: Sanity Studio schema, deliberately configured for the existing SWIPE project through environment variables.

## Localisation

The canonical public routes are `/it/` and `/en/`; neither language is hidden behind an unprefixed URL. Content documents use a required `language` field. Translation relationships can be added later once the existing editorial model is confirmed.

## Sanity connection

Do not create a Sanity project. Put the current project ID and dataset in `.env` (copy `.env.example`):

```bash
PUBLIC_SANITY_PROJECT_ID=existing-project-id
PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=existing-project-id
SANITY_STUDIO_DATASET=production
```

Until those values are set, the website renders a small local editorial fallback so development and CI remain deterministic. When connected, the home page queries the three most recently published language-specific `article` documents; the Journal listing and static article pages use the same language-aware model.

## Next increments

1. Import and map the current Sanity content model before changing existing documents.
2. Add accessible form endpoints and Pagefind after the editorial routes are complete.
3. Confirm the existing Sanity model, then add images, authors and translation relationships without modifying editorial data prematurely.
