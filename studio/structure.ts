import type { StructureResolver } from 'sanity/structure';
import { archiveRoutes } from '../packages/config/routes';
export const structure: StructureResolver = (S) =>
  S.list().title('SWIPE content').items([
    S.listItem().title('Site settings').child(S.list().title('Choose a language').items(
      ['it', 'en'].map((locale) => S.listItem().title(locale === 'it' ? 'Italiano' : 'English').child(
        S.document().schemaType('siteSettings').documentId('siteSettings-' + locale).initialValueTemplate('settings-' + locale),
      )),
    )),
    S.divider(),
    ...['it', 'en'].map((locale) => S.listItem().title(locale === 'it' ? 'Italiano' : 'English').child(
      S.list().title(locale.toUpperCase()).items([
        ...['page', 'article', 'category', 'activity'].map((type) =>
        S.listItem().title({ page: 'Pages', article: 'Journal articles', category: 'Journal categories', activity: 'Activity categories' }[type]!)
          .child(S.documentTypeList(type).filter('_type == $type && language == $language')
            .params({ type, language: locale }).initialValueTemplates([S.initialValueTemplateItem(type + '-' + locale)])),
        ),
        S.divider(),
        ...archiveRoutes.map((kind) => S.listItem().title({ guides: 'Guides', press: 'Press', podcasts: 'Podcasts', research: 'Research projects' }[kind])
          .child(S.documentTypeList('resource').title(kind).filter('_type == "resource" && kind == $kind && language == $language')
            .params({ kind, language: locale }).initialValueTemplates([S.initialValueTemplateItem('resource-' + kind + '-' + locale)]))),
      ]),
    )),
    S.documentTypeListItem('author').title('Authors'),
  ]);

