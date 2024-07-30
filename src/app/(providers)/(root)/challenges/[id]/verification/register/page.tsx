'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeVerify } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import FormImageUploader from '../../../_components/FormImageUploader';
import FormTextArea from '../../../_components/FormTextArea';

const ChallengeVerificationRegisterPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: verify, isPending } = useChallengeVerify();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;
    const challengeId = params.id;

    if (!file) {
      console.error('Challenge Verify Image Error : 사진을 올려주세요.');
      return;
    }

    if (!challengeId) {
      console.error('Challenge Id is invalid', params);
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

    upload(
      { storage: 'challengeVerify', form },
      {
        onSuccess: async (response) => {
          const verifyData: Omit<Tables<'challengeVerify'>, 'id' | 'date'> = {
            impression,
            imageURL: response.imageURL,
            userId: user?.id!,
            challengeId: Number(challengeId),
          };

          verify(verifyData, {
            onSuccess: () => {
              console.log('Challenge Verify Successfully');
              router.push('/');
            },
            onError: (error) => console.error('Chaalenge Verify Failed', error),
          });
        },
        onError: (error) => console.error('UPLOAD FAILED', error),
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-6 w-full">
      {uploading && <div>이미지 업로딩..</div>}
      {isPending && <div>로우딩딩딩..</div>}
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

export default ChallengeVerificationRegisterPage;
