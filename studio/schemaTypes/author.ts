import { defineField, defineType } from 'sanity';
export const author = defineType({
  name: 'author', type: 'document', title: 'Authors',
  fields: [
    defineField({ name: 'name', type: 'string', description: 'Use a public name or pseudonym with the author’s consent.', validation: (rule) => rule.required() }),
    defineField({ name: 'image', type: 'editorialImage' }),
  ],
  preview: { select: { title: 'name', media: 'image' } },
});

