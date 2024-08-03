export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return '비밀번호는 최소 6자리 이상이어야 합니다.';
  }

  let hasUpperCase = false;
  let hasNumber = false;
  let hasSpecialChar = false;
  const specialChars = '!@#$%^&*(),.?":{}|<>';

  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (char >= 'A' && char <= 'Z') {
      hasUpperCase = true;
    } else if (char >= '0' && char <= '9') {
      hasNumber = true;
    } else if (specialChars.includes(char)) {
      hasSpecialChar = true;
    }
  }

  if (!hasUpperCase) {
    return '비밀번호에 대문자가 포함되어야 합니다.';
  }
  if (!hasNumber) {
    return '비밀번호에 숫자가 포함되어야 합니다.';
  }
  if (!hasSpecialChar) {
    return '비밀번호에 특수문자가 포함되어야 합니다.';
  }

  return null; // 유효한 비밀번호
};
