import ThumbsUp from '@/assets/thumbs-up.svg';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Link from 'next/link';

type Verification = Tables<'challengeVerify'> & { users: Tables<'users'> };

interface VerificationProps {
  verification: Verification;
}

const VerificationItem = ({ verification: { challengeId, id, imageURL, impression, users } }: VerificationProps) => {
  return (
    <Link href={`/challenges/${challengeId}/verification/${id}`}>
      <article className="rounded-3xl bg-white/5 border border-white/10 box-border p-2 flex flex-col gap-3">
        <div className="w-full aspect-[8/7] bg-gray-500 rounded-2xl relative overflow-hidden">
          {imageURL && <Image src={imageURL} alt={'챌린지 사진'} fill style={{ objectFit: 'cover' }} />}
          <div className="flex gap-1 items-center absolute top-1 right-2">
            <ThumbsUp className="h-[18px] w-[18px]" />
            <p className="text-[12px]">999</p>
          </div>
        </div>
        <div>
          <div className="flex gap-1 items-center">
            <div className="w-[18px] h-[18px] bg-gray-500 border border-white rounded-full">
              {users.profileURL && <Image src={users.profileURL} alt={'프로필 사진'} />}
            </div>
            <p className="text-white/70 text-[12px]">{users.nickname}</p>
          </div>
          <p className="text-[12px] text-white">{impression}</p>
        </div>
      </article>
    </Link>
  );
};

export default VerificationItem;
