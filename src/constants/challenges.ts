import { ChallengeCategoryTypes, ChallengeOrderTypes, ChallengeStatusTypes } from '@/types/challenge';

export const CATEGORY_LIST: { label: string; value: ChallengeCategoryTypes }[] = [
  { label: '전체', value: 'all' },
  { label: '운동', value: 'exercise' },
  { label: '식단', value: 'diet' },
  { label: '생활', value: 'lifestyle' },
  { label: '기타', value: 'etc' },
];

export const STATUS_LIST: { label: string; value: ChallengeStatusTypes }[] = [
  { label: '전체', value: 'all' },
  { label: '모집중', value: 'recruiting' },
  { label: '진행중', value: 'progressing' },
  { label: '종료됨', value: 'ended' },
];

export const ORDER_LIST: { label: string; value: ChallengeOrderTypes }[] = [
  { label: '날짜순', value: 'date' },
  { label: '가나다순', value: 'alphabet' },
  { label: '참여자순', value: 'participants' },
  { label: '인증자순', value: 'verifications' },
];
