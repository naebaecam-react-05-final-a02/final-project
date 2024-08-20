'use client';

import { useTogglePostLike, useToggleQAPostLike } from '@/hooks/community/useCommunity';
import { CommunityPostData } from '@/types/community';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa6';

interface LikeButtonProps {
  post: CommunityPostData;
}

const LikeButton = ({ post }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { mutate: toggleLike, isPending: isToggleLikePending } = useTogglePostLike();
  const { mutate: toggleQAPostLike, isPending: isQALikeLoading } = useToggleQAPostLike();

  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked ?? false);
      setLikeCount(post.likes);
    }
  }, [post]);

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (post.category === 'Q&A 게시판') {
      if (!isQALikeLoading) {
        toggleQAPostLike({ postId: post.id.toString(), likeType: post.isLiked === true ? null : 'like' });

        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    } else {
      if (!isToggleLikePending) {
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));

        toggleLike(post.id, {
          onError: () => {
            setIsLiked((prev) => !prev);
            setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
          },
        });
      }
    }
  };

  return (
    <button onClick={handleLikeToggle} className="flex gap-[2px] text-xs text-whiteT-50 font-semibold items-center">
      <FaHeart className={`w-[14px] h-[14px] ${isLiked ? 'text-red-500 ' : ''}`} />
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
