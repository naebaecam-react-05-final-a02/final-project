'use client';

import FormImageUploader from '@/app/(providers)/(root)/challenges/_components/FormImageUploader';
import FormTextArea from '@/app/(providers)/(root)/challenges/_components/FormTextArea';
import { useChallengeVerifyUpdate, useGetChallengeVerification } from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { deleteVerification } from '@/utils/dataFetching';
import { User } from '@supabase/supabase-js';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import VerificationCardSkeleton from '../../../list/_components/VerificationCardSkeleton';

type VerificationDetailType = {
  challengeId: string;
  verificationId: string;
  user: User;
};

const VerificationDetail = ({ challengeId, verificationId, user }: VerificationDetailType) => {
  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: updateVerification } = useChallengeVerifyUpdate();

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();

  const { data: verification, isFetching } = useGetChallengeVerification(supabase, challengeId, verificationId);

  if (isFetching) {
    return <VerificationCardSkeleton />;
  }

  if (!verification || !verification.data) {
    return (
      <>
        <div className="bg-red-300 p-4 text-white">
          <div className="font-bold text-xl">{verification?.error}</div>
          <div className="text-sm">{verification?.details}</div>
        </div>

        <Link href={`/challenges/${challengeId}/verification/list`}>
          <div className="bg-black/40 text-white px-4 py-2 text-center ">돌아가기</div>
        </Link>
      </>
    );
  }
  const userNumber = verification.data.userId.split('-')[1];
  const nickname = verification.data.users.nickname ? verification.data.users.nickname : `헬린이_${userNumber}`;

  const handleDelete = async () => {
    try {
      const { data, error, details } = await deleteVerification(supabase, challengeId, verificationId);
      alert('데이터가 삭제되었습니다.');
      router.replace(`/challenges/${challengeId}/verification/list`);
    } catch (error) {
      alert('모종의 이유로 실패!');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;

    if (!file && !verification.data.imageURL) {
      console.error('Challenge Verify Image Error : 사진을 올려주세요.');
      return;
    }

    if (!challengeId) {
      console.error('Challenge Id is invalid', challengeId);
      return;
    }

    const formData = new FormData(currentTarget);
    const impression = formData.get('impression') as string;

    if (!impression) {
      console.error('Challenge Verify Impression Error : 소감을 작성해주세요.');
      return;
    }

    if (file) {
      const form = new FormData();
      form.append('file', file);

      upload(
        { storage: 'challengeVerify', form },
        {
          onSuccess: async (response) => {
            const updateData: Omit<Tables<'challengeVerify'>, 'id' | 'date'> = {
              impression,
              imageURL: response.imageURL,
              userId: user?.id!,
              challengeId: Number(challengeId),
            };

            updateVerification(
              { updateData, cid: challengeId, vid: verificationId },
              {
                onSuccess: () => {
                  console.log('Challenge Verify Update Successfully');
                  router.push('/');
                },
                onError: (error) => console.error('Chaalenge Verify Update Failed', error),
              },
            );
          },
          onError: (error) => console.error('UPLOAD FAILED', error),
        },
      );
    } else if (verification.data.imageURL) {
      const updateData: Omit<Tables<'challengeVerify'>, 'id' | 'date'> = {
        impression,
        imageURL: verification.data.imageURL,
        userId: user?.id!,
        challengeId: Number(challengeId),
      };

      updateVerification(
        { updateData, cid: challengeId, vid: verificationId },
        {
          onSuccess: () => {
            console.log('Challenge Verify Update Successfully');
            router.push('/');
          },
          onError: (error) => console.error('Chaalenge Verify Update Failed', error),
        },
      );
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-gray-100 group-active:shadow-[inset_0_2px_8px_gray] rounded-lg
    select-none"
    >
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex gap-x-4 items-center">
          <div className="rounded-full bg-gray-200 w-12 h-12">{/* 나중에 프로필 사진 */}</div>
          <div className="text-sm font-bold">
            {nickname}
            <div className="text-xs text-green-500">인증 완료</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-600">{format(verification.data.date!, 'yyyy-MM-dd')}</div>
          <div className="text-xs text-gray-500">{format(verification.data.date!, 'hh:mm:ss a')}</div>
        </div>
      </div>
      <div className="w-full bg-[#f6f6f6] border border-gray-300 rounded-lg shadow-sm">
        {isUpdate ? (
          <>
            <FormImageUploader ref={inputRef} src={verification.data.imageURL!} />
            <FormTextArea
              label="수정할 내용을 작성해주세요"
              maxLength={100}
              name="impression"
              placeholder="정말 조았습니다요"
              defaultValue={verification.data.impression}
            />
          </>
        ) : (
          <>
            <div className="w-full aspect-video relative bg-gray-100">
              <Image className="object-cover" fill src={verification.data.imageURL!} alt={`${nickname}'s image`} />
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center py-1">
                챌린지 이미지
              </div>
            </div>
            <div className="text-xs font-bold p-4">
              <p className={`w-full whitespace-pre-line break-words`}>{verification.data.impression}</p>
            </div>
          </>
        )}
      </div>
      {verification.data.users.id === user?.id && (
        <div className="flex w-full justify-between gap-x-2 my-2 select-none">
          {isUpdate ? (
            <>
              <button
                className="w-full bg-blue-300 hover:bg-blue-400 hover:shadow-lg
    active:shadow-[inset_0_4px_8px_blue]
    rounded py-2 text-white font-bold"
                type="submit"
              >
                확인
              </button>
              <button
                className="w-full bg-red-300 hover:bg-red-400 hover:shadow-lg
    active:shadow-[inset_0_4px_8px_red]
    rounded py-2 text-white font-bold"
                onClick={() => setIsUpdate(false)}
                type="button"
              >
                취소
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full bg-blue-300 hover:bg-blue-400 hover:shadow-lg
      active:shadow-[inset_0_4px_8px_blue]
      rounded py-2 text-white font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUpdate(true);
                }}
                type="button"
              >
                수정
              </button>
              <button
                className="w-full bg-red-300 hover:bg-red-400 hover:shadow-lg
      active:shadow-[inset_0_4px_8px_red]
      rounded py-2 text-white font-bold"
                onClick={handleDelete}
                type="button"
              >
                삭제
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
};

export default VerificationDetail;
