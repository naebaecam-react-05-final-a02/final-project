'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeRegister } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import FormImageUploader from '../../../_components/FormImageUploader';
import FormTextArea from '../../../_components/FormTextArea';
import FormCalendar from '../FormCalendar';
import FormCategory from '../FormCategory';

export interface FormFields {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  category: string;
}

const ChallengeRegisterForm = () => {
  const router = useRouter();
  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: challengeRegister, isPending } = useChallengeRegister();
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO Rating, Tags 생각..?
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = inputRef?.current?.files?.[0] || null;

    if (!file) {
      console.error('Challenge Register Image Error : 사진을 올려주세요.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const fields: (keyof FormFields)[] = ['title', 'content', 'startDate', 'endDate', 'category'];
    const formFields: Partial<FormFields> = {};

    for (const field of fields) {
      const value = formData.get(field);
      if (typeof value !== 'string' || value.trim() === '') {
        console.error(`Challenge Register ${field} Error : ${field}을(를) 입력 해주세요.`);
        return;
      }
      formFields[field] = value.trim();
    }

    const { title, content, startDate, endDate, category } = formFields as FormFields;

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
            verify: null,
            tags: null,
            rating: 0,
            category,
          };

          challengeRegister(registerData, {
            onSuccess: () => {
              console.log('Challenge Register Successfully');
              router.push('/challenges');
            },
            onError: (error) => console.error('Chaalenge Register Failed', error),
          });
        },
        onError: (error) => console.error('UPLOAD FAILED', error),
      },
    );
  };

  //TODO 카테고리, 캘린더 ui 수정 필요
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full px-4">
      {uploading && <div>이미지 업로딩..</div>}
      {isPending && <div>로우딩딩딩..</div>}

      <div className="select-none">
        <Input label="챌린지 이름" name="title" placeholder="최대 12글자로 작성해 주세요." maxLength={12} />
      </div>

      {<FormCategory label="카테고리" name="category" />}

      <FormTextArea
        maxLength={200}
        label="챌린지 내용 & 인증 방법"
        name="content"
        placeholder="챌린지 내용과 인증 방법을 작성해 주세요."
      />

      <FormCalendar />

      <div className="grid gap-y-4">
        <FormImageUploader ref={inputRef} />
        <div className="text-white/50 flex gap-x-1">
          <AiOutlineExclamationCircle />
          <p className="text-xs"> 홍보를 위한 썸네일 이미지를 함께 업로드 해주세요!</p>
        </div>
      </div>
      <Button type="submit" className="select-none">
        챌린지 등록하기
      </Button>
    </form>
  );
};

export default ChallengeRegisterForm;
