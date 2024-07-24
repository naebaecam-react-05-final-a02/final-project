'use client';

import { useCheckDuplicate, useSignUp } from '@/hooks/auth/useUsers';
import Link from 'next/link';
import { useState } from 'react';
import { validatePassword } from '../../_utils/passwordValidation';

interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email: string | null;
  nickname: string | null;
  password: string | null;
  confirmPassword: string | null;
}

const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState('email');
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: null,
    nickname: null,
    password: null,
    confirmPassword: null,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutateAsync: signUpAsync, isPending: isSignUpPending, error: signUpError } = useSignUp();
  const { mutateAsync: checkDuplicate, isPending: isCheckingDuplicate } = useCheckDuplicate();

  const validationRules = {
    email: (value: string) => (!value.includes('@') ? '유효한 이메일 주소를 입력해주세요.' : null),
    nickname: (value: string) => (value.length < 2 ? '닉네임은 2자 이상이어야 합니다.' : null),
    password: validatePassword,
    confirmPassword: (value: string, allValues: SignUpFormData) =>
      value !== allValues.password ? '비밀번호가 일치하지 않습니다.' : null,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      console.log('Updating formData:', { ...prev, [name]: value });
      return { ...prev, [name]: value };
    });
  };

  const nextStep = () => {
    if (currentStep === 'email') setCurrentStep('nickname');
    else if (currentStep === 'nickname') setCurrentStep('password');
    else if (currentStep === 'password') setCurrentStep('success');
  };

  const previousStep = () => {
    if (currentStep === 'nickname') setCurrentStep('email');
    else if (currentStep === 'password') setCurrentStep('nickname');
  };

  const handleEmailNext = () => {
    const emailError = validationRules.email(formData.email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }
    nextStep();
  };

  const handleCheckDuplicate = async (field: 'email' | 'nickname') => {
    try {
      console.log(field, formData[field]);
      const result = await checkDuplicate({ field, value: formData[field] });
      if (result) {
        setErrors((prev) => ({ ...prev, [field]: null }));
        // 사용 가능한 경우 메시지
        setSuccessMessage(`사용 가능한 ${field === 'email' ? '이메일' : '닉네임'}입니다.`);
      } else {
        setErrors((prev) => ({ ...prev, [field]: `이미 사용 중인 ${field === 'email' ? '이메일' : '닉네임'}입니다.` }));
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error(`${field} 중복 확인 중 오류 발생:`, error);
      setErrors((prev) => ({ ...prev, [field]: '중복 확인 중 오류가 발생했습니다.' }));
      setSuccessMessage(null);
    }
  };

  const handleNicknameNext = () => {
    const nicknameError = validationRules.nickname(formData.nickname);
    if (nicknameError) {
      setErrors((prev) => ({ ...prev, nickname: nicknameError }));
      return;
    }
    nextStep();
  };

  const handlePasswordNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.password || errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
      return;
    }
    try {
      await signUpAsync(formData);
      nextStep();
    } catch (error) {
      setErrors((prev) => ({ ...prev, password: '회원가입 중 오류가 발생했습니다.' }));
    }
  };

  return (
    <div className="flex flex-col gap-10 h-screen justify-center items-center w-full">
      <div className="flex gap-4 mb-4 mt-4">
        {['email', 'nickname', 'password', 'success'].map((stepName) => (
          <div
            key={stepName}
            className={`w-3 h-3 rounded-full ${currentStep === stepName ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
      <form
        className="flex flex-col gap-4 items-center justify-center w-full max-w-[390px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]"
        onSubmit={handlePasswordNext}
      >
        {currentStep === 'email' && (
          <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
            <div className="w-full">
              <label htmlFor="email" className="block font-semibold text-[18px] mb-1.5">
                이메일:
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleCheckDuplicate('email')}
                  disabled={isCheckingDuplicate}
                  className="bg-[#D9D9D9] w-1/4 h-full text-nowrap rounded-md px-2.5 py-2 ml-2 hover:brightness-90"
                >
                  {isCheckingDuplicate ? '확인 중...' : '확인'}
                </button>
              </div>
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            {successMessage && <p className="text-green-500 text-sm mt-1">{successMessage}</p>}
            <div className="flex justify-center items-end gap-2 mt-4">
              <button onClick={handleEmailNext} className="mt-10 bg-blue-500 text-white px-4 py-2 rounded">
                다음
              </button>
            </div>
          </div>
        )}
        {currentStep === 'nickname' && (
          <div className="flex flex-col items-center w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4">
            <div className="w-full">
              <label htmlFor="nickname" className="block font-semibold text-[18px] mb-1.5">
                닉네임:
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleCheckDuplicate('nickname')}
                  disabled={isCheckingDuplicate}
                  className="bg-[#D9D9D9] w-1/4 h-full text-nowrap rounded-md px-2.5 py-2 ml-2 hover:brightness-90"
                >
                  {isCheckingDuplicate ? '확인 중...' : '확인'}
                </button>
              </div>
            </div>
            {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
            {successMessage && <p className="text-green-500 text-sm mt-1">{successMessage}</p>}
            <div className="flex justify-center items-end gap-2 mt-4">
              <button onClick={previousStep} className="bg-gray-300 text-black px-4 py-2 rounded">
                이전
              </button>
              <button onClick={handleNicknameNext} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                다음
              </button>
            </div>
          </div>
        )}
        {currentStep === 'password' && (
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
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <label htmlFor="confirmPassword" className="block font-semibold text-[18px] mb-1.5 mt-4">
                비밀번호 확인:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              <div className="flex justify-center items-end gap-2 mt-4">
                <button onClick={previousStep} className="bg-gray-300 text-black px-4 py-2 rounded">
                  이전
                </button>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" disabled={isSignUpPending}>
                  {isSignUpPending ? '처리 중...' : '회원가입'}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
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
