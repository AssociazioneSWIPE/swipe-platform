# Content sources and current state

Reviewed 12 November 2026.

## Text recovered from the current website

- [Chi siamo](https://associazioneswipe.it/chi-siamo/), WordPress page 359: recovered as 27 Portable Text blocks.
- [Cosa facciamo / mission](https://associazioneswipe.it/cosa-facciamo/), WordPress page 1171: recovered as 22 Portable Text blocks.

The snapshot is `apps/web/src/content/reference-pages.json`. Extraction retained readable text, heading structure and list items; it removed Divi shortcodes and HTML presentation. The original Italian wording has not been reinterpreted as newly verified legal guidance. Review current positions and language before launch.

A published Sanity document takes priority over the snapshot. An unavailable Sanity API still fails the build; it does not silently fall back to old text. No English translation of these full pages has been approved or migrated.

## Guide image and link

- [SW+S official landing page](https://safersexwork.associazioneswipe.it/).
- [Official book presentation image](https://safersexwork.associazioneswipe.it/wp-content/uploads/2024/09/img_libro-1.jpg), downloaded unchanged to `apps/web/public/brand/sw-plus-s-book.jpg` (960 × 1050).

The Guides page displays the book's exterior and links to the official landing page, where visitors can request it. It does not reproduce interior chapters. Once published guide resources exist in Sanity, the archive displays those instead of the built-in SW+S entry.

## Collections

The Studio now supports language-specific resource entries for guides, press, podcasts and research projects, plus activity-category documents with description and galleries. The Astro routes read published records only.

The public WordPress inventory returned 13 pages and 15 posts. It is an inventory, not a bulk migration. Blog posts were not automatically labelled as press coverage. No interview, podcast episode, collaboration, event description, attendee photo or research participation has been invented.

Still needed: verified media and episode links, approved activity descriptions and photos, real research project credits, and reviewed English translations. The Research approach text is proposed editorial copy based on the supplied brief about volunteers and capacity limits.

## Live-content access

The connected Sanity app returned `project user not found` for account `footlover926@gmail.com` (Google) in project `r41fytlt`. Therefore this increment has not created, updated or published any live Sanity documents. Deployment and content editing are different permissions: a Studio deployment token is not an editorial write credential.

An authorised SWIPE editor can enter the recovered text and real collection entries in the hosted Studio. Public website builds retrieve that published content from the same existing project.
