# Editing SWIPE

## Open the Studio

From the repository root, run `pnpm install`, then `pnpm studio`. Open the local URL printed by Sanity and sign in with the account that owns project `r41fytlt`. Keep `pnpm dev` running in another terminal for the website.

Node.js and pnpm must be installed on your computer first. Use Node.js 24 LTS and pnpm 11.25.0 (the version pinned in the repository). A missing command means the package manager needs installing, not that there is a problem with your Sanity account.

The root `.env` must contain both `PUBLIC_SANITY_PROJECT_ID` and `SANITY_STUDIO_PROJECT_ID`, set to the same existing project ID. Both dataset variables should be `production`. See `.env.example`. Never commit `.env`.

## Host the Studio on Sanity

Sanity offers free Studio hosting on a `*.sanity.studio` address. This hosts the content editor; the public Astro website is deployed separately.

From the repository root:

```bash
pnpm studio:login
pnpm studio:deploy
```

Sign in using the account that owns SWIPE project `r41fytlt`, with the same sign-in provider you used in Sanity Manage. The configured hostname is `associazioneswipe`; the intended address is `https://associazioneswipe.sanity.studio`. The deploy command confirms the actual address on success. If the hostname is unavailable, set `SANITY_STUDIO_HOST` in the root `.env` to another available name and rerun.

The deployment builds and uploads this repository's Studio and schema. `--schema-required` makes schema errors stop deployment. Subsequent schema/interface changes require redeploying with the same command. Editing ordinary pages and articles then happens in the hosted Studio, without a terminal or running local server.

Editors must sign in and have project access. Deploying the Studio does not create or publish editorial documents. See [Sanity's hosting documentation](https://www.sanity.io/docs/studio/deployment).

## Site settings

Open **Site settings → Italiano / English**. Each language has exactly one settings editor, containing the site name, description, footer text and navigation.

Add navigation items, choose their destinations, and drag them into order. Destinations are the supported Home, Manifesto, Journal and Support routes. An empty navigation array deliberately hides the normal links; an unset array uses the default navigation.

## Pages

Under **Italiano / English → Pages**, create Home, Manifesto and Support. Choose the page destination, enter its title and introduction, and optionally add an image, formatted body and search metadata. Validation prevents a second page at the same destination in the same language.

The page title is its visible heading; search metadata can override the browser title and description. Existing introductory placeholder text remains visible until the corresponding page is published.

## Authors, categories and Journal

1. Create an author under **Authors**. Use the name or pseudonym they consent to publish.
2. Create categories under the appropriate language.
3. Create an article in that language, enter a title, generate its slug, add an excerpt and publication date, then write the body. Images, author and categories are optional.
4. Publish the author and categories before publishing articles that reference them.
5. Create the translated article separately and link it using **Translation**. Link both articles for switching in either direction; publish both before linking them if needed. Without a linked translation, the language switch leads to the other language’s homepage.

Body formatting supports paragraphs, headings, subheadings, quotes, bold, italic, links and nested lists. The renderer escapes text and rejects unsafe link protocols. Slugs must remain unique within the article type; changing a published slug currently requires a developer to add a redirect.

## Images

Use an image field to upload a new asset or select an existing asset. Every image needs alternative text. Add a caption and credit where appropriate, and use the hotspot control to select its focal point. Images are delivered through Sanity’s resizing service.

## Publishing and the website

Save creates a draft. **Publish** makes it eligible for the public website; drafts are excluded. Articles also require a publication date that is not in the future. A future date alone does not schedule a rebuild.

The site is statically generated. After publishing, restart the local website to see updated content; production requires a new build/deploy. Automatic publish-triggered builds and live draft preview are follow-up work.

With no project configured, development uses local sample articles. A configured empty dataset displays an empty Journal. A configured project that cannot be queried fails the build, so a network error cannot silently replace SWIPE’s content with sample articles.
