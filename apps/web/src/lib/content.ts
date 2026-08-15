import { createClient } from '@sanity/client';
import type { Locale } from './i18n';

export interface Article { slug: string; title: string; excerpt: string; publishedAt: string; }

const fallbackArticles: Record<Locale, Article[]> = {
  it: [{ slug: 'diritti-e-autodeterminazione', title: 'Diritti e autodeterminazione', excerpt: 'Una piattaforma per ascoltare, condividere e cambiare.', publishedAt: '2026-01-01' }],
  en: [{ slug: 'rights-and-self-determination', title: 'Rights and self-determination', excerpt: 'A platform to listen, share and create change.', publishedAt: '2026-01-01' }],
};

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const client = projectId ? createClient({ projectId, dataset, apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION || '2026-08-15', useCdn: true }) : null;

export async function getLatestArticles(locale: Locale): Promise<Article[]> {
  if (!client) return fallbackArticles[locale];
  const query = `*[_type == "article" && language == $language && defined(slug.current)] | order(publishedAt desc)[0...3] { "slug": slug.current, title, excerpt, publishedAt }`;
  try { return await client.fetch<Article[]>(query, { language: locale }); }
  catch { return fallbackArticles[locale]; }
}
