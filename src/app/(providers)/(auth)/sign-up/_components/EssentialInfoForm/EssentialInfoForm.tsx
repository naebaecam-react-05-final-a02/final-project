'use client';

import Input from '@/components/Input';
import { EssentialInfoFormProps, FormState } from '@/types/auth';
import { debounce } from 'lodash';
import { validatePassword } from '../../../_utils/validatePassword';

const EssentialInfoForm = ({ formState, setFormState, checkDuplicate }: EssentialInfoFormProps) => {
  const validationRules = {
    email: (value: string) => (!value.includes('@') ? '유효한 이메일 주소를 입력해주세요.' : null),
    password: validatePassword,
    confirmPassword: (value: string, password: string) => (value !== password ? '비밀번호가 일치하지 않습니다.' : null),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormState],
        value,
        error: null,
        successMessage: null,
        isVerified: false,
      },
    }));

    if (name === 'email') {
      debouncedCheckEmail(value);
    } else if (name === 'password' && value.length === 1) {
      // 비밀번호 필드에 처음 입력할 때 이메일 중복 확인
      checkEmailAgain();
    }
  };

  const debouncedCheckEmail = debounce(async (value: string) => {
    if (validationRules.email(value) === null) {
      try {
        const isAvailable = await checkDuplicate('email', value);
        setFormState((prev) => ({
          ...prev,
          email: {
            ...prev.email,
            error: isAvailable ? null : '이미 사용 중인 이메일입니다.',
            isVerified: isAvailable,
          },
        }));
      } catch (error) {
        console.error('이메일 중복 확인 중 오류 발생:', error);
        setFormState((prev) => ({
          ...prev,
          email: {
            ...prev.email,
            error: '이메일 중복 확인 중 오류가 발생했습니다.',
            successMessage: null,
            isVerified: false,
          },
        }));
      }
    }
  }, 500);
  // 디바운싱에서 가끔 중복 처리 안되는 경우가 있어서 비밀번호 첫 입력할 때 한번 더 확인
  const checkEmailAgain = async () => {
    const emailValue = formState.email.value;
    if (emailValue && !formState.email.error) {
      try {
        const isAvailable = await checkDuplicate('email', emailValue);
        setFormState((prev) => ({
          ...prev,
          email: {
            ...prev.email,
            error: isAvailable ? null : '이미 사용 중인 이메일입니다.',
            isVerified: isAvailable,
          },
        }));
      } catch (error) {
        console.error('이메일 중복 확인 중 오류 발생:', error);
        setFormState((prev) => ({
          ...prev,
          email: {
            ...prev.email,
            error: '이메일 중복 확인 중 오류가 발생했습니다.',
            successMessage: null,
            isVerified: false,
          },
        }));
      }
    }
  };

  const validatePasswordFields = (name: string, value: string) => {
    setFormState((prev) => {
      const newState = { ...prev };
      if (name === 'password') {
        newState.password.error = validationRules.password(value);
        newState.confirmPassword.error = validationRules.confirmPassword(newState.confirmPassword.value, value);
      } else {
        newState.confirmPassword.error = validationRules.confirmPassword(value, newState.password.value);
      }
      return newState;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password' || name === 'confirmPassword') {
      validatePasswordFields(name, value);
    }
  };

  return (
    <form className="flex flex-col gap-4 items-center justify-center w-full mt-10">
      <div className="flex flex-col w-full  justify-between content-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center w-full px-4">
            <div className="w-full">
              <div className="flex w-full items-end">
                <Input
                  label="이메일"
                  name="email"
                  placeholder="이메일을 입력해 주세요."
                  value={formState.email.value}
                  onChange={handleChange}
                  error={formState.email.error}
                  required
                />
              </div>
            </div>
            {formState.email.successMessage && (
              <p className="text-green-500 text-sm mt-1">{formState.email.successMessage}</p>
            )}
          </div>
          <div className="flex flex-col items-center w-full px-4">
            <div className="w-full">
              <Input
                label="비밀번호"
                placeholder="비밀번호를 입력해 주세요."
                name="password"
                type="password"
                value={formState.password.value}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formState.password.error}
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-center w-full px-4">
            <div className="w-full">
              <Input
                label="비밀번호 확인"
                placeholder="비밀번호를 다시 입력해 주세요."
                name="confirmPassword"
                type="password"
                value={formState.confirmPassword.value}
                onChange={handleChange}
                onBlur={handleBlur}
                error={formState.confirmPassword.error}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EssentialInfoForm;
