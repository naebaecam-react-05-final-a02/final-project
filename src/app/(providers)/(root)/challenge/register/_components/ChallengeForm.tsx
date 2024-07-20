'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import { FormEvent, useRef } from 'react';
import FormImageUploader from '../../_components/FormImageUploader';
import FormInput from '../../_components/FormInput';
import FormTextArea from '../../_components/FormTextArea';
import FormCalendar from './FormCalendar';

const ChallengeForm = () => {
  const supabase = createClient();
  const { data: user } = useGetUser();
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO 유효성 검사
  //TODO hooks로 로직 따로 빼야함
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;

    if (!file) return;

    const extension = file.name.split('.').slice(-1);
    const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;
    const res = await supabase.storage.from('challengeRegister').upload(`/${filename}`, file);

    if (!res.data) {
      console.log('FILE UPLOAD FAILED___', res);
      return;
    }

    const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${res.data.fullPath}`;

    const formData = new FormData(currentTarget);

    /**
     * id,
     * title,
     * content,
     * startDate.
     * endDate,
     * isProgress,
     * createdBy -> userId
     * rating?,
     * tags?,
     * imageURL,
     * desc,
     */
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      isProgress: true,
      createdBy: user?.id,
      imageURL,
      desc: formData.get('desc'),
    };

    const response = await supabase.from('challenges').insert(data);

    console.log('RESPONSE___', response);
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
      <FormInput label="인증 방법" name="desc" placeholder="누워서 셀카를 올려주세용" />

      <button type="submit" className="select-none w-full rounded-md bg-[#3ecf8e] font-bold py-2">
        입력 안해?
      </button>
    </form>
  );
};

export default ChallengeForm;
