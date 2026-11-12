import { defineField, defineType } from 'sanity';
import { languageField } from './shared';
import { archiveRoutes } from '../../packages/config/routes';

export const resource = defineType({
  name: 'resource', type: 'document', title: 'Resource',
  fields: [
    languageField,
    defineField({ name: 'kind', title: 'Section', type: 'string', options: { list: [...archiveRoutes] }, validation: (rule) => rule.required() }),
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'summary', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'source', type: 'string', description: 'Publication, podcast producer, or research partner. Use only verified credits.' }),
    defineField({ name: 'sourceUrl', title: 'Original link / guide request page', type: 'url',
      validation: (rule) => rule.uri({ scheme: ['https', 'http'] }).custom((value, context) =>
        value || context.document?.kind === 'research' ? true : 'Add the verified original link.',
      ),
    }),
    defineField({ name: 'image', type: 'editorialImage', description: 'For guides, upload the actual book cover, not interior pages.',
      validation: (rule) => rule.custom((value, context) =>
        context.document?.kind !== 'guides' || value?.asset ? true : 'Add the real guide cover.',
      ),
    }),
    defineField({ name: 'publicationDate', type: 'date', description: 'Optional original publication date. This is not a scheduling control.' }),
    defineField({ name: 'displayOrder', type: 'number', initialValue: 0, validation: (rule) => rule.integer().min(0) }),
  ],
  preview: { select: { title: 'title', subtitle: 'kind', media: 'image' } },
});

