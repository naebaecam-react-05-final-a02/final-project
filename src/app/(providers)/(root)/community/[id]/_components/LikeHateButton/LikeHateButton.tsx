'use client';

import { useTogglePostLike, useToggleQAAnswerLike, useToggleQAPostLike } from '@/hooks/community/useCommunity';
import { Answer, CommunityPostData } from '@/types/community';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa6';
import BigThumbUp from '../CommunityPostDetail/PostItem/BigThumbUp/BigThumbUp';

interface LikeHateButtonProps {
  item: CommunityPostData | Answer;
  postId?: string;
}

const LikeHateButton = ({ item, postId }: LikeHateButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const { mutate: togglePostLike, isPending: isPostLikePending } = useTogglePostLike();
  const { mutate: toggleQAPostLike, isPending: isQAPostLikePending } = useToggleQAPostLike();
  const { mutate: toggleQAAnswerLike, isPending: isQAAnswerLikePending } = useToggleQAAnswerLike();

  useEffect(() => {
    setIsLiked(item.isLiked ?? null);
    setScore(item.score || 0);
  }, [item]);

  const handleLike = () => {
    const newIsLiked = isLiked !== true ? true : null;
    setIsLiked(newIsLiked);
    setScore((prev) => (newIsLiked ? prev + 1 : prev - 1));

    const onError = () => {
      setIsLiked(isLiked);
      setScore((prev) => (newIsLiked ? prev - 1 : prev + 1));
    };

    if ('category' in item) {
      if (item.category === 'Q&A 게시판') {
        toggleQAPostLike({ postId: item.id.toString(), likeType: newIsLiked ? 'like' : null }, { onError });
      } else {
        togglePostLike(item.id, { onError });
      }
    } else {
      toggleQAAnswerLike({ id: item.id, postId: postId!, likeType: newIsLiked ? 'like' : null }, { onError });
    }
  };

  const handleDislike = () => {
    if (!('category' in item) || item.category === 'Q&A 게시판') {
      const newIsDisliked = isLiked === false ? null : false;
      setIsLiked(newIsDisliked);
      setScore((prev) => (newIsDisliked === false ? prev - 1 : prev + 1));

      const onError = () => {
        setIsLiked(isLiked);
        setScore((prev) => (newIsDisliked === false ? prev + 1 : prev - 1));
      };

      if ('category' in item) {
        toggleQAPostLike(
          { postId: item.id.toString(), likeType: newIsDisliked === false ? 'dislike' : null },
          { onError },
        );
      } else {
        toggleQAAnswerLike(
          { id: item.id, postId: postId!, likeType: newIsDisliked === false ? 'dislike' : null },
          { onError },
        );
      }
    }
  };

  const isPending =
    'category' in item
      ? item.category === 'Q&A 게시판'
        ? isQAPostLikePending
        : isPostLikePending
      : isQAAnswerLikePending;

  if ('category' in item && item.category !== 'Q&A 게시판') {
    return (
      <button onClick={handleLike} disabled={isPending} className="flex items-center gap-2 text-whiteT-50">
        <FaHeart className={`w-[14px] h-[14px] ${isLiked ? 'text-red-500' : ''}`} />
        <span>{score}</span>
      </button>
    );
  }

  return (
    <>
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
    </>
  );
};

export default LikeHateButton;
