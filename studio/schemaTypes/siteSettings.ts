import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './shared';
export const siteSettings = defineType({
  name: 'siteSettings', type: 'document', title: 'Site settings',
  fields: [
    { ...languageField, readOnly: true },
    defineField({ name: 'siteName', type: 'string', initialValue: 'SWIPE', validation: (rule) => rule.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'footerText', type: 'text', rows: 2 }),
    defineField({ name: 'navigation', type: 'array', description: 'Drag items to change their order.', validation: (rule) => rule.max(6),
      of: [defineArrayMember({ name: 'navigationItem', type: 'object', fields: [
        defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'route', type: 'string', options: { list: ['home', 'manifesto', 'journal', 'support'] }, validation: (rule) => rule.required() }),
      ] })],
    }),
  ],
  preview: { select: { subtitle: 'language' }, prepare: ({ subtitle }) => ({ title: 'Site settings', subtitle }) },
});

