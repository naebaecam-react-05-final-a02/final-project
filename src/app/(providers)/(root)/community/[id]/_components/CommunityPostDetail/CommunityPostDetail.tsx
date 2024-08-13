'use client';

import ExerciseChip from '@/components/ExerciesChip/ExerciesChip';
import Header from '@/components/Header';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useDeleteCommunityPost, useGetCommunityPostDetail } from '@/hooks/community/useCommunity';
import Mobile from '@/layouts/Mobile';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { FaBookmark, FaEye, FaHeart } from 'react-icons/fa6';
import DetailMenu from './DetailMenu';

interface CommunityPostDetailProps {
  postId: string;
}

const CommunityPostDetail = ({ postId }: CommunityPostDetailProps) => {
  const { data: post, isLoading, error } = useGetCommunityPostDetail(postId);
  const { data: user } = useGetUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutateAsync: deletePost } = useDeleteCommunityPost();
  const router = useRouter();
  const modal = useModal();
  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10 text-red-500">게시글을 불러오는데 실패했습니다.</div>;
  if (!post) return <div className="text-center py-10">게시글을 찾을 수 없습니다.</div>;

  const isAuthor = post.user.id === user?.id;

  const handleEdit = () => {
    router.push(`/community/${postId}/edit`);
  };

  const handleDelete = async () => {
    const yes = await modal.confirm(['정말로 이 게시글을 삭제하시겠습니까?']);
    if (yes) {
      try {
        await deletePost(postId);
        router.push('/community');
      } catch (error) {
        console.error('Error deleting post:', error);
        modal.alert(['게시글 삭제 중 오류가 발생했습니다.']);
      }
    }
  };

  return (
    <Mobile
      headerLayout={
        <Header
          title={`${post.category}`}
          icon={isAuthor && <DetailMenu onEdit={handleEdit} onDelete={handleDelete} onOpenChange={setIsMenuOpen} />}
        />
      }
    >
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMenuOpen(false)} />}
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
                {post.createdAt && (
                  <time className="leading-[18px]">{dayjs(post.createdAt).format('YYYY. MM. DD')}</time>
                )}
                <div className="w-px h-2 bg-whiteT-10" aria-hidden="true" />
                <div className="flex gap-1">
                  <span>조회수</span>
                  <span>{999}</span>
                </div>
              </div>
            </figcaption>
          </div>
          <FaBookmark className="text-whiteT-30 m-2" />
        </header>

        <h1 className="rounded-[0px_16px_16px_16px] border-2 border-whiteT-10 my-page-intro-bg to-white/6 shadow-[4px_4px_8px_0px_rgba(0,0,0,0.40)] px-4 py-2 text-whiteT-70 text-[16px] font-semibold mb-6">
          {post.title}
        </h1>
        <div className="border header-gradient bg-whiteT-3 backdrop-blur-md rounded-lg p-4 pb-6">
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

        <div className="flex justify-between items-center mt-8 px-2 py-4">
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
      </article>
    </Mobile>
  );
};

export default CommunityPostDetail;
