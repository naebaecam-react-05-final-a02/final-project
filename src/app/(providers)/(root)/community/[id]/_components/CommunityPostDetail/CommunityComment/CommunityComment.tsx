'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { useAddComment, useDeleteComment, useGetComments, useUpdateComment } from '@/hooks/community/useCommunity';
import { useLevelUp } from '@/hooks/level/useLevel';
import { useCreateNotification } from '@/hooks/notifications/useNotifications';
import { makeNotificationData } from '@/utils/notificationTypeConverter';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

interface CommunityCommentProps {
  postId: string;
  postUserId: string;
}

const CommunityComment = ({ postId, postUserId }: CommunityCommentProps) => {
  const { data: comments } = useGetComments(postId);
  const { mutate: addComment } = useAddComment();
  const { mutate: updateComment } = useUpdateComment();
  const { mutateAsync: deleteComment } = useDeleteComment();

  const { mutate: createNotification } = useCreateNotification();
  const { mutate: levelUp } = useLevelUp();

  const modal = useModal();

  const handleAddComment = async (content: string) => {
    if (content.trim()) {
      addComment({ postId, content });
      //LEVEL
      levelUp({ exp: 1 });
      createNotification(makeNotificationData({ type: 'community', category: 'comment' }, postUserId, postId));
    }
  };

  const handleUpdateComment = async (commentId: string, newContent: string) => {
    updateComment({ postId, data: { id: commentId, content: newContent } });
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

  return (
    <div className="px-4 mt-6 mb-[28px]">
      <CommentInput onAddComment={handleAddComment} />

      <div className="flex flex-col gap-2">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            onEdit={handleUpdateComment}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityComment;
