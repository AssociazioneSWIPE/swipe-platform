export const locales = ['it', 'en'] as const;
export type Locale = (typeof locales)[number];

export const copy = {
  it: {
    home: 'Home', manifesto: 'Manifesto', journal: 'Journal', support: 'Sostienici',
    tagline: 'Diritti, cura e autodeterminazione per le persone sex worker.',
    latest: 'Dal Journal', readMore: 'Leggi l’articolo', language: 'English',
  },
  en: {
    home: 'Home', manifesto: 'Manifesto', journal: 'Journal', support: 'Support us',
    tagline: 'Rights, care and self-determination for sex workers.',
    latest: 'From the Journal', readMore: 'Read article', language: 'Italiano',
  },
} as const;

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}
