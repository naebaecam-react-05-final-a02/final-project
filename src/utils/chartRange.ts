import { format, startOfDay, subDays } from 'date-fns';

export const RANGE_OPTIONS = {
  last_7_days: {
    startDate: format(startOfDay(subDays(new Date(), 6)), 'yyyy-MM-dd'),
  },
  last_30_days: {
    startDate: format(startOfDay(subDays(new Date(), 29)), 'yyyy-MM-dd'),
  },
  last_90_days: {
    startDate: format(startOfDay(subDays(new Date(), 89)), 'yyyy-MM-dd'),
  },
  last_365_days: {
    startDate: format(startOfDay(subDays(new Date(), 364)), 'yyyy-MM-dd'),
  },
  all_time: {
    startDate: '1994-12-13',
  },
};

export function getRangeOption(range: string | null) {
  if (range == null) return;
  return RANGE_OPTIONS[range as keyof typeof RANGE_OPTIONS];
}
