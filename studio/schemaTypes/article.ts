import { defineField, defineType } from 'sanity';
export const article = defineType({
  name: 'article', title: 'Article', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list: [{ title: 'Italiano', value: 'it' }, { title: 'English', value: 'en' }], layout: 'radio' }, validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'language' } },
});
