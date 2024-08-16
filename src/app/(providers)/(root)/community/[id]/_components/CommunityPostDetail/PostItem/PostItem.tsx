'use client';

import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import { useToggleQAPostLike } from '@/hooks/community/useCommunity';
import { CommunityPostData } from '@/types/community';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FaCommentAlt, FaEye, FaHeart } from 'react-icons/fa';
import BigThumbUp from './BigThumbUp/BigThumbUp';
import VoteSection from './VoteSection';

interface PostItemProps {
  post: CommunityPostData;
  onLikeToggle: () => void;
  isLikeLoading: boolean;
  isLikeDataPending: boolean;
}
const PostItem = ({ post, onLikeToggle, isLikeLoading, isLikeDataPending }: PostItemProps) => {
  const { mutate: toggleQAPostLike, isPending: isQALikeLoading } = useToggleQAPostLike();

  const handleLike = () => {
    toggleQAPostLike({ postId: post.id.toString(), likeType: post.isLiked === true ? null : 'like' });
  };

  const handleDislike = () => {
    toggleQAPostLike({ postId: post.id.toString(), likeType: post.isLiked === false ? null : 'dislike' });
  };

  return (
    <article className="px-4 pt-6">
      <header className="flex w-full items-center justify-between mb-4">
        <div className="flex items-center">
          <figure className="relative w-[36px] h-[36px]">
            <Image
              src={post.user.profileURL ?? '/user/default-avatar.png'}
              alt={`${post.user.nickname}의 프로필 이미지`}
              fill
              className="object-cover rounded-full"
            />
          </figure>
          <figcaption className="flex flex-col pl-2 gap-1">
            <span className="text-whiteT-70 text-lg font-medium leading-tight">{post.user.nickname}</span>
            <div className="flex gap-2 text-whiteT-50 text-sm font-normal items-center">
              {post.createdAt && <time className="leading-[18px]">{dayjs(post.createdAt).format('YYYY. MM. DD')}</time>}
              <div className="w-px h-2 bg-whiteT-10" aria-hidden="true" />
              <div className="flex gap-1">
                <span>조회수</span>
                <span>{post.views}</span>
              </div>
            </div>
          </figcaption>
        </div>
      </header>

      <h1 className="rounded-[0px_16px_16px_16px] border-2 border-whiteT-10 my-page-intro-bg to-white/6 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.40)] px-4 py-2 text-whiteT-70 text-[16px] font-semibold mb-6">
        {post.title}
      </h1>
      <div className="border header-gradient bg-whiteT-3 backdrop-blur-md rounded-lg p-4 pb-6">
        {post.category === '투표' && <VoteSection postId={post.id} />}
        <div
          className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white font-normal leading-tight"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="flex flex-wrap gap-2 mt-10">
          {post.tags.map((tag, index) => (
            <ExerciseChip key={index} label={tag} isSelected={true} />
          ))}
        </div>
      </div>
      {post.category === 'Q&A 게시판' && (
        <div className="flex items-center justify-between gap-7 mt-8 w-[166px] mx-auto">
          <button
            onClick={handleLike}
            disabled={isQALikeLoading}
            className="rounded-full border border-whiteT-20 bg-whiteT-10 backdrop-blur-sm p-2 pb-2.5"
          >
            <BigThumbUp className={post.isLiked === true ? 'text-primary-100' : 'text-transparent'} />
          </button>
          {post.score}
          <button
            onClick={handleDislike}
            disabled={isQALikeLoading}
            className="rounded-full border border-whiteT-20 bg-whiteT-10 backdrop-blur-sm p-2 pb-2.5"
          >
            <BigThumbUp
              className={post.isLiked === false ? 'text-red-500 scale-y-[-1]' : 'text-transparent scale-y-[-1]'}
            />
          </button>
        </div>
      )}
      <div className="flex justify-between items-center mt-8 px-2 py-4">
        <div className="flex gap-4">
          {post.category === 'Q&A 게시판' ? (
            <>
              <div className="flex items-center gap-2 text-whiteT-50">
                <FaCommentAlt className="w-[14px] h-[14px]" />
                <span>{post.responseCount}</span>
              </div>
              <div className="flex items-center gap-2 text-whiteT-50">
                <FaEye className="w-[14px] h-[14px]" />
                <span>{post.views}</span>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={onLikeToggle}
                disabled={isLikeLoading || isLikeDataPending}
                className="flex items-center gap-2 text-whiteT-50"
              >
                <FaHeart className={`w-[14px] h-[14px] ${post.isLiked ? 'text-red-500' : ''}`} />
                <span>{post.likes}</span>
              </button>
              <div className="flex items-center gap-2 text-whiteT-50">
                <FaCommentAlt className="w-[14px] h-[14px]" />
                <span>{post.responseCount}</span>
              </div>
              <div className="flex items-center gap-2 text-whiteT-50">
                <FaEye className="w-[14px] h-[14px]" />
                <span>{post.views}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default PostItem;
