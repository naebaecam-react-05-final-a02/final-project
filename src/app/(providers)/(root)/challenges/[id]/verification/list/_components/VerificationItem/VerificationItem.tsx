'use client';

import ThumbsUpIcon from '@/components/ThumbsUpIcon';
import api from '@/service/service';
import { verificationsType } from '@/types/challenge';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
// import { BiSolidLike } from "react-icons/bi";
// import { BiLike } from "react-icons/bi";

interface VerificationProps {
  verification: verificationsType;
}

const VerificationItem = ({
  verification: { challengeId, id, impression, users, imageURLs, likes_count, isLiked },
}: VerificationProps) => {
  const queryClient = useQueryClient();
  // console.log(challengeId);

  const { mutate: toggleLike } = useMutation({
    mutationFn: ({ verificationId: id, isLiked }: { verificationId: number; isLiked: boolean }) =>
      api.challenge.toggleLike({ verificationId: id, isLiked }),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['verifications'] });
      const prevVerifications = queryClient.getQueryData(['verifications', { cid: String(challengeId) }]);

      queryClient.setQueryData(
        ['verifications', { cid: String(challengeId) }],
        (oldData: { pages: verificationsType[][] | undefined; pageParams?: unknown[] | undefined }) => {
          const data = oldData?.pages?.map((page: verificationsType[]) => {
            return page.map((verification: verificationsType) => {
              if (verification.id === newData.verificationId) {
                return {
                  ...verification,
                  isLiked: !newData.isLiked,
                  likes_count: newData.isLiked ? verification.likes_count - 1 : verification.likes_count + 1,
                };
              }
              return verification;
            });
          });
          return {
            ...oldData,
            pages: data,
          };
        },
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
    },
  });

  return (
    <article className="rounded-3xl bg-white/5 border border-white/10 box-border p-2 flex flex-col gap-3 select-none cursor-pointer">
      <div className="w-full aspect-[8/7] bg-gray-500 rounded-2xl relative overflow-hidden">
        {imageURLs && (
          <Image src={imageURLs[0]!} alt={'챌린지 사진'} fill sizes="100" className="object-cover" priority />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike({ verificationId: id, isLiked });
          }}
        >
          <ThumbsUpIcon likesCount={likes_count} isLiked={isLiked} verificationId={id} />
        </button>
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
          <p className="text-white/70 text-[12px] line-clamp-1 max-w-[100px]">{users.nickname}</p>
        </div>
        <p className="text-[12px] text-white line-clamp-2">{impression}</p>
      </div>
    </article>
  );
};

export default VerificationItem;
