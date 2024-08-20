'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { FormState, NicknameFormProps } from '@/types/auth';
import { useState } from 'react';
import validateNicknameInfo from '../../../_utils/validateNicknameInfo';

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

    // 유효성 검사 수행
    const { isValid, errors } = validateNicknameInfo(formState);
    if (!isValid) {
      setFormState((prev) => ({
        ...prev,
        ...errors,
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
          error: result ? null : '이미 사용 중입니다!',
          successMessage: result ? '사용가능한 닉네임 입니다!' : null,
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
    <form className="flex flex-col gap-4 items-center justify-center w-full " onSubmit={handleSubmit}>
      <div className="flex flex-col w-full justify-between content-between">
        <div className="flex flex-col items-center w-full">
          <div className="w-full">
            <h3 className="text-18 font-semibold mt-8 mb-6 text-white">사용하실 닉네임을 알려주세요!</h3>
            <div className="flex flex-col w-full items-start pb-10">
              <div className={`flex w-full gap-2 ${formState.nickname.error ? 'items-center' : 'items-end'}`}>
                <Input
                  label="닉네임"
                  name="nickname"
                  placeholder="닉네임을 입력해 주세요."
                  value={formState.nickname.value}
                  error={formState.nickname.error}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  onClick={handleCheckDuplicate}
                  disabled={isCheckingDuplicate}
                  className="bg-primary-70 !w-16 h-10 text-nowrap px-2 py-3.5"
                  aria-label="닉네임 중복 확인"
                >
                  {isCheckingDuplicate ? '확인 중' : '확인'}
                </Button>
              </div>
              {formState.nickname.successMessage && (
                <p className="text-primary-100 text-[12px] ml-1 mt-1">{formState.nickname.successMessage}</p>
              )}
            </div>
            <ul className="list-disc w-full px-4 text-white/50 text-xs font-normal">
              <li>최대 10자 이내</li>
              <li>특수문자, 띄어쓰기 사용 불가합니다.</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between mt-4"></div>
      </div>
    </form>
  );
};

export default NicknameForm;
