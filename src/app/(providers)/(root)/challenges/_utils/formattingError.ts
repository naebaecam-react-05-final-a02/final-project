import { challengeFormFields } from '../_types/types';

export const formattingChallengeError = (str: challengeFormFields): string => {
  switch (str) {
    case 'title':
      return '챌린지 이름을 작성해 주세요.';
    case 'content':
      return '챌린지 내용 및 인증 방법을 작성해 주세요.';
    case 'category':
      return '카테고리를 선택해 주세요.';
    case 'startDate':
      return '시작일을 선택해 주세요.';
    case 'endDate':
      return '종료일을 선택해 주세요.';
  }
};
