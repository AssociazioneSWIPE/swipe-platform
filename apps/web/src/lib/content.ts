import { createClient } from '@sanity/client';
import type { Locale } from './i18n';
import type { archiveRoutes } from '../../../../packages/config/routes';
import referencePages from '../content/reference-pages.json';
export type ArchiveKind = (typeof archiveRoutes)[number];

export interface PortableTextBlock {
  _key?: string;
  _type: 'block';
  style?: string;
  listItem?: string;
  level?: number;
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  children?: Array<{ _key?: string; _type: 'span'; text?: string; marks?: string[] }>;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  body?: PortableTextBlock[];
  mainImage?: EditorialImage;
  author?: { name: string };
  categories?: Array<{ _id: string; title: string }>;
  translation?: { language: Locale; slug: string };
  seo?: { title?: string; description?: string };
}

export interface EditorialImage {
  asset?: { _ref: string };
  alt: string;
  caption?: string;
  credit?: string;
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; width: number; height: number };
}
export interface PageContent {
  title: string; intro?: string; image?: EditorialImage; body?: PortableTextBlock[];
  seo?: { title?: string; description?: string };
}
export interface SiteSettings {
  siteName?: string; description?: string; footerText?: string;
  navigation?: Array<{ _key: string; label: string; route: string }>;
}

export interface Resource {
  _id: string;
  kind: ArchiveKind;
  title: string;
  summary: string;
  source?: string;
  sourceUrl?: string;
  image?: EditorialImage;
  publicationDate?: string;
}

export interface Activity {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  body?: PortableTextBlock[];
  gallery?: EditorialImage[];
  translation?: { language: Locale; slug: string };
  seo?: { title?: string; description?: string };
}

const fallbackArticles: Record<Locale, Article[]> = {
  it: [
    { slug: 'diritti-e-autodeterminazione', title: 'Diritti e autodeterminazione', excerpt: 'Una piattaforma per ascoltare, condividere e cambiare.', publishedAt: '2026-01-01', body: [{ _type: 'block', children: [{ _type: 'span', text: 'SWIPE mette al centro le voci, l’esperienza e l’autodeterminazione delle persone sex worker.' }] }] },
    { slug: 'cura-e-comunita', title: 'Cura e comunità', excerpt: 'Il mutualismo come pratica quotidiana e politica.', publishedAt: '2025-12-10', body: [{ _type: 'block', children: [{ _type: 'span', text: 'Una comunità forte nasce dall’ascolto, dalla cura e dalla condivisione delle risorse.' }] }] },
  ],
  en: [
    { slug: 'rights-and-self-determination', title: 'Rights and self-determination', excerpt: 'A platform to listen, share and create change.', publishedAt: '2026-01-01', body: [{ _type: 'block', children: [{ _type: 'span', text: 'SWIPE centres the voices, experience and self-determination of sex workers.' }] }] },
    { slug: 'care-and-community', title: 'Care and community', excerpt: 'Mutual aid as an everyday political practice.', publishedAt: '2025-12-10', body: [{ _type: 'block', children: [{ _type: 'span', text: 'A strong community grows through listening, care and shared resources.' }] }] },
  ],
};

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const client = projectId ? createClient({ projectId, dataset, apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-02-19', useCdn: false, perspective: 'published' }) : null;

async function fetchContent<T>(query: string, params: Record<string, string>): Promise<T> {
  if (!client) throw new Error('Sanity is not configured.');
  try { return await client.fetch<T>(query, params); }
  catch (error) { throw new Error('Sanity content could not be loaded. Check the project, dataset and network before rebuilding.', { cause: error }); }
}

export async function getPage(locale: Locale, route: string): Promise<PageContent | null> {
  const source = locale === 'it' && route in referencePages
    ? referencePages[route as keyof typeof referencePages] as PageContent : null;
  if (!client) return source;
  return (await fetchContent<PageContent | null>(
    '*[_type == "page" && language == $language && route == $route][0]{title, intro, image, body, seo}',
    { language: locale, route },
  )) || source;
}

export async function getResources(locale: Locale, kind: ArchiveKind): Promise<Resource[]> {
  if (!client) return [];
  return fetchContent<Resource[]>(
    '*[_type == "resource" && language == $language && kind == $kind] | order(coalesce(displayOrder, 0) asc, title asc, _id asc){_id, kind, title, summary, source, sourceUrl, image, publicationDate}',
    { language: locale, kind },
  );
}

export async function getActivities(locale: Locale): Promise<Activity[]> {
  if (!client) return [];
  return fetchContent<Activity[]>(
    '*[_type == "activity" && language == $language && defined(slug.current)] | order(title asc, _id asc){_id, title, "slug": slug.current, summary, "gallery": gallery[0...1]}',
    { language: locale },
  );
}

export async function getActivity(locale: Locale, slug: string): Promise<Activity | null> {
  if (!client) return null;
  return fetchContent<Activity | null>(
    '*[_type == "activity" && language == $language && slug.current == $slug][0]{_id, title, "slug": slug.current, summary, body, gallery, seo, translation->{language, "slug": slug.current}}',
    { language: locale, slug },
  );
}

export async function getSettings(locale: Locale): Promise<SiteSettings | null> {
  if (!client) return null;
  return fetchContent<SiteSettings | null>(
    '*[_id == $id][0]{siteName, description, footerText, navigation[]{_key, label, route}}',
    { id: 'siteSettings-' + locale },
  );
}

export async function getLatestArticles(locale: Locale): Promise<Article[]> {
  return (await getArticles(locale)).slice(0, 3);
}

export async function getArticles(locale: Locale): Promise<Article[]> {
  if (!client) return fallbackArticles[locale];
  const query = `*[_type == "article" && language == $language && defined(slug.current) && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc, _id asc) { "slug": slug.current, title, excerpt, publishedAt, mainImage, author->{name}, categories[]->{_id, title} }`;
  return fetchContent<Article[]>(query, { language: locale });
}

export async function getArticle(locale: Locale, slug: string): Promise<Article | undefined> {
  if (!client) return fallbackArticles[locale].find((article) => article.slug === slug);
  const query = `*[_type == "article" && language == $language && slug.current == $slug && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now())][0] { "slug": slug.current, title, excerpt, publishedAt, body, mainImage, author->{name}, categories[]->{_id, title}, translation->{ "slug": select(defined(publishedAt) && dateTime(publishedAt) <= dateTime(now()) => slug.current), language }, seo }`;
  return fetchContent<Article | undefined>(query, { language: locale, slug });
}
