import { defineArrayMember, defineField, defineType } from 'sanity';
export const article = defineType({
  name: 'article', title: 'Article', type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'language', title: 'Language', type: 'string', options: { list: [{ title: 'Italiano', value: 'it' }, { title: 'English', value: 'en' }], layout: 'radio' }, validation: (rule) => rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'mainImage', type: 'editorialImage' }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'categories', type: 'array', of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }], options: { filter: ({ document }) => ({ filter: 'language == $language', params: { language: document.language || 'it' } }) } })] }),
    defineField({ name: 'translation', type: 'reference', to: [{ type: 'article' }], description: 'Link the published article in the other language.', options: { filter: ({ document }) => ({ filter: 'language != $language', params: { language: document.language || 'it' } }) } }),
    defineField({ name: 'seo', type: 'seo' }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'body', title: 'Body', type: 'richText' }),
  ],
  preview: { select: { title: 'title', subtitle: 'language' } },
});
