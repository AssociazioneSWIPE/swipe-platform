import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './shared';

export const activity = defineType({
  name: 'activity', title: 'Activity category', type: 'document',
  description: 'A page about a recurring activity, such as aperitivi. This is not a calendar event.',
  fields: [
    languageField,
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'summary', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'body', type: 'richText', description: 'Explain the activity and what happens during these gatherings.', validation: (rule) => rule.required().min(1) }),
    defineField({ name: 'gallery', type: 'array', of: [defineArrayMember({ type: 'editorialImage' })],
      description: 'Publish only photos and credits cleared for public use.',
      validation: (rule) => rule.min(2).warning('Add a couple of photos to illustrate this activity.'),
    }),
    defineField({ name: 'translation', type: 'reference', to: [{ type: 'activity' }], options: {
      filter: ({ document }) => ({ filter: 'language != $language', params: { language: document.language || 'it' } }),
    } }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'language' } },
});

