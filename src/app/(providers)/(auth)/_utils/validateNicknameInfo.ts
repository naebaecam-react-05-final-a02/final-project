import { FormState } from '@/types/auth';

const validateNicknameInfo = (formState: FormState): { isValid: boolean; errors: Partial<FormState> } => {
  const { nickname } = formState;
  let isValid = true;
  const errors: Partial<FormState> = {};

  // 닉네임 길이 검사 (2-10글자)
  if (nickname.value.length < 2 || nickname.value.length > 10) {
    errors.nickname = { ...nickname, error: '닉네임 형식이 올바르지 않습니다!' };
    isValid = false;
  }

  // 특수 문자 및 띄어쓰기 검사
  if (!/^[a-zA-Z0-9가-힣]+$/.test(nickname.value)) {
    errors.nickname = { ...nickname, error: '닉네임 형식이 올바르지 않습니다!' };
    isValid = false;
  }

  return { isValid, errors };
};

export default validateNicknameInfo;
