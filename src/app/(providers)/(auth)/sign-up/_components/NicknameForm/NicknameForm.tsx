'use client';

import Input from '@/components/Input';
import { FormState, NicknameFormProps } from '@/types/auth';
import { useState } from 'react';

const NicknameForm = ({ formState, setFormState, checkDuplicate }: NicknameFormProps) => {
  const [isCheckingDuplicate, setIsCheckingDuplicate] = useState(false);

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

  const handleCheckDuplicate = async () => {
    if (!formState.nickname.value.trim()) {
      setFormState((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          error: '닉네임을 입력해주세요.',
          successMessage: null,
          isVerified: false,
        },
      }));
      return;
    }

    setIsCheckingDuplicate(true);

    try {
      const result = await checkDuplicate('nickname', formState.nickname.value);

      setFormState((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          error: result ? null : '이미 사용 중인 닉네임입니다.',
          successMessage: result ? '사용 가능한 닉네임입니다.' : null,
          isVerified: result,
        },
      }));
    } catch (error) {
      console.error('닉네임 중복 확인 중 오류 발생:', error);
      setFormState((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          error: '중복 확인 중 오류가 발생했습니다.',
        },
      }));
    } finally {
      setIsCheckingDuplicate(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.nickname.isVerified) {
      setFormState((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          error: '닉네임 중복 확인이 필요합니다.',
        },
      }));
      return;
    }
  };

  return (
    <form
      className="flex flex-col gap-4 items-center justify-center w-full max-w-[390px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full justify-between content-between">
        <div className="flex flex-col items-center w-full px-4">
          <div className="w-full">
            <div className="flex w-full items-end">
              <Input
                label="닉네임"
                name="nickname"
                placeholder="닉네임을 입력해 주세요."
                value={formState.nickname.value}
                error={formState.nickname.error}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={handleCheckDuplicate}
                disabled={isCheckingDuplicate}
                className="bg-primary-70 w-20 h-full text-nowrap rounded-md px-2.5 py-3.5 ml-2 hover:brightness-90"
                aria-label="닉네임 중복 확인"
              >
                {isCheckingDuplicate ? '확인 중' : '확인'}
              </button>
            </div>
          </div>
          {formState.nickname.successMessage && (
            <p className="text-green-500 text-sm mt-1">{formState.nickname.successMessage}</p>
          )}
        </div>
        <div className="flex justify-between mt-4"></div>
      </div>
    </form>
  );
};

export default NicknameForm;
