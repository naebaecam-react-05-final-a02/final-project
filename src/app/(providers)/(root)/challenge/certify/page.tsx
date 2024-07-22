'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeVerify } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { FormEvent, useRef } from 'react';
import FormImageUploader from '../_components/FormImageUploader';
import FormTextArea from '../_components/FormTextArea';

const ChallengeVerifyPage = () => {
  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: verify } = useChallengeVerify();
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO hooks로 로직 따로 빼야함
  //TODO challengeId는 Params?
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;

    if (!file) {
      console.error('Challenge Verify Image Error : 사진을 올려주세요.');
      return;
    }

    const formData = new FormData(currentTarget);
    const impression = formData.get('impression') as string;

    if (!impression) {
      console.error('Challenge Verify Impression Error : 소감을 작성해주세요.');
      return;
    }

    const form = new FormData();
    form.append('file', file);

    const data = { storage: 'challengeVerify', form };

    upload(data, {
      onSuccess: async (response) => {
        const data: Omit<Tables<'challengeVerify'>, 'id'> = {
          impression,
          imageURL: response.imageURL,
          userId: user?.id!,
          challengeId: 15,
        };

        verify(data, {
          onSuccess: () => console.log('Challenge Verify Successfully'),
          onError: (error) => console.error('Chaalenge Verify Failed', error),
        });
      },
      onError: (error) => console.error('UPLOAD FAILED', error),
    });
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

export default ChallengeVerifyPage;
