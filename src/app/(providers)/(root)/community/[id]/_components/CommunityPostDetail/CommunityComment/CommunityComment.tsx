'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { useGetUser } from '@/hooks/auth/useUsers';
import {
  useAddComment,
  useDeleteComment,
  useGetComments,
  useToggleCommentLike,
  useUpdateComment,
} from '@/hooks/community/useCommunity';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { FaChevronRight, FaHeart } from 'react-icons/fa6';
import DetailMenu from '../DetailMenu';

interface CommunityCommentProps {
  postId: string;
}

const CommunityComment = ({ postId }: CommunityCommentProps) => {
  const [newComment, setNewComment] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');

  const { data: user } = useGetUser();
  const { data: comments } = useGetComments(postId);
  const { mutate: addComment } = useAddComment();
  const { mutate: updateComment } = useUpdateComment();
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { mutate: toggleLike, isPending: isLikeLoading } = useToggleCommentLike();

  const modal = useModal();

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment({ postId, content: newComment });
      setNewComment('');
    }
  };

  const handleEdit = (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };

  const handleUpdateComment = async (commentId: string) => {
    const yes = await modal.confirm(['댓글을 수정하시겠습니까?']);
    if (yes) {
      updateComment({ postId, data: { id: commentId, content: editedContent } });
      setEditingCommentId(null);
    }
  };

  const handleDelete = async (commentId: string) => {
    const yes = await modal.confirm(['정말로 댓글을 삭제하시겠습니까?']);
    if (yes) {
      try {
        await deleteComment({ postId, commentId });
      } catch (error) {
        console.error('Error deleting comment:', error);
        modal.alert(['댓글 삭제 중 오류가 발생했습니다.']);
      }
    }
  };

  const handleToggleLike = (commentId: string) => {
    if (!isLikeLoading) {
      toggleLike({ postId, commentId });
    }
  };

  return (
    <div className="px-4 mt-6 mb-[28px]">
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)} />}
      <div className="flex gap-2 w-full relative mb-6">
        <figure className="relative w-[36px] h-[36px]">
          <Image
            src={user?.profileURL ?? '/user/default-avatar.png'}
            alt={`${user?.nickname}의 프로필 이미지`}
            fill
            className="object-cover rounded-full"
          />
        </figure>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full bg-transparent rounded-lg bg-input-gradient pl-3 py-[10px] pr-[76px] border-2 border-whiteT-10 justify-start items-center gap-2 focus:outline-none text-[14px]"
          placeholder="댓글을 입력해주세요."
        />
        <button
          onClick={handleAddComment}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-70 font-semibold text-[12px] flex items-center"
        >
          등록하기
          <FaChevronRight className="ml-1 flex justify-center items-center" />
        </button>
      </div>

      <div className="flex flex-col  gap-2">
        {comments?.map(
          (comment) => (
            console.log(comment),
            (
              <div key={comment.id} className="bg-whiteT-3 rounded-lg p-4 ">
                <div className="flex w-full items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <figure className="relative w-[18px] h-[18px]">
                      <Image
                        src={comment.user.profileURL ?? '/user/default-avatar.png'}
                        alt={`${comment.user.nickname}의 프로필 이미지`}
                        fill
                        className="object-cover rounded-full"
                      />
                    </figure>
                    <span className="text-whiteT-70 text-sm font-semibold ">{comment.user.nickname}</span>
                  </div>
                  <figcaption className="flex pl-2 gap-1">
                    <div className="flex gap-[2px] text-whiteT-70 items-center">
                      {comment.createdAt && (
                        <time className="!text-whiteT-50 text-xs leading-[18px] font-normal">
                          {dayjs(comment.createdAt).format('YYYY. MM. DD')}
                        </time>
                      )}
                      {comment.userId === user?.id && (
                        <DetailMenu
                          onEdit={() => handleEdit(comment.id, comment.content)}
                          onDelete={() => handleDelete(comment.id)}
                          onOpenChange={setIsMenuOpen}
                          iconClassName="text-whiteT-70 w-[18px] h-[18px]"
                        />
                      )}
                    </div>
                  </figcaption>
                </div>
                {editingCommentId === comment.id ? (
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full bg-transparent rounded-lg bg-input-gradient pl-3 py-[10px] pr-[76px] border-2 border-whiteT-10 justify-start items-center gap-2 focus:outline-none text-[14px] mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleUpdateComment(comment.id)}
                        className="text-primary-70 font-semibold text-[12px]"
                      >
                        등록
                      </button>
                      <button onClick={handleCancelEdit} className="text-whiteT-50 font-semibold text-[12px]">
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-[14px] font-normal leading-5 mb-4">{comment.content}</p>
                    <div className="flex items-center justify-between">
                      <button className="flex gap-[2px] items-center">
                        <FaCommentAlt className="w-[14px] h-[14px] text-whiteT-30" />
                        <span className="text-whiteT-50 text-[12px] font-semibold leading-4">답글쓰기</span>
                      </button>
                      <button
                        className="flex gap-[2px] items-center"
                        onClick={() => handleToggleLike(comment.id)}
                        disabled={isLikeLoading}
                      >
                        <FaHeart
                          className={`w-[14px] h-[14px] ${comment.isLiked ? 'text-red-500' : 'text-whiteT-50'}`}
                        />
                        <span className="text-whiteT-50 text-[12px] font-semibold leading-4">{comment.likes}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )
          ),
        )}
      </div>
    </div>
  );
};

export default CommunityComment;
