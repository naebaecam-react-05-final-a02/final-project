'use client';

import { useToggleQAAnswerLike } from '@/hooks/community/useCommunity';
import { Answer } from '@/types/community';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import BigThumbUp from '../../PostItem/BigThumbUp/BigThumbUp';

interface AnswerItemProps {
  answer: Answer;
  postId: string;
}

const AcceptedAnswerItem = ({ answer, postId }: AnswerItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const { mutate: toggleQAAnswerLike, isPending } = useToggleQAAnswerLike();

  useEffect(() => {
    setIsLiked(answer.isLiked ?? null);
    setScore(answer.score || 0);
  }, [answer]);

  const handleLike = () => {
    const newIsLiked = isLiked !== true ? true : null;
    setIsLiked(newIsLiked);

    setScore((prev) => {
      if (isLiked === null && newIsLiked === true) return prev + 1;
      if (isLiked === true && newIsLiked === null) return prev - 1;
      if (isLiked === false && newIsLiked === true) return prev + 2;
      return prev;
    });

    toggleQAAnswerLike({ id: answer.id, postId, likeType: newIsLiked ? 'like' : null });
  };

  const handleDislike = () => {
    const newIsDisliked = isLiked === false ? null : false;
    setIsLiked(newIsDisliked);

    setScore((prev) => {
      if (isLiked === null && newIsDisliked === false) return prev - 1;
      if (isLiked === false && newIsDisliked === null) return prev + 1;
      if (isLiked === true && newIsDisliked === false) return prev - 2;
      return prev;
    });

    toggleQAAnswerLike({ id: answer.id, postId, likeType: newIsDisliked === false ? 'dislike' : null });
  };

  return (
    <div className={`bg-whiteT-3  border-gradient-noti rounded-lg p-4 pb-6  ${isMenuOpen ? '' : 'backdrop-blur'}`}>
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)} />}
      <div className="flex w-full items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <figure className="relative w-[18px] h-[18px]">
            <Image
              src={answer.user?.profileURL ?? '/user/default-avatar.png'}
              alt={`${answer.user?.nickname}의 프로필 이미지`}
              fill
              className="object-cover rounded-full"
            />
          </figure>
          <div className="flex items-center">
            <span className="text-whiteT-70 text-sm font-semibold">{answer.user?.nickname}</span>
            <span className="ml-2 text-[12px] text-primary-100">Lv. {answer.user.level}</span>
          </div>
        </div>
        <figcaption className="flex pl-2 gap-1">
          <div className="flex gap-[2px] text-whiteT-70 items-center">
            {answer.createdAt && (
              <time className="!text-whiteT-50 text-xs leading-[18px] font-normal">
                {dayjs(answer.createdAt).format('YYYY. MM. DD')}
              </time>
            )}
          </div>
        </figcaption>
      </div>
      <div dangerouslySetInnerHTML={{ __html: answer.content }} className="mb-4" />
      <div className="flex items-center justify-between gap-7 mt-10 mb-2 w-[166px] mx-auto">
        <button
          onClick={handleLike}
          aria-label="like-button"
          disabled={isPending}
          className="rounded-full border border-whiteT-20 bg-whiteT-10 backdrop-blur-sm p-2 pb-2.5"
        >
          <BigThumbUp className={isLiked === true ? 'text-primary-100' : 'text-transparent'} />
        </button>
        {score}
        <button
          onClick={handleDislike}
          aria-label="hate-button"
          disabled={isPending}
          className="rounded-full border border-whiteT-20 bg-whiteT-10 backdrop-blur-sm p-2 pb-2.5"
        >
          <BigThumbUp className={isLiked === false ? 'text-red-500 scale-y-[-1]' : 'text-transparent scale-y-[-1]'} />
        </button>
      </div>
    </div>
  );
};

export default AcceptedAnswerItem;
