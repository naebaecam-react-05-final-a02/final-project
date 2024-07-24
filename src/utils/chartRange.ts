import { format, startOfDay, subDays } from 'date-fns';

export const RANGE_OPTIONS = {
  last_7_days: {
    label: '지난 7일',
    startDate: format(startOfDay(subDays(new Date(), 6)), 'yyyy-MM-dd'),
  },
  last_30_days: {
    label: '지난 30일',
    startDate: format(startOfDay(subDays(new Date(), 29)), 'yyyy-MM-dd'),
  },
  last_90_days: {
    label: '지난 90일',
    startDate: format(startOfDay(subDays(new Date(), 89)), 'yyyy-MM-dd'),
  },
  last_365_days: {
    label: '지난 1년',
    startDate: format(startOfDay(subDays(new Date(), 364)), 'yyyy-MM-dd'),
  },
  all_time: {
    label: '전체 기간',
    startDate: '1994-12-13',
  },
};

export function getRangeOption(range: string | null) {
  if (range == null) return;
  return RANGE_OPTIONS[range as keyof typeof RANGE_OPTIONS];
}
