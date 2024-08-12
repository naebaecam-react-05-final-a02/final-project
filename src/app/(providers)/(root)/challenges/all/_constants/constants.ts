// const CATEGORIES = ['all', 'exercise', 'diet', 'life', 'feeling', 'eco', 'habit'];

export type CategoryTypes = 'all' | 'exercise' | 'diet' | 'lifestyle' | 'etc';

export const CATEGORIES: { label: string; value: CategoryTypes }[] = [
  { label: '전체', value: 'all' },
  { label: '운동', value: 'exercise' },
  { label: '식단', value: 'diet' },
  { label: '생활', value: 'lifestyle' },
  { label: '기타', value: 'etc' },
];
