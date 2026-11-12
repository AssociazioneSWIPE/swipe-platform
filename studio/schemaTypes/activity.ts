import { defineArrayMember, defineField, defineType } from 'sanity';
import { languageField } from './shared';
import { isCalendarDate, validDateRange } from '../../packages/config/dates';

export const activity = defineType({
  name: 'activity', title: 'Activity category', type: 'document',
  description: 'A page about an activity, such as aperitivi, with optional dated gatherings.',
  fields: [
    languageField,
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'summary', type: 'text', rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: 'body', type: 'richText', description: 'Explain the activity and what happens during these gatherings.', validation: (rule) => rule.required().min(1) }),
    defineField({
      name: 'occurrences', title: 'Dated gatherings', type: 'array',
      description: 'Add past or upcoming editions. Dates have no time of day. Leave empty for an undated category.',
      of: [defineArrayMember({
        name: 'activityOccurrence', title: 'Gathering', type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Gathering / edition title', type: 'string', validation: (rule) => rule.required() }),
          defineField({ name: 'startDate', title: 'Date / start date', type: 'date', validation: (rule) => rule.required().custom((value) => !value || isCalendarDate(value) || 'Enter a valid calendar date.') }),
          defineField({ name: 'endDate', title: 'End date (optional)', type: 'date',
            validation: (rule) => rule.custom((value, context) => {
              if (!value) return true;
              const start = (context.parent as { startDate?: string } | undefined)?.startDate;
              if (!isCalendarDate(value)) return 'Enter a valid calendar date.';
              return !isCalendarDate(start) || validDateRange(start, value) || 'End date must be on or after the start date.';
            }),
          }),
          defineField({ name: 'location', title: 'Location (optional)', type: 'string', description: 'Only publish a venue or location intended to be public.' }),
        ],
        preview: { select: { title: 'title', subtitle: 'startDate' } },
      })],
    }),
    defineField({ name: 'gallery', type: 'array', of: [defineArrayMember({ type: 'editorialImage' })],
      description: 'Publish only photos and credits cleared for public use.',
      validation: (rule) => rule.min(2).warning('Add a couple of photos to illustrate this activity.'),
    }),
    defineField({ name: 'translation', type: 'reference', to: [{ type: 'activity' }], options: {
      filter: ({ document }) => ({ filter: 'language != $language', params: { language: document.language || 'it' } }),
    } }),
    defineField({ name: 'seo', type: 'seo' }),
  ],
  preview: { select: { title: 'title', subtitle: 'language' } },
});

