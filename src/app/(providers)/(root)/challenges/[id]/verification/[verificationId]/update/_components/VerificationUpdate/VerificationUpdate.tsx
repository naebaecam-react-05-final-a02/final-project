'use client';

import ChallengeTextArea from '@/app/(providers)/(root)/challenges/_components/ChallengeTextArea/ChallengeTextArea';
import Button from '@/components/Button';
import { useModal } from '@/contexts/modal.context/modal.context';
import {
  useChallengeVerificationDelete,
  useChallengeVerificationUpdate,
  useGetChallengeVerification,
} from '@/hooks/challenge/useChallenge';
import { useImageUpload } from '@/hooks/image/useImage';
import { queryClient } from '@/providers/QueryProvider';
import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

type VerificationUpdateProps = {
  vid: string;
  cid: string;
  me: User;
};

//TODO 데이터 삭제 후 바로 안넘어가고 밑에 데이터 없을때 한번 보여주고 지나감.. Y!
const VerificationUpdate = ({ cid, vid, me }: VerificationUpdateProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const router = useRouter();
  const modal = useModal();

  const { mutate: upload, isPending: uploading } = useImageUpload();
  const { mutate: updateVerification } = useChallengeVerificationUpdate();
  const { mutate: deleteVerification } = useChallengeVerificationDelete();
  const { data: verification } = useGetChallengeVerification(supabase, cid, vid);

  if (!verification || !verification.data) {
    return (
      <>
        <div className="bg-red-300 p-4 text-white">
          <div className="font-bold text-xl">{verification?.error}</div>
          <div className="text-sm">{verification?.details}</div>
        </div>

        <Link href={`/challenges/${cid}/verification/list`}>
          <div className="bg-black/40 text-white px-4 py-2 text-center ">돌아가기</div>
        </Link>
      </>
    );
  }

  const handleDelete = async () => {
    try {
      deleteVerification(
        { cid, vid },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['verifications', { cid }],
            });
            queryClient.removeQueries({
              queryKey: ['verifications', { cid, vid }],
            });
            router.replace(`/challenges/${cid}/verification/list`);
          },
        },
      );
    } catch (error) {
      console.error(error);
      modal.alert(['모종의 이유로 실패!']);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;

    if (!file && !verification.data.imageURLs) {
      console.error('Challenge Verify Image Error : 사진을 올려주세요.');
      return;
    }

    if (!cid) {
      console.error('Challenge Id is invalid', cid);
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
          onSuccess: (response) => {
            const updateData: Omit<Tables<'challengeVerify'>, 'id' | 'date'> = {
              impression,
              imageURLs: response.imageURLs,
              userId: me?.id!,
              challengeId: Number(cid),
            };

            updateVerification(
              { updateData, cid, vid },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ['verifications'],
                  });
                  queryClient.invalidateQueries({
                    queryKey: ['verifications', { cid, vid }],
                  });
                  router.push(`/challenges/${cid}/verification/list`);
                },
                onError: (error) => console.error('Chaalenge Verify Update Failed', error),
              },
            );
          },
          onError: (error) => console.error('UPLOAD FAILED', error),
        },
      );
    } else if (verification.data.imageURLs) {
      const updateData: Omit<Tables<'challengeVerify'>, 'id' | 'date'> = {
        impression,
        imageURLs: verification.data.imageURLs,
        userId: me?.id!,
        challengeId: Number(cid),
      };

      updateVerification(
        { updateData, cid, vid },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['verifications'],
            });
            queryClient.invalidateQueries({
              queryKey: ['verifications', { cid, vid }],
            });
            router.push(`/challenges/${cid}/verification/list`);
          },
          onError: (error) => console.error('Chaalenge Verify Update Failed', error),
        },
      );
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col justify-between size-full p-4 relative">
      <div className="grid place-items-center gap-y-6">
        <div className="w-full flex flex-col gap-y-2">
          <div className="flex gap-x-px text-base  pl-1">
            <div className=" text-primary-100">헬리니뇨속</div>
            <div className="text-white">수정을 시작해볼까요?</div>
          </div>
          <ChallengeTextArea
            label="느낀점을 수정해보아요"
            maxLength={100}
            name="impression"
            placeholder="오늘의 챌린지 후기를 알려주세요."
            defaultValue={verification.data.impression}
          />
        </div>

        <div className="flex flex-col gap-y-4 w-full">
          <div className="text-base text-white ">챌린지 인증 사진을 새로 업로드 해보아요</div>
          <div className="grid gap-y-4 w-full">
            {/* <FormImageUploader
              ref={inputRef}
              label="챌린지 인증 사진 추가하기"
              src={verification.data.imageURLs}
              maxImage={3}
            /> */}
            <div className="text-white/50 flex gap-x-1">
              <AiOutlineExclamationCircle />
              <p className="text-xs"> 최대 3장까지 업로드 가능합니다.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-x-2">
        <Button className="select-none w-1/2" type="submit">
          수정 하기
        </Button>
        <Button className="select-none w-1/2" onClick={() => handleDelete()}>
          삭제 하기
        </Button>
      </div>
    </form>
  );
};

export default VerificationUpdate;
