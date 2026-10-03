import { createClient } from '@sanity/client';
import type { Locale } from './i18n';

export interface PortableTextBlock {
  _type: 'block';
  children?: Array<{ _type: 'span'; text?: string }>;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  body?: PortableTextBlock[];
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
const client = projectId ? createClient({ projectId, dataset, apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-08-15', useCdn: true }) : null;

export async function getLatestArticles(locale: Locale): Promise<Article[]> {
  return (await getArticles(locale)).slice(0, 3);
}

export async function getArticles(locale: Locale): Promise<Article[]> {
  if (!client) return fallbackArticles[locale];
  const query = `*[_type == "article" && language == $language && defined(slug.current)] | order(publishedAt desc)[0...3] { "slug": slug.current, title, excerpt, publishedAt }`;
  try { return await client.fetch<Article[]>(query, { language: locale }); }
  catch { return fallbackArticles[locale]; }
}

export async function getArticle(locale: Locale, slug: string): Promise<Article | undefined> {
  if (!client) return fallbackArticles[locale].find((article) => article.slug === slug);
  const query = `*[_type == "article" && language == $language && slug.current == $slug][0] { "slug": slug.current, title, excerpt, publishedAt, body }`;
  try { return await client.fetch<Article | undefined>(query, { language: locale, slug }); }
  catch { return fallbackArticles[locale].find((article) => article.slug === slug); }
}
