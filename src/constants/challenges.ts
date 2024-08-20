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
  { label: '모집중', value: 'LF' },
  { label: '진행중', value: 'RUN' },
  { label: '종료됨', value: 'END' },
];

export const ORDER_LIST: { label: string; value: ChallengeOrderTypes }[] = [
  { label: '시작날짜', value: 'startDate' },
  { label: '종료날짜', value: 'endDate' },
  { label: '참여자', value: 'participants' },
  { label: '인증자', value: 'verifications' },
];

export const FILTER_LIST = [
  { label: '전체', value: 'all' },
  { label: '운동', value: 'exercise' },
  { label: '식단', value: 'diet' },
  { label: '생활', value: 'lifestyle' },
  { label: '기타', value: 'etc' },
  { label: '모집중', value: 'LF' },
  { label: '진행중', value: 'RUN' },
  { label: '종료됨', value: 'END' },
  { label: '시작날짜', value: 'startDate' },
  { label: '종료날짜', value: 'endDate' },
  { label: '참여자', value: 'participants' },
  { label: '인증자', value: 'verifications' },
];
