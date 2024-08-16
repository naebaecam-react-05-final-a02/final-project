'use client';

import Header from '@/components/Header';
import Loading from '@/components/Loading/Loading';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useGetUser } from '@/hooks/auth/useUsers';
import {
  useAcceptAnswer,
  useDeleteAnswer,
  useDeleteCommunityPost,
  useGetAcceptedAnswer,
  useGetAnswers,
  useGetCommunityPostDetail,
  useGetPostLikes,
  useTogglePostLike,
} from '@/hooks/community/useCommunity';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import FloatingWriteButton from '../../../_components/CommunityPostList/FloatingWriteButton';
import CommunityComment from './CommunityComment';
import DetailMenu from './DetailMenu';
import PostItem from './PostItem';
import QASection from './QASection';

interface CommunityPostDetailProps {
  postId: string;
}

const CommunityPostDetail = ({ postId }: CommunityPostDetailProps) => {
  const { data: post, isLoading, error } = useGetCommunityPostDetail(postId);
  const { data: user } = useGetUser();
  const { mutateAsync: deletePost } = useDeleteCommunityPost();
  const { mutate: togglePostLike, isPending: isLikeLoading } = useTogglePostLike();
  const { data: likeData, isPending: isLikeDataPending } = useGetPostLikes(postId);
  const { data: answers, isLoading: isAnswersLoading } = useGetAnswers(postId);
  const { mutate: acceptAnswer } = useAcceptAnswer();
  const { data: acceptedAnswer, isLoading: isAcceptedAnswerLoading } = useGetAcceptedAnswer(postId);
  const { mutateAsync: deleteAnswer } = useDeleteAnswer();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ref: buttonVisibilityRef, inView: buttonVisibilityInView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 200px 0px',
  });

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
  const handleClickBack = () => {
    router.push('/community');
  };

  const handleLikeToggle = () => {
    if (!isLikeLoading) {
      togglePostLike(postId);
    }
  };

  const handleAcceptAnswer = (answerId: string) => {
    acceptAnswer({ questionId: postId, answerId });
  };
  const handleDeleteAnswer = async (answerId: string) => {
    const yes = await modal.confirm(['정말로 이 답변을 삭제하시겠습니까?']);
    if (yes) {
      try {
        await deleteAnswer({ answerId, questionId: postId });
      } catch (error) {
        console.error('Error deleting answer:', error);
        modal.alert(['답변 삭제 중 오류가 발생했습니다.']);
      }
    }
  };

  const handleEditAnswer = (answerId: string) => {
    router.push(`/community/${postId}/answer/${answerId}/edit`);
  };

  const handleMenuOpenChange = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div className="relative min-h-screen overflow-hidden max-w-[900px] flex flex-col mx-auto text-white">
      <div className="fixed inset-0 bg-[#0E0C15] -z-30 overflow-hidden">
        <div className="w-[140px] h-[300px] absolute top-[70px] left-[48px] blur-[90px] rounded-full bg-[#52467B]"></div>
        <div className="w-[340px] h-[105px] absolute bottom-[110px] right-[-24px] blur-[90px] bg-white/40 rounded-full"></div>
      </div>

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
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={() => setIsMenuOpen(false)} />}

      {post.category === 'Q&A 게시판' ? (
        <>
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
          <QASection
            answers={answers?.answers}
            userId={user?.id || ''}
            postId={postId}
            acceptedAnswer={acceptedAnswer}
            isAuthor={isAuthor}
            onAcceptAnswer={handleAcceptAnswer}
            isAcceptedAnswerLoading={isAcceptedAnswerLoading}
            onEditAnswer={handleEditAnswer}
            onDeleteAnswer={handleDeleteAnswer}
          />
          {!isAuthor && !answers?.hasUserAnswered && (
            <div className="fixed px-4 bottom-20 right-6 md:right-10 left-6 max-w-max ml-auto z-10">
              <div className="relative w-full flex justify-end">
                <Link href={`/community/${post.id}/answer`} className="group">
                  <FloatingWriteButton buttonType="answer" inView={buttonVisibilityInView} />
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
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
        </>
      )}
      {post.category === 'Q&A 게시판' && <div ref={buttonVisibilityRef} className="h-0 relative -z-10" />}
    </div>
  );
};

export default CommunityPostDetail;
