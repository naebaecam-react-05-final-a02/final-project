'use client';

import { useGetChallengeVerification } from '@/hooks/challenge/useChallenge';
import { createClient } from '@/supabase/client';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import VerificationCardSkeleton from '../../../list/_components/VerificationCardSkeleton/VerificationCardSkeleton';

type VerificationDetailType = {
  challengeId: string;
  verificationId: string;
};

const VerificationDetail = ({ challengeId, verificationId }: VerificationDetailType) => {
  const supabase = createClient();
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

  //TODO 나중에 프로필 사진
  return (
    <div
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
        <div className="w-full aspect-video relative bg-gray-100">
          <Image className="object-cover" fill src={verification.data.imageURL!} alt={`${nickname}'s image`} />
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center py-1">챌린지 이미지</div>
        </div>
        <div className="text-xs font-bold p-4">
          <p className={`w-full whitespace-pre-line break-words`}>{verification.data.impression}</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationDetail;
