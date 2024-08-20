'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { useToggleCommentLike } from '@/hooks/community/useCommunity';
import { CommentData } from '@/types/community';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa6';
import DetailMenu from '../../DetailMenu';

interface CommentItemProps {
  comment: CommentData;
  postId: string;
  onEdit: (commentId: string, newContent: string) => void;
  onDelete: (commentId: string) => void;
}

const CommentItem = ({ comment, postId, onEdit, onDelete }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { mutate: toggleLike, isPending: isLikeLoading } = useToggleCommentLike();
  const { data: user } = useGetUser();

  const handleToggleLike = () => {
    if (!isLikeLoading) {
      toggleLike({ postId, commentId: comment.id });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleUpdateComment = () => {
    onEdit(comment.id, editedContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  return (
    <div className="bg-whiteT-3 rounded-lg p-4">
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)} />}
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
          <div className="flex items-center">
            <span className="text-whiteT-70 text-sm font-semibold">{comment.user.nickname}</span>
            <span className="ml-1 text-[14px] text-primary-100">Lv. {comment.user.level}</span>
          </div>
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
                onEdit={handleEdit}
                onDelete={handleDelete}
                onOpenChange={setIsMenuOpen}
                iconClassName="text-whiteT-70 w-[18px] h-[18px]"
              />
            )}
          </div>
        </figcaption>
      </div>
      {isEditing ? (
        <div className="flex flex-col">
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full bg-transparent rounded-lg bg-input-gradient pl-3 py-[10px] pr-[76px] border-2 border-whiteT-10 justify-start items-center gap-2 focus:outline-none text-[14px] mb-2"
          />
          <div className="flex justify-end gap-2">
            <button onClick={handleUpdateComment} className="text-primary-70 font-semibold text-[12px]">
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
          <div className="flex items-center justify-end">
            <button className="flex gap-[2px] items-center" onClick={handleToggleLike} disabled={isLikeLoading}>
              <FaHeart className={`w-[14px] h-[14px] ${comment.isLiked ? 'text-red-500' : 'text-whiteT-50'}`} />
              <span className="text-whiteT-50 text-[12px] font-semibold leading-4">{comment.likes}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentItem;
