'use client';

import Card from '@/components/Card';
import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import Loading from '@/components/Loading/Loading';
import { useGetCommunityPostDetail } from '@/hooks/community/useCommunity';
import Mobile from '@/layouts/Mobile';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FaCommentAlt } from 'react-icons/fa';
import { FaEye, FaHeart } from 'react-icons/fa6';
interface CommunityPostDetailProps {
  postId: string;
}

const CommunityPostDetail = ({ postId }: CommunityPostDetailProps) => {
  const { data: post, isLoading, error } = useGetCommunityPostDetail(postId);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">게시글을 불러오는데 실패했습니다.</div>;
  if (!post) return <div className="text-center py-10">게시글을 찾을 수 없습니다.</div>;

  return (
    <Mobile>
      {' '}
      <Card className="p-4">
        <div className="flex w-full items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative w-[36px] h-[36px]">
              <Image
                src={post.user.profileURL ?? '/user/default-avatar.png'}
                alt={`${post.user.nickname}의 프로필 이미지`}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <span className="text-whiteT-70 text-lg font-medium leading-tight pl-2">{post.user.nickname}</span>
          </div>
          {post.createdAt && (
            <time className="text-whiteT-50 text-sm font-normal leading-[18px]">
              {dayjs(post.createdAt).format('YYYY. MM. DD HH:mm')}
            </time>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white leading-tight mb-4">{post.title}</h1>

        <div className="text-whiteT-70 text-base mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <ExerciseChip key={index} label={tag} isSelected={true} />
          ))}
        </div>

        <hr className="w-full h-px bg-white/30 border-0 my-4" />

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-whiteT-50">
              <FaHeart />
              <span>{999}</span>
            </div>
            <div className="flex items-center gap-2 text-whiteT-50">
              <FaCommentAlt />
              <span>{999}</span>
            </div>
            <div className="flex items-center gap-2 text-whiteT-50">
              <FaEye />
              <span>{999}</span>
            </div>
          </div>
        </div>
      </Card>
    </Mobile>
  );
};

export default CommunityPostDetail;
