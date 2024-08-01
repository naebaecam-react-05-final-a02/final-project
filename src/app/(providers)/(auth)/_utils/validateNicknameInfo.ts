import { FormState } from '@/types/auth';

const validateNicknameInfo = (formState: FormState): { isValid: boolean; errors: Partial<FormState> } => {
  const { nickname } = formState;
  let isValid = true;
  const errors: Partial<FormState> = {};

  // 닉네임 길이 검사 (2-10글자)
  if (nickname.value.length < 2 || nickname.value.length > 10) {
    errors.nickname = { ...nickname, error: '닉네임은 2글자 이상 10글자 이하여야 합니다.' };
    isValid = false;
  }

  // 특수 문자 및 띄어쓰기 검사
  if (!/^[a-zA-Z0-9가-힣]+$/.test(nickname.value)) {
    errors.nickname = { ...nickname, error: '닉네임에는 특수 문자나 띄어쓰기를 사용할 수 없습니다.' };
    isValid = false;
  }

  // 중복 확인 검사
  if (!nickname.isVerified) {
    errors.nickname = { ...nickname, error: '닉네임 중복 확인이 필요합니다.' };
    isValid = false;
  }

  return { isValid, errors };
};

export default validateNicknameInfo;
