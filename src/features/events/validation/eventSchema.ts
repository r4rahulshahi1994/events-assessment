import { z } from 'zod'
import { isValidLocalDateTime } from '../../../shared/utils/date'
import { eventCategories, eventStatuses } from '../constants'

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Enter an event title.')
    .max(120, 'Use 120 characters or fewer.'),
  date: z
    .string()
    .min(1, 'Choose a date and time.')
    .refine(
      isValidLocalDateTime,
      'Enter a valid date and time between 1900 and 2100.',
    ),
  category: z.enum(eventCategories),
  status: z.enum(eventStatuses),
  location: z.string().trim().max(100, 'Use 100 characters or fewer.'),
  owner: z.string().trim().max(100, 'Use 100 characters or fewer.'),
  description: z.string().trim().max(1000, 'Use 1,000 characters or fewer.'),
})

export type EventFormValues = z.infer<typeof eventSchema>
