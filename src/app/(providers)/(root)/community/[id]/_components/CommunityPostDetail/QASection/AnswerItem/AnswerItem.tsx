'use client';

import Button from '@/components/Button';
import { useToggleQAAnswerLike } from '@/hooks/community/useCommunity';
import { Answer } from '@/types/community';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa6';
import DetailMenu from '../../DetailMenu';
import BigThumbUp from '../../PostItem/BigThumbUp/BigThumbUp';

interface AnswerItemProps {
  answer: Answer;
  userId: string;
  postId: string;
  isAuthor: boolean;
  acceptedAnswer: Answer | null;
  onAcceptAnswer: (answerId: string, answerUserId: string) => void;
  isAcceptedAnswerLoading: boolean;
  onEditAnswer: (answerId: string) => void;
  onDeleteAnswer: (answerId: string) => void;
}

const AnswerItem = ({
  answer,
  userId,
  postId,
  isAuthor,
  acceptedAnswer,
  onAcceptAnswer,
  isAcceptedAnswerLoading,
  onEditAnswer,
  onDeleteAnswer,
}: AnswerItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutate: toggleQAAnswerLike, isPending } = useToggleQAAnswerLike();

  const handleLike = () => {
    toggleQAAnswerLike({ id: answer.id, postId, likeType: answer.isLiked === true ? null : 'like' });
  };

  const handleDislike = () => {
    toggleQAAnswerLike({ id: answer.id, postId, likeType: answer.isLiked === false ? null : 'dislike' });
  };

  return (
    <div className={`bg-whiteT-3  border-gradient-noti rounded-lg p-4 pb-6  ${isMenuOpen ? '' : 'backdrop-blur'}`}>
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)} />}
      <div className="flex w-full items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          <figure className="relative w-[18px] h-[18px]">
            <Image
              src={answer.user.profileURL ?? '/user/default-avatar.png'}
              alt={`${answer.user.nickname}의 프로필 이미지`}
              fill
              className="object-cover rounded-full"
            />
          </figure>
          <div className="flex items-center">
            <span className="text-whiteT-70 text-sm font-semibold">{answer.user.nickname}</span>
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
            {answer.user.id === userId && !acceptedAnswer && (
              <DetailMenu
                onEdit={() => onEditAnswer(answer.id)}
                onDelete={() => onDeleteAnswer(answer.id)}
                onOpenChange={setIsMenuOpen}
                iconClassName="text-whiteT-70 w-[18px] h-[18px]"
              />
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
          <BigThumbUp className={answer.isLiked === true ? 'text-primary-100' : 'text-transparent'} />
        </button>
        {answer.score || 0}
        <button
          onClick={handleDislike}
          aria-label="hate-button"
          disabled={isPending}
          className="rounded-full border border-whiteT-20 bg-whiteT-10 backdrop-blur-sm p-2 pb-2.5"
        >
          <BigThumbUp
            className={answer.isLiked === false ? 'text-red-500 scale-y-[-1]' : 'text-transparent scale-y-[-1]'}
          />
        </button>
      </div>
      {isAuthor && !acceptedAnswer && (
        <Button
          onClick={() => onAcceptAnswer(answer.id, answer.userId)}
          disabled={isAcceptedAnswerLoading}
          className="mt-4"
        >
          <span className="flex text-center items-center">
            채택하기 <FaChevronRight className="ml-1" />
          </span>
        </Button>
      )}
    </div>
  );
};

export default AnswerItem;
