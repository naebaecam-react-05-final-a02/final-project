import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import { CommunityPostData } from '@/types/community';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FaCommentAlt, FaEye } from 'react-icons/fa';
import LikeButton from '../../../../_components/LikeButton';
import LikeHateButton from '../../LikeHateButton';
import VoteSection from './VoteSection';

interface PostItemProps {
  post: CommunityPostData;
}
const PostItem = ({ post }: PostItemProps) => {
  return (
    <article className="px-4 pt-6">
      <header className="flex w-full items-center justify-between mb-4">
        <div className="flex items-center">
          <figure className="relative w-9 h-9">
            <Image
              src={post.user.profileURL ?? '/user/default-avatar.png'}
              alt={`${post.user.nickname}의 프로필 이미지`}
              fill
              className="object-cover rounded-full"
            />
          </figure>
          <figcaption className="flex flex-col pl-2 gap-1">
            <div className="flex items-center">
              <span className="text-whiteT-70 text-lg font-medium leading-tight  ">{post.user.nickname}</span>
              <span className="ml-1 text-sm text-primary-100">Lv. {post.user.level}</span>
            </div>
            <div className="flex gap-2 text-whiteT-50 text-sm font-normal items-center">
              {post.createdAt && <time>{dayjs(post.createdAt).format('YYYY. MM. DD')}</time>}
              <div className="w-px h-2 bg-whiteT-10" aria-hidden="true" />
              <div className="flex gap-1">
                <span>조회수</span>
                <span>{post.views}</span>
              </div>
            </div>
          </figcaption>
        </div>
      </header>

      <h1 className="rounded-[0px_16px_16px_16px] border-2 border-whiteT-10 my-page-intro-bg to-white/6 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.40)] px-4 py-2 text-whiteT-70 text-base font-semibold mb-6">
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
          <LikeHateButton item={post} />
        </div>
      )}
      <div className="flex justify-between items-center mt-8 px-2 py-4">
        <div className="flex gap-4">
          {post.category === 'Q&A 게시판' ? (
            <>
              <div className="flex items-center gap-0.5 text-whiteT-50">
                <FaCommentAlt className="w-3.5 h-3.5" />
                <span>{post.responseCount}</span>
              </div>
              <div className="flex items-center gap-0.5 text-whiteT-50">
                <FaEye className="w-3.5 h-3.5" />
                <span>{post.views}</span>
              </div>
            </>
          ) : (
            <>
              <LikeButton post={post} />
              <div className="flex items-center gap-0.5 text-xs text-whiteT-50">
                <FaCommentAlt className="w-3.5 h-3.5" />
                <span>{post.responseCount}</span>
              </div>
              <div className="flex items-center gap-0.5 text-xs text-whiteT-50">
                <FaEye className="w-3.5 h-3.5" />
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
