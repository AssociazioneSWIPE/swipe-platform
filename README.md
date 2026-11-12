# SWIPE Platform

The bilingual, editorial-first website for Associazione SWIPE.

## Foundation

- Astro 5 + TypeScript + Tailwind CSS v4
- `/it/` and `/en/` canonical routes
- Sanity Studio schema configured only through the existing project's environment values
- Static-first rendering, with a safe local content fallback when Sanity credentials are absent

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Run `pnpm studio` in a second terminal to open the editorial Studio. See [the editor guide](docs/editor-guide.md) for creating bilingual content, and [the architecture notes](docs/architecture.md) for environment configuration and implementation details.
