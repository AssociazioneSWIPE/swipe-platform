import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { structure } from './structure';
import { archiveRoutes } from '../packages/config/routes';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) throw new Error('Set SANITY_STUDIO_PROJECT_ID to the existing SWIPE Sanity project ID.');

export default defineConfig({
  name: 'default', title: 'SWIPE', projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    templates: (previous) => [
      ...previous.filter((template) => template.schemaType !== 'siteSettings'),
      ...['it', 'en'].flatMap((language) => [
        ...['page', 'article', 'category', 'activity'].map((type) => ({
          id: type + '-' + language, title: type + ' (' + language.toUpperCase() + ')',
          schemaType: type, value: { language },
        })),
        ...archiveRoutes.map((kind) => ({
          id: 'resource-' + kind + '-' + language, title: kind + ' (' + language + ')',
          schemaType: 'resource', value: { language, kind },
        })),
        { id: 'settings-' + language, title: 'Settings (' + language + ')', schemaType: 'siteSettings', value: { language } },
      ]),
    ],
  },
  document: {
    newDocumentOptions: (previous) => previous.filter((item) => !item.templateId.startsWith('settings-')),
    actions: (previous, context) => context.schemaType === 'siteSettings'
      ? previous.filter((item) => !['delete', 'duplicate', 'unpublish'].includes(item.action || ''))
      : previous,
  },
});
