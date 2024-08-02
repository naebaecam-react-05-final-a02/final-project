'use client';

import Button from '@/components/Button';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useChallengeVerificationRegister } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import FormImageUploader from '../../../_components/FormImageUploader';
import FormTextArea from '../../../_components/FormTextArea';

const ChallengeVerificationRegisterPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { data: user } = useGetUser();
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: verify, isPending } = useChallengeVerificationRegister();
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
    <form onSubmit={handleSubmit} className="flex flex-col justify-between size-full p-4 relative">
      {uploading && <div>이미지 업로딩..</div>}
      {isPending && <div>로우딩딩딩..</div>}
      {/* 챌린지 이름인가? */}
      <div className="grid place-items-center gap-y-6">
        <div className="w-full h-24 bg-white/5  text-white flex flex-col items-start justify-center gap-y-4 px-4 rounded-md">
          <h6 className="text-base font-semibold">챌린지 이름이름</h6>
          <div className="flex text-sm gap-x-px">
            오늘 벌써 총<p className="text-primary-100">214명</p>이 인증했어요!
          </div>
        </div>

        <FormTextArea label="느낀점" maxLength={100} name="impression" placeholder="오늘의 챌린지 후기를 알려주세요." />

        <div className="grid gap-y-4 w-full">
          <FormImageUploader ref={inputRef} label="챌린지 인증 사진 추가하기" />
          <div className="text-white/50 flex gap-x-1">
            <AiOutlineExclamationCircle />
            <p className="text-xs"> 최대 3장까지 업로드 가능합니다.</p>
          </div>
        </div>
      </div>

      <Button className="select-none ">제출하기</Button>
    </form>
  );
};

export default ChallengeVerificationRegisterPage;
