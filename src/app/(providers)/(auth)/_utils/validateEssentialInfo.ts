import { FormState } from '@/types/auth';

const validateEssentialInfo = (formState: FormState): { isValid: boolean; errors: Partial<FormState> } => {
  const { email, password, confirmPassword } = formState;
  let isValid = true;
  const errors: Partial<FormState> = {};

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailRegex.test(email.value)) {
    errors.email = { ...email, error: '유효한 이메일 주소를 입력해주세요.' };
    isValid = false;
  }

  if (password.value.length < 8) {
    errors.password = { ...password, error: '비밀번호는 8자 이상이어야 합니다.' };
    isValid = false;
  }

  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = { ...confirmPassword, error: '비밀번호가 일치하지 않습니다.' };
    isValid = false;
  }

  return { isValid, errors };
};

export default validateEssentialInfo;
