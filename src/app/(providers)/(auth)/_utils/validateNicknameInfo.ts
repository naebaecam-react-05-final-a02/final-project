import { FormState } from '@/types/auth';

const validateNicknameInfo = (formState: FormState): { isValid: boolean; errors: Partial<FormState> } => {
  const { nickname } = formState;
  let isValid = true;
  const errors: Partial<FormState> = {};

  if (nickname.value.length < 2) {
    errors.nickname = { ...nickname, error: '닉네임은 2자 이상이어야 합니다.' };
    isValid = false;
  }

  if (!nickname.isVerified) {
    errors.nickname = { ...nickname, error: '닉네임 중복 확인이 필요합니다.' };
    isValid = false;
  }

  return { isValid, errors };
};

export default validateNicknameInfo;
