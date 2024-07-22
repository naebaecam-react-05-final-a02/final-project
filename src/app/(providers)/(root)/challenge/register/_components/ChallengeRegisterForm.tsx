'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import { FormEvent, useRef } from 'react';
import FormImageUploader from '../../_components/FormImageUploader';
import FormInput from '../../_components/FormInput';
import FormTextArea from '../../_components/FormTextArea';
import FormCalendar from './FormCalendar';

const ChallengeRegisterForm = () => {
  const supabase = createClient();
  const { data: user } = useGetUser();
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO hooks로 로직 따로 빼야함
  //TODO Rating, Tags 생각
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;

    if (!file) {
      console.error('Challenge Register Image Error : 사진을 올려주세요.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title');
    const content = formData.get('content');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const certify = formData.get('certify');

    if (!title) {
      console.error('Challenge Register Title Error : 제목을 입력 해주세요.');
      return;
    }

    if (!content) {
      console.error('Challenge Register Content Error : 내용을 입력 해주세요.');
      return;
    }

    if (!startDate) {
      console.error('Challenge Register Date Error : 시작하는 날을 설정 해주세요.');
      return;
    }

    if (!endDate) {
      console.error('Challenge Register Date Error : 끝나는 날을 설정 해주세요.');
      return;
    }

    if (!certify) {
      console.error('Challenge Register Certify Error : 인증 방법을 입력해주세요.');
      return;
    }

    try {
      const extension = file.name.split('.').slice(-1);
      const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;
      const res = await supabase.storage.from('challengeRegister').upload(`/${filename}`, file);

      const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${res.data?.fullPath}`;

      const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);

      const data = {
        title,
        content,
        startDate,
        endDate,
        isProgress: today == startDate,
        createdBy: user?.id,
        imageURL,
        certify,
      };

      console.log(data);
      try {
        const response = await supabase.from('challenges').insert(data);
        console.log('Challenge Register Response___', response);
      } catch (error) {
        console.log('Challenge Register Error___', error);
      }
    } catch (error) {
      console.log('Challenge Register Image Upload Error___', error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full">
      {/* 사진 */}
      <FormImageUploader ref={inputRef} />

      {/* 챌린지 이름 */}
      <FormInput label="챌린지 이름" name="title" placeholder="누워서 숨쉬기?" />

      {/* 챌린지 내용 */}
      <FormTextArea
        maxLength={300}
        label="챌린지 내용"
        name="content"
        placeholder="에어컨 틀고 이불덮고 누워서 티비보기"
      />

      {/* 챌린지 기간 */}
      <FormCalendar />

      {/* 인증 방법 */}
      <FormInput label="인증 방법" name="certify" placeholder="누워서 셀카를 올려주세용" />

      <button type="submit" className="select-none w-full rounded-md bg-[#3ecf8e] font-bold py-2">
        입력 안해?
      </button>
    </form>
  );
};

export default ChallengeRegisterForm;
