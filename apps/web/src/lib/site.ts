import type { Locale } from './i18n';
export const sections = {
  it: {
    about: ['Chi siamo', 'Un’associazione di sex worker e alleatə, per i diritti, la solidarietà e l’autodeterminazione.'],
    manifesto: ['Manifesto', 'Il lavoro sessuale è lavoro. La nostra voce, i nostri valori, le nostre lotte.'],
    support: ['Sostieni SWIPE', 'Aiutaci a condividere risorse, costruire comunità e combattere lo stigma.'],
    resources: ['Risorse', 'Informazioni e strumenti da condividere. Per conoscerci, sostenerci e fare rete.'],
    guides: ['Le nostre guide', 'Guide scritte da sex worker, per sex worker.'],
    press: ['Dicono di noi', 'Articoli, interviste e video per ascoltare le voci di SWIPE.'],
    podcasts: ['Podcast', 'Conversazioni e racconti sul lavoro sessuale, in prima persona.'],
    events: ['Le nostre attività', 'Incontri, aperitivi e momenti di comunità: scopri cosa facciamo insieme.'],
    research: ['Ricerca', 'Vuoi coinvolgere SWIPE in un progetto di ricerca? Parliamone.'],
    contact: ['Contatti', 'Restiamo in contatto. Per conoscerci e costruire nuove possibilità insieme.'],
  },
  en: {
    about: ['About us', 'An association of sex workers and allies for rights, solidarity and self-determination.'],
    manifesto: ['Manifesto', 'Sex work is work. Our voice, our values, our struggles.'],
    support: ['Support SWIPE', 'Help us share resources, build community and challenge stigma.'],
    resources: ['Resources', 'Information and tools to share. To learn, support each other and connect.'],
    guides: ['Our guides', 'Guides written by sex workers, for sex workers.'],
    press: ['In the press', 'Articles, interviews and videos featuring the voices of SWIPE.'],
    podcasts: ['Podcasts', 'Conversations and first-person stories about sex work.'],
    events: ['Our activities', 'Gatherings, aperitivi and community: discover what we do together.'],
    research: ['Research', 'Would you like to involve SWIPE in a research project? Let’s talk.'],
    contact: ['Contact', 'Let’s stay in touch, get to know each other and build new possibilities together.'],
  },
} as const;
export type Section = keyof typeof sections.it;
export const resourceSections = ['guides', 'press', 'podcasts'] as const;
export const guideUrl = 'https://safersexwork.associazioneswipe.it/';
export const instagramUrl = 'https://www.instagram.com/associazione.swipe/';
export const homeCopy: Record<Locale, { eyebrow: string; title: string; intro: string; about: string; resources: string; statement: string; values: string; resourceIntro: string; research: string; researchIntro: string }> = {
  it: {
    eyebrow: 'Sex Worker Intersectional Peer Education',
    title: 'Insieme contro lo stigma del lavoro sessuale.',
    intro: 'Siamo un’associazione di sex worker e alleatə. Facciamo rete, condividiamo risorse e rivendichiamo i nostri diritti.',
    about: 'Conosci SWIPE', resources: 'Esplora le risorse',
    statement: 'Di sex worker. Per sex worker.',
    values: 'Crediamo nella cooperazione, nella solidarietà e nell’autodeterminazione. Nel diritto al lavoro, alla salute e alla sicurezza.',
    resourceIntro: 'Esperienze che diventano strumenti. Conoscenze che mettiamo in comune.',
    research: 'La conoscenza si costruisce insieme.',
    researchIntro: 'Scopri il nostro approccio alla ricerca e alla produzione di conoscenza.',
  },
  en: {
    eyebrow: 'Sex Worker Intersectional Peer Education',
    title: 'Together against the stigma of sex work.',
    intro: 'We are an association of sex workers and allies. We connect, share resources and stand up for our rights.',
    about: 'Meet SWIPE', resources: 'Explore resources',
    statement: 'By sex workers. For sex workers.',
    values: 'We believe in cooperation, solidarity and self-determination. In the right to work, health and safety.',
    resourceIntro: 'Experience becomes a tool. Knowledge becomes something we share.',
    research: 'Knowledge is something we build together.',
    researchIntro: 'Discover our approach to research and knowledge production.',
  },
};

