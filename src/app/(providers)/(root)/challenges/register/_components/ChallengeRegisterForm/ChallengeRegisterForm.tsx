'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeRegister } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import FormImageUploader from '../../../_components/FormImageUploader';
import FormInput from '../../../_components/FormInput';
import FormTextArea from '../../../_components/FormTextArea';
import FormCalendar from '../FormCalendar';
import FormCategory from '../FormCategory';

export interface FormFields {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  verify: string;
  category: string;
}

const ChallengeRegisterForm = () => {
  const router = useRouter();
  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: challengeRegister, isPending } = useChallengeRegister();
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO Rating, Tags 생각
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = inputRef?.current?.files?.[0] || null;

    if (!file) {
      console.error('Challenge Register Image Error : 사진을 올려주세요.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const fields: (keyof FormFields)[] = ['title', 'content', 'startDate', 'endDate', 'verify', 'category'];
    const formFields: Partial<FormFields> = {};

    for (const field of fields) {
      const value = formData.get(field);
      if (typeof value !== 'string' || value.trim() === '') {
        console.error(`Challenge Register ${field} Error : ${field}을(를) 입력 해주세요.`);
        return;
      }
      formFields[field] = value.trim();
    }

    const { title, content, startDate, endDate, verify, category } = formFields as FormFields;

    const form = new FormData();
    form.append('file', file);

    upload(
      { storage: 'challengeRegister', form },
      {
        onSuccess: async (response) => {
          const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);
          const registerData: Omit<Tables<'challenges'>, 'id'> = {
            title,
            content,
            startDate,
            endDate,
            isProgress: today == startDate,
            createdBy: user?.id!,
            imageURL: response.imageURL,
            verify,
            tags: null,
            rating: 0,
            category,
          };

          challengeRegister(registerData, {
            onSuccess: () => {
              console.log('Challenge Register Successfully');
              router.push('/');
            },
            onError: (error) => console.error('Chaalenge Register Failed', error),
          });
        },
        onError: (error) => console.error('UPLOAD FAILED', error),
      },
    );
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full">
      {uploading && <div>이미지 업로딩..</div>}
      {isPending && <div>로우딩딩딩..</div>}
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
      <FormInput label="인증 방법" name="verify" placeholder="누워서 셀카를 올려주세용" />

      {/* 카테고리 */}
      <FormCategory label="카테고리" name="category" />

      <button type="submit" className="select-none w-full rounded-md bg-[#3ecf8e] font-bold py-2">
        입력 안해?
      </button>
    </form>
  );
};

export default ChallengeRegisterForm;
