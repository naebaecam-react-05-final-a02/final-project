'use client';

import { initialFormState } from '@/data/authInitialState';
import { useCheckDuplicate, useSignUp } from '@/hooks/auth/useUsers';
import { FormState } from '@/types/auth';
import Link from 'next/link';
import { useState } from 'react';
import { validatePassword } from '../../../_utils/passwordValidation';
import AdditionalInfoForm from '../AdditionalInfoForm';
import EssentialInfoForm from '../EssentialInfoForm/EssentialInfoForm';

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState('essentialInfo');
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const { mutateAsync: signUpAsync, isPending: isSignUpPending, error: signUpError } = useSignUp();
  const { mutateAsync: checkDuplicate, isPending: isCheckingDuplicate } = useCheckDuplicate();

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

  const nextStep = () => {
    if (currentStep === 'essentialInfo') setCurrentStep('additionalInfo');
    else if (currentStep === 'additionalInfo') setCurrentStep('success');
  };

  const previousStep = () => {
    if (currentStep === 'additionalInfo') setCurrentStep('essentialInfo');
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
      return; // 함수 실행 중단
    }

    setFormState((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        isChecking: true,
      },
    }));

    try {
      const result = await checkDuplicate({ field, value: formState[field].value });

      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          error: result ? null : `이미 사용 중인 ${field === 'email' ? '이메일' : '닉네임'}입니다.`,
          successMessage: result ? `사용 가능한 ${field === 'email' ? '이메일' : '닉네임'}입니다.` : null,
          isVerified: result,
          isChecking: false,
        },
      }));
    } catch (error) {
      console.error(`${field} 중복 확인 중 오류 발생:`, error);
      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          error: '중복 확인 중 오류가 발생했습니다.',
          isChecking: false,
        },
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormState((prev) => ({
        ...prev,
        profileImage: {
          value: file,
          error: null,
        },
      }));
    }
  };

  const handleEssentialInfoNext = async (e: React.FormEvent<HTMLFormElement>) => {
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

    nextStep();
  };

  const handleAdditionalInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;
    const newFormState = { ...formState };

    // 추가 정보 유효성 검사
    if (newFormState.height?.value) {
      if (Number(newFormState.height.value) < 100 || Number(newFormState.height.value) > 250) {
        newFormState.height.error = '유효한 키를 입력해주세요 (100cm ~ 250cm).';
        hasError = true;
      } else {
        newFormState.height.error = null;
      }
    }

    if (newFormState.weight?.value) {
      if (Number(newFormState.weight.value) < 30 || Number(newFormState.weight.value) > 300) {
        newFormState.weight.error = '유효한 몸무게를 입력해주세요 (30kg ~ 300kg).';
        hasError = true;
      } else {
        newFormState.weight.error = null;
      }
    }

    if (hasError) {
      setFormState(newFormState);
      return;
    }
    try {
      const formData = new FormData();
      formData.append('email', formState.email.value);
      formData.append('nickname', formState.nickname.value);
      formData.append('password', formState.password.value);
      if (formState.height?.value) formData.append('height', formState.height.value);
      if (formState.weight?.value) formData.append('weight', formState.weight.value);
      if (formState.profileImage?.value) formData.append('profileImage', formState.profileImage.value);

      console.log('FormData content:', Object.fromEntries(formData));
      await signUpAsync(formData);
      nextStep(); // 성공 페이지로 이동
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex flex-col gap-10 h-screen justify-center items-center w-full">
      <div className="flex gap-4 mb-4 mt-4">
        {['essentialInfo', 'additionalInfo', 'success'].map((stepName) => (
          <div
            key={stepName}
            className={`w-3 h-3 rounded-full ${currentStep === stepName ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      {currentStep === 'essentialInfo' && (
        <EssentialInfoForm
          formState={formState}
          handleChange={handleChange}
          handleCheckDuplicate={handleCheckDuplicate}
          onSubmit={handleEssentialInfoNext}
        />
      )}
      {currentStep === 'additionalInfo' && (
        <>
          <AdditionalInfoForm
            formState={formState}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            onSubmit={handleAdditionalInfoSubmit}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={previousStep}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:brightness-90"
            >
              이전
            </button>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:brightness-90"
              disabled={isSignUpPending}
            >
              {isSignUpPending ? '처리 중...' : '회원가입'}
            </button>
          </div>
        </>
      )}
      {currentStep === 'success' && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">회원가입 성공!</h2>
          <p className="mb-4">회원가입이 성공적으로 완료되었습니다.</p>
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
            홈으로 가기
          </Link>
        </div>
      )}
      {signUpError && <div className="text-red-500">{(signUpError as Error).message}</div>}
    </div>
  );
};

export default SignUpForm;
