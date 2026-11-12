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
const { isCalendarDate, validDateRange, formatCalendarDate, orderedOccurrences } = require(path.join(root, 'packages/config/dates.ts'));
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
  const editions = [{ _key: 'one', title: 'Gathering', startDate: '2026-11-20', endDate: '2026-11-22', location: 'Bologna' }];
  const datedDataset = dataset.map((item) => item._id === 'activity-it' ? { ...item, occurrences: editions } : item);
  for (const detail of [false, true]) {
    const result = await run(queryFor('_type == "activity"', detail), datedDataset, { language: 'it', slug: 'aperitivi' });
    assert.deepEqual((detail ? result : result[0]).occurrences, editions, 'Index and detail must retain the complete date range and location');
  }
  assert.equal(isCalendarDate('2024-02-29'), true);
  assert.equal(isCalendarDate('2026-02-29'), false);
  assert.equal(isCalendarDate('2026-02-30'), false);
  assert.equal(isCalendarDate('2026-13-01'), false);
  assert.equal(validDateRange('2026-11-20', undefined), true);
  assert.equal(validDateRange('2026-11-20', '2026-11-20'), true);
  assert.equal(validDateRange('2026-11-20', '2026-11-19'), false);
  const unsorted = [{ startDate: '2026-11-01' }, { startDate: '2026-11-20' }, { startDate: 'invalid' }];
  assert.deepEqual(orderedOccurrences(unsorted).map((item) => item.startDate), ['2026-11-20', '2026-11-01']);
  assert.equal(unsorted[0].startDate, '2026-11-01', 'Rendering must not mutate CMS data');
  const previousTimezone = process.env.TZ;
  for (const timezone of ['Pacific/Honolulu', 'Pacific/Kiritimati', 'Europe/Rome']) {
    process.env.TZ = timezone;
    assert.equal(formatCalendarDate('2026-03-29', 'it'), '29 marzo 2026');
    assert.equal(formatCalendarDate('2026-03-29', 'en'), 'March 29, 2026');
  }
  if (previousTimezone === undefined) delete process.env.TZ;
  else process.env.TZ = previousTimezone;
  assert.equal(externalUrl('javascript:alert(1)'), undefined);
  assert.equal(externalUrl('data:text/html,test'), undefined);
  assert.equal(externalUrl('https://user:password@example.org'), undefined);
  assert.equal(externalUrl('https://example.org/interview'), 'https://example.org/interview');
  console.log('Archive checks passed: queries, galleries, date ranges, leap days, timezone-safe display, ordering and link safety.');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
