'use client';

import Card from '@/components/Card';
import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import Loading from '@/components/Loading/Loading';
import { useTogglePostLike } from '@/hooks/community/useCommunity';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { FaEye, FaHeart } from 'react-icons/fa6';
import { htmlToPlainText } from '../../../community/_utils/htmlToPlainText';
import { MyActivityPostTypes } from '../../_types/types';

interface MyActivityListItemProps {
  post: MyActivityPostTypes;
}

const MyActivityListItem = ({ post }: MyActivityListItemProps) => {
  // console.log(post);
  const plainTextContent = htmlToPlainText(post.content);
  const imgMatch = post.content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (post) {
      setIsLiked(post.isLiked ?? false);
      setLikeCount(post.likes);
    }
  }, [post]);

  const firstImageUrl = imgMatch ? imgMatch[1] : null;

  // const { data: likeData, isPending: isLikeDataPending } = useGetPostLikes(post.id);
  const { mutate: toggleLike, isPending: isToggleLikePending } = useTogglePostLike();

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
  };

  if (isToggleLikePending) return <Loading />;

  return (
    <Card className="px-4 rounded-[20px] border-2 border-whiteT-10 bg-black/5 shadow-[-4px_-4px_8px_0px_rgba(255,255,255,0.05),_4px_4px_8px_0px_rgba(0,0,0,0.40)] backdrop-blur-[8px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className="relative w-[18px] h-[18px]">
            <Image
              src={post.user.profileURL ?? '/user/default-avatar.png'}
              alt={`${post.user.nickname}의 프로필 이미지`}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <span className="text-whiteT-70 text-sm font-medium leading-tight pl-1">{post.user.nickname}</span>
        </div>
        {post.createdAt && (
          <time className="text-whiteT-50 text-xs font-normal leading-[18px]">
            {dayjs(post.createdAt).format('YYYY. MM. DD')}
          </time>
        )}
      </div>
      <div className="flex justify-between w-full gap-2">
        <div className="flex flex-col">
          <h2 className="text-15 font-semibold text-white leading-[21px] mb-1">{post.title}</h2>
          <p className="text-whiteT-70 text-sm font-normal text-ellipsis overflow-hidden line-clamp-2 leading-tight">
            {plainTextContent}
          </p>
        </div>
        <div className="ml-4 relative flex-shrink-0 w-16 h-16 rounded-lg">
          <Image src={firstImageUrl ?? '/OOSIE.png'} alt="게시글 이미지" fill className="object-contain" />
        </div>
      </div>
      <hr className="w-full h-px bg-white/30 border-0" />
      <div className="w-full flex justify-between">
        <div className="flex gap-2">
          <button
            onClick={handleLikeToggle}
            disabled={isToggleLikePending}
            className="flex gap-[2px] text-[12px] text-whiteT-50 font-semibold items-center"
          >
            <FaHeart className={`w-[14px] h-[14px] ${isLiked ? 'text-red-500 ' : ''}`} />
            <span>{likeCount}</span>
          </button>
          <div className="flex gap-[2px] text-[12px] text-whiteT-50 font-semibold items-center">
            <FaCommentAlt className="w-[14px] h-[14px]" />
            <span>{post.commentCount}</span>
          </div>
          <div className="flex gap-[2px] text-[12px] text-whiteT-50 font-semibold items-center">
            <FaEye className="w-[14px] h-[14px]" />
            <span>{post.views}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag, index) => (
            <ExerciseChip key={index} label={tag} isSelected={true} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MyActivityListItem;
