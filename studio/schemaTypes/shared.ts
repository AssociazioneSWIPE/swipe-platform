import { defineArrayMember, defineField, defineType } from 'sanity';

export const languageField = defineField({
  name: 'language', type: 'string', initialValue: 'it',
  options: { list: [{ title: 'Italiano', value: 'it' }, { title: 'English', value: 'en' }], layout: 'radio' },
  validation: (rule) => rule.required(),
});

export const editorialImage = defineType({
  name: 'editorialImage', type: 'image', title: 'Editorial image', options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', title: 'Alternative text', type: 'string', description: 'Describe the image for people using a screen reader.', validation: (rule) => rule.required() }),
    defineField({ name: 'caption', type: 'string' }),
    defineField({ name: 'credit', type: 'string' }),
  ],
});

export const richText = defineType({
  name: 'richText', type: 'array',
  of: [defineArrayMember({
    type: 'block',
    styles: [{ title: 'Paragraph', value: 'normal' }, { title: 'Heading', value: 'h2' }, { title: 'Subheading', value: 'h3' }, { title: 'Quote', value: 'blockquote' }],
    lists: [{ title: 'Bullet list', value: 'bullet' }, { title: 'Numbered list', value: 'number' }],
    marks: {
      decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }],
      annotations: [defineArrayMember({ name: 'link', type: 'object', fields: [
        defineField({ name: 'href', type: 'url', validation: (rule) => rule.required().uri({ scheme: ['https', 'http', 'mailto', 'tel'], allowRelative: true }) }),
      ] })],
    },
  })],
});

export const seo = defineType({
  name: 'seo', title: 'Search metadata', type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.max(65).warning() }),
    defineField({ name: 'description', type: 'text', rows: 3, validation: (rule) => rule.max(160).warning() }),
  ],
});

