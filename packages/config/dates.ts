// Calendar dates, without a time or timezone. Preserve the entered day everywhere.
export function isCalendarDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00.000Z');
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function validDateRange(start: unknown, end: unknown): boolean {
  return isCalendarDate(start) && (end === undefined || end === null || end === '' || (isCalendarDate(end) && end >= start));
}

export function formatCalendarDate(value: string, locale: 'it' | 'en'): string {
  if (!isCalendarDate(value)) throw new Error('Invalid calendar date.');
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' })
    .format(new Date(value + 'T00:00:00.000Z'));
}

export function orderedOccurrences<T extends { startDate: string; endDate?: string }>(items: readonly T[]): T[] {
  return items.filter((item) => validDateRange(item.startDate, item.endDate))
    .toSorted((a, b) => b.startDate.localeCompare(a.startDate));
}
