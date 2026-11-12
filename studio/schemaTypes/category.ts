import { defineField, defineType } from 'sanity';
import { languageField } from './shared';
export const category = defineType({
  name: 'category', type: 'document', title: 'Categories',
  fields: [languageField, defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() })],
  preview: { select: { title: 'title', subtitle: 'language' } },
});

