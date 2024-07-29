import { verificationsType } from '@/types/challenge';
import { format } from 'date-fns';
import Image from 'next/image';

type VerificationCardType = {
  verification: verificationsType;
  type?: string;
};

const VerificationCard = ({ verification, type = 'list' }: VerificationCardType) => {
  const userNumber = verification.userId.split('-')[1];
  const nickname = verification.users.nickname ? verification.users.nickname : `헬린이_${userNumber}`;

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
          <div className="text-xs text-gray-600">{format(verification?.date!, 'yyyy-MM-dd')}</div>
          <div className="text-xs text-gray-500">{format(verification?.date!, 'hh:mm:ss a')}</div>
        </div>
      </div>
      <div className="w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <div className="w-full aspect-video relative bg-gray-100">
          <Image className="object-cover" fill src={verification?.imageURL!} alt={`${nickname}'s image`} />
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-center py-1">챌린지 이미지</div>
        </div>
        <div className="text-xs font-bold p-4">
          <p className={`w-full whitespace-pre-line break-words ${type === 'list' ? 'line-clamp-1' : ''}`}>
            {verification?.impression}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;
