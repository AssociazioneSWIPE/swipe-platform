const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const root = path.resolve(__dirname, '..');
const studioRequire = createRequire(path.join(root, 'studio/package.json'));
const { parse, evaluate } = studioRequire(studioRequire.resolve('groq-js', {
  paths: [path.dirname(studioRequire.resolve('sanity'))],
}));
const { externalUrl } = require(path.join(root, 'apps/web/src/lib/links.ts'));
const source = fs.readFileSync(path.join(root, 'apps/web/src/lib/content.ts'), 'utf8');
const queries = [...source.matchAll(/'([*]\[[^\n]+)',/g)].map((match) => match[1]);
const queryFor = (fragment, detail = false) => {
  const query = queries.find((query) => query.includes(fragment) && query.includes('slug.current == $slug') === detail);
  assert.ok(query, 'Could not locate query: ' + fragment);
  return query;
};
async function run(query, dataset, params) {
  return (await evaluate(parse(query), { dataset, params })).get();
}
async function main() {
  const dataset = [
    { _id: 'press-it-2', _type: 'resource', kind: 'press', language: 'it', title: 'Second', displayOrder: 2 },
    { _id: 'press-it-1', _type: 'resource', kind: 'press', language: 'it', title: 'First', displayOrder: 1 },
    { _id: 'press-en', _type: 'resource', kind: 'press', language: 'en', title: 'English' },
    { _id: 'podcast-it', _type: 'resource', kind: 'podcasts', language: 'it', title: 'Podcast' },
    { _id: 'activity-it', _type: 'activity', language: 'it', title: 'Aperitivi', slug: { current: 'aperitivi' }, gallery: [{ _type: 'editorialImage', alt: 'Photo one' }, { _type: 'editorialImage', alt: 'Photo two' }] },
    { _id: 'activity-en', _type: 'activity', language: 'en', title: 'Gatherings', slug: { current: 'gatherings' } },
    { _id: 'activity-unfinished', _type: 'activity', language: 'it', title: 'No slug' },
  ];
  const resources = await run(queryFor('_type == "resource"'), dataset, { language: 'it', kind: 'press' });
  assert.deepEqual(resources.map((item) => item._id), ['press-it-1', 'press-it-2']);
  const activities = await run(queryFor('_type == "activity"'), dataset, { language: 'it' });
  assert.deepEqual(activities.map((item) => item.slug), ['aperitivi']);
  assert.equal(activities[0].gallery.length, 1, 'Activity listing should load only the cover');
  const detail = await run(queryFor('_type == "activity"', true), dataset, { language: 'it', slug: 'aperitivi' });
  assert.equal(detail.gallery.length, 2, 'Activity detail should retain the gallery');
  assert.equal(await run(queryFor('_type == "activity"', true), dataset, { language: 'en', slug: 'aperitivi' }), null);
  assert.equal(externalUrl('javascript:alert(1)'), undefined);
  assert.equal(externalUrl('data:text/html,test'), undefined);
  assert.equal(externalUrl('https://user:password@example.org'), undefined);
  assert.equal(externalUrl('https://example.org/interview'), 'https://example.org/interview');
  console.log('Archive checks passed: section/language isolation, ordering, activity slugs and galleries, link safety.');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
