import type { StructureResolver } from 'sanity/structure';
export const structure: StructureResolver = (S) =>
  S.list().title('SWIPE content').items([
    S.listItem().title('Site settings').child(S.list().title('Choose a language').items(
      ['it', 'en'].map((locale) => S.listItem().title(locale === 'it' ? 'Italiano' : 'English').child(
        S.document().schemaType('siteSettings').documentId('siteSettings-' + locale).initialValueTemplate('settings-' + locale),
      )),
    )),
    S.divider(),
    ...['it', 'en'].map((locale) => S.listItem().title(locale === 'it' ? 'Italiano' : 'English').child(
      S.list().title(locale.toUpperCase()).items(['page', 'article', 'category'].map((type) =>
        S.listItem().title({ page: 'Pages', article: 'Journal articles', category: 'Categories' }[type]!)
          .child(S.documentTypeList(type).filter('_type == $type && language == $language')
            .params({ type, language: locale }).initialValueTemplates([S.initialValueTemplateItem(type + '-' + locale)])),
      )),
    )),
    S.documentTypeListItem('author').title('Authors'),
  ]);

