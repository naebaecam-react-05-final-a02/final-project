'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading/Loading';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeRegister } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import FormImageUploader from '../../../_components/FormImageUploader';
import FormCalendar from '../FormCalendar';

export interface FormFields {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  category: string;
}

const categoryOptions = [{ value: '운동' }, { value: '식단' }, { value: '생활' }, { value: '기타' }];
const categoryItems: { [key: string]: string } = {
  운동: 'exercise',
  식단: 'diet',
  생활: 'lifestyle',
  기타: 'etc',
};

const ChallengeRegisterForm = () => {
  const router = useRouter();
  const [cate, setCate] = useState<string>('운동');
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
            category: categoryItems[category],
            participants: 0,
          };
          // console.log('registerData', registerData);
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

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full px-4">
      {(uploading || isPending) && <Loading />}

      <div className="select-none">
        <Input label="챌린지 이름" name="title" placeholder="최대 12글자로 작성해 주세요." />
      </div>

      <Input
        readOnly
        inputType="select"
        dropdownOptions={categoryOptions}
        name="category"
        value={cate}
        onChange={(e) => setCate(e.target.value)}
      />

      {/* {<FormCategory label="카테고리" name="category" />} */}

      <div className="select-none">
        <Input label="챌린지 내용 & 인증 방법" name="content" placeholder="챌린지 내용과 인증 방법을 작성해주세요." />
      </div>

      {/* <FormTextArea
        maxLength={200}
        label="챌린지 내용 & 인증 방법"
        name="content"
        placeholder="챌린지 내용과 인증 방법을 작성해 주세요."
      /> */}

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
