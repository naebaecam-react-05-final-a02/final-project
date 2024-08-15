'use client';

import Header from '@/components/Header';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useGetUser } from '@/hooks/auth/useUsers';
import {
  useDeleteCommunityPost,
  useGetCommunityPostDetail,
  useGetPostLikes,
  useTogglePostLike,
} from '@/hooks/community/useCommunity';
import Mobile from '@/layouts/Mobile';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import CommunityComment from './CommunityComment';
import DetailMenu from './DetailMenu';
import PostItem from './PostItem';

interface CommunityPostDetailProps {
  postId: string;
}

const CommunityPostDetail = ({ postId }: CommunityPostDetailProps) => {
  const { data: post, isLoading, error } = useGetCommunityPostDetail(postId);
  const { data: user } = useGetUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutateAsync: deletePost } = useDeleteCommunityPost();
  const { mutate: togglePostLike, isPending: isLikeLoading } = useTogglePostLike();
  const { data: likeData, isPending: isLikeDataPending } = useGetPostLikes(postId);

  console.log(post?.isLiked);

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
  console.log(post.commentCount);
  const handleClickBack = () => {
    router.push('/community');
  };

  const handleLikeToggle = () => {
    if (!isLikeLoading) {
      togglePostLike(postId);
    }
  };
  return (
    <Mobile
      headerLayout={
        <Header
          title={`${post.category}`}
          customBackAction={handleClickBack}
          icon={
            isAuthor && (
              <DetailMenu
                onEdit={handleEdit}
                onDelete={handleDelete}
                onOpenChange={setIsMenuOpen}
                iconClassName="w-6 h-6"
              />
            )
          }
        />
      }
    >
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMenuOpen(false)} />}
      <PostItem
        post={post}
        onLikeToggle={handleLikeToggle}
        isLikeLoading={isLikeLoading}
        isLikeDataPending={isLikeDataPending}
      />
      <div
        className="h-[1px] bg-whiteT-20  mx-4"
        style={{
          boxShadow: '0px 1px 2px 0px rgba(255, 255, 255, 0.10), 0px -2px 4px 0px rgba(0, 0, 0, 0.70)',
        }}
      />
      <CommunityComment postId={post.id} postUserId={post.user.id} />
    </Mobile>
  );
};

export default CommunityPostDetail;
