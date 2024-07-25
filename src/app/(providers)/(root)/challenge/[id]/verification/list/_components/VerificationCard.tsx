import { verificationsType } from '@/types/challenge';
import Image from 'next/image';

const VerificationCard = ({ verification }: { verification: verificationsType }) => {
  const nickname = verification.users.nickname ? verification.users.nickname : '헬린이';

  return (
    <div className=" p-4 flex flex-col gap-y-4 border border-gray-400 rounded-lg">
      <div className="flex gap-x-2 items-center">
        <div className="rounded-full bg-gray-200 size-8">{/* 프로필 사진*/}</div>
        <div className="text-sm font-bold">{nickname}</div>
      </div>
      <div className="size-full bg-white">
        <div className="w-full aspect-video  text-white border border-gray-500 flex items-center justify-center relative">
          <Image className="object-cover" fill src={verification.imageURL} alt={`${nickname}'s image`} />
        </div>
        <div className="text-xs font-bold p-2">
          <p className="w-full line-clamp-2 text-gray-500">{verification.impression}</p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCard;
