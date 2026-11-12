import { defineField, defineType } from 'sanity';
import { languageField } from './shared';

export const page = defineType({
  name: 'page', type: 'document', title: 'Pages',
  fields: [
    languageField,
    defineField({ name: 'route', type: 'string', title: 'Website page',
      options: { list: ['home', 'manifesto', 'support'], layout: 'radio' },
      validation: (rule) => rule.required().custom(async (value, context) => {
        if (!value || !context.document?.language) return true;
        const id = context.document._id.replace(/^drafts\./, '');
        const count = await context.getClient({ apiVersion: '2025-02-19' }).fetch<number>(
          'count(*[_type == "page" && route == $route && language == $language && !(_id in [$id, $draft])])',
          { route: value, language: context.document.language, id, draft: 'drafts.' + id },
        );
        return count === 0 || 'This page already exists in this language. Edit the existing page instead.';
      }),
    }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'intro', type: 'text', rows: 3 }),
    defineField({ name: 'image', type: 'editorialImage' }),
    defineField({ name: 'body', type: 'richText' }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'language', media: 'image' } },
});

