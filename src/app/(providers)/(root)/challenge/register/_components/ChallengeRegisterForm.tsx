'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeRegister } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { FormEvent, useRef } from 'react';
import FormImageUploader from '../../_components/FormImageUploader';
import FormInput from '../../_components/FormInput';
import FormTextArea from '../../_components/FormTextArea';
import FormCalendar from './FormCalendar';

const ChallengeRegisterForm = () => {
  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: challengeRegister, isPending } = useChallengeRegister();
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO Rating, Tags 생각
  //TODO pending으로 로딩상태 보여주기?,
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const file = inputRef?.current?.files?.[0] || null;

    if (!file) {
      console.error('Challenge Register Image Error : 사진을 올려주세요.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const verify = formData.get('verify') as string;

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

    if (!verify) {
      console.error('Challenge Register Verify Error : 인증 방법을 입력해주세요.');
      return;
    }

    const form = new FormData();
    form.append('file', file);

    const data = { storage: 'challengeRegister', form };

    upload(data, {
      onSuccess: async (response) => {
        const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);
        const data: Omit<Tables<'challenges'>, 'id'> = {
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
        };

        challengeRegister(data, {
          onSuccess: () => console.log('Challenge Register Successfully'),
          onError: (error) => console.error('Chaalenge Register Failed', error),
        });
      },
      onError: (error) => console.error('UPLOAD FAILED', error),
    });
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
      <FormInput label="인증 방법" name="verify" placeholder="누워서 셀카를 올려주세용" />

      <button type="submit" className="select-none w-full rounded-md bg-[#3ecf8e] font-bold py-2">
        입력 안해?
      </button>
    </form>
  );
};

export default ChallengeRegisterForm;
