import ThumbsUp from '@/assets/thumbs-up.svg';
import { verificationsType } from '@/types/challenge';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
// import { BiSolidLike } from "react-icons/bi";
// import { BiLike } from "react-icons/bi";

interface VerificationProps {
  verification: verificationsType;
}

const VerificationItem = ({ verification: { challengeId, id, impression, users, imageURLs } }: VerificationProps) => {
  // useGetIsVerificationLikes();
  const { data: isVerificationLikes } = useQuery({
    queryKey: ['challenge', challengeId, 'verification', id],
    queryFn: () => axios.get(`/api/challenges/verification/likes?challengeId=${challengeId}`),
  });
  console.log(isVerificationLikes);
  return (
    <article className="rounded-3xl bg-white/5 border border-white/10 box-border p-2 flex flex-col gap-3 select-none">
      <div className="w-full aspect-[8/7] bg-gray-500 rounded-2xl relative overflow-hidden">
        {imageURLs && (
          <Image src={imageURLs[0]!} alt={'챌린지 사진'} fill sizes="100" className="object-cover" priority />
        )}
        <div className="flex gap-1 items-center absolute top-1 right-2">
          <ThumbsUp className="h-[18px] w-[18px]" />
          <p className="text-[12px]">999</p>
        </div>
      </div>
      <div>
        <div className="flex gap-1 items-center">
          <div className="w-[18px] h-[18px] bg-gray-500 border border-white rounded-full relative">
            {users.profileURL && (
              <Image
                src={users.profileURL}
                alt={'프로필 사진'}
                fill
                sizes="100"
                className="object-cover rounded-full"
              />
            )}
          </div>
          <p className="text-white/70 text-[12px]">{users.nickname}</p>
        </div>
        <p className="text-[12px] text-white">{impression}</p>
      </div>
    </article>
  );
};

export default VerificationItem;
