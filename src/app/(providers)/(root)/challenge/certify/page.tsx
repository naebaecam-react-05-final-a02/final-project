'use client';

import { FormEvent, useRef } from 'react';
import FormImageUploader from '../_components/FormImageUploader';
import FormTextArea from '../_components/FormTextArea';

const ChallengeCertifyPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO 유효성 검사
  //TODO hooks로 로직 따로 빼야함
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;

    if (!file) return;

    const formData = new FormData(currentTarget);

    /**
     * id,
     * impression,
     */
    const data = {
      impression: formData.get('impression'),
    };

    console.log('DATA___', data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-6 w-full">
      {/* 챌린지 이름인가? */}
      <div className="w-full h-14 bg-[#5c5c5c] text-white text-sm flex items-center px-6 rounded-md">
        매일 유산소 챌린지
      </div>

      {/* 인증 사진 */}
      <FormImageUploader ref={inputRef} />

      {/* 오늘의 소감 */}
      <FormTextArea
        label="오늘 챌린지는 어떠셨나요"
        maxLength={100}
        name="impression"
        placeholder="정말 조았습니다요"
      />

      <button className="select-none w-full rounded-md bg-[#3ecf8e] font-bold py-2">제출하기</button>
    </form>
  );
};

export default ChallengeCertifyPage;
