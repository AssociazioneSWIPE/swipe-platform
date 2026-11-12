// Shared by the public routes and the Studio's destination selectors.
export const pageRoutes = ['home', 'about', 'manifesto', 'support', 'resources', 'guides', 'press', 'podcasts', 'events', 'research', 'contact'] as const;
export const navigationRoutes = [...pageRoutes, 'journal'] as const;

