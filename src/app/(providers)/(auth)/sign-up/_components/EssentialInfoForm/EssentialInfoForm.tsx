'use client';

import { EssentialInfoFormProps, FormState } from '@/types/auth';
import { useState } from 'react';
import { validatePassword } from '../../../_utils/passwordValidation';

const EssentialInfoForm = ({ formState, setFormState, checkDuplicate, onNext }: EssentialInfoFormProps) => {
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState({
    email: false,
    nickname: false,
  });

  const validationRules = {
    email: (value: string) => (!value.includes('@') ? '유효한 이메일 주소를 입력해주세요.' : null),
    nickname: (value: string) => (value.length < 2 ? '닉네임은 2자 이상이어야 합니다.' : null),
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
  };

  const handleCheckDuplicate = async (field: 'email' | 'nickname') => {
    if (!formState[field].value.trim()) {
      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          error: `${field === 'email' ? '이메일' : '닉네임'}을 입력해주세요.`,
          successMessage: null,
          isVerified: false,
        },
      }));
      return;
    }

    setIsCheckingDuplicate((prev) => ({ ...prev, [field]: true }));

    try {
      const result = await checkDuplicate(field, formState[field].value);

      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          error: result ? null : `이미 사용 중인 ${field === 'email' ? '이메일' : '닉네임'}입니다.`,
          successMessage: result ? `사용 가능한 ${field === 'email' ? '이메일' : '닉네임'}입니다.` : null,
          isVerified: result,
        },
      }));
    } catch (error) {
      console.error(`${field} 중복 확인 중 오류 발생:`, error);
      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          error: '중복 확인 중 오류가 발생했습니다.',
        },
      }));
    } finally {
      setIsCheckingDuplicate((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;
    const newFormState = { ...formState };

    // 모든 필수 필드 유효성 검사
    for (const field of ['email', 'nickname', 'password', 'confirmPassword'] as const) {
      let error = null;
      if (field === 'confirmPassword') {
        error = validationRules[field](newFormState[field].value, newFormState.password.value);
      } else {
        error = validationRules[field](newFormState[field].value);
      }

      if (error) {
        newFormState[field].error = error;
        hasError = true;
      }
    }

    // 중복 확인 여부 체크
    if (!newFormState.email.isVerified) {
      newFormState.email.error = '이메일 중복 확인이 필요합니다.';
      hasError = true;
    }
    if (!newFormState.nickname.isVerified) {
      newFormState.nickname.error = '닉네임 중복 확인이 필요합니다.';
      hasError = true;
    }

    if (hasError) {
      setFormState(newFormState);
      return;
    }

    onNext();
  };

  return (
    <form
      className="flex flex-col gap-4 items-center justify-center w-full max-w-[390px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
        <div className="w-full">
          <label htmlFor="email" className="block w-full font-semibold text-[18px] mb-1.5">
            이메일
            <span className="text-red-500">*</span>
          </label>
          <div className="flex w-full">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
              value={formState.email.value}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => handleCheckDuplicate('email')}
              disabled={formState.email.isChecking}
              className="bg-[#D9D9D9] w-20 h-full text-nowrap rounded-md px-2.5 py-2 ml-2 hover:brightness-90"
              aria-label="이메일 중복 확인"
            >
              {isCheckingDuplicate.email ? '확인 중' : '확인'}
            </button>
          </div>
        </div>
        {formState.email.error && <p className="text-red-500 text-sm mt-1">{formState.email.error}</p>}
        {formState.email.successMessage && (
          <p className="text-green-500 text-sm mt-1">{formState.email.successMessage}</p>
        )}
      </div>

      <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
        <div className="w-full">
          <label htmlFor="nickname" className="w-full block font-semibold text-[18px] mb-1.5">
            닉네임
            <span className="text-red-500">*</span>
          </label>
          <div className="flex w-full">
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
              value={formState.nickname.value}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => handleCheckDuplicate('nickname')}
              disabled={formState.nickname.isChecking}
              className="bg-[#D9D9D9] w-20 h-full text-nowrap rounded-md px-2.5 py-2 ml-2 hover:brightness-90"
              aria-label="닉네임 중복 확인"
            >
              {isCheckingDuplicate.nickname ? '확인 중' : '확인'}
            </button>
          </div>
        </div>
        {formState.nickname.error && <p className="text-red-500 text-sm mt-1">{formState.nickname.error}</p>}
        {formState.nickname.successMessage && (
          <p className="text-green-500 text-sm mt-1">{formState.nickname.successMessage}</p>
        )}
      </div>

      <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
        <div className="w-full">
          <label htmlFor="password" className="block font-semibold text-[18px] mb-1.5">
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
            value={formState.password.value}
            onChange={handleChange}
            required
          />
          {formState.password.error && <p className="text-red-500 text-sm mt-1">{formState.password.error}</p>}
          <label htmlFor="confirmPassword" className="block font-semibold text-[18px] mb-1.5 mt-4">
            비밀번호 확인:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
            value={formState.confirmPassword.value}
            onChange={handleChange}
            required
          />
          {formState.confirmPassword.error && (
            <p className="text-red-500 text-sm mt-1">{formState.confirmPassword.error}</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-20  bg-[#3ECF8E] w-full text-[20px] font-semibold px-4 py-2 rounded hover:brightness-90"
        >
          다음
        </button>
      </div>
    </form>
  );
};

export default EssentialInfoForm;
