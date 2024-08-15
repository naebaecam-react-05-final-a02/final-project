import { CommentData, CommunityPostData, ReplyData } from '@/types/community';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { communityQueryKeys, mutationOptions, prefetchCommunityPosts, queryOptions } from './queries';

// 커뮤니티 글 목록 조회
export const useGetCommunityPosts = (category: string, categories: string[]) => {
  const queryClient = useQueryClient();
  const query = useInfiniteQuery(queryOptions.posts(category));

  const prefetchAllCategories = async () => {
    const prefetchedCategories = queryClient.getQueryData(['prefetchedCategories']);
    if (!prefetchedCategories) {
      await prefetchCommunityPosts(queryClient, categories);
      queryClient.setQueryData(['prefetchedCategories'], true);
    }
  };

  return {
    ...query,
    prefetchAllCategories,
  };
};
// 커뮤니티 글 상세 조회
export const useGetCommunityPostDetail = (id: string) => useQuery(queryOptions.postDetail(id));

// 커뮤니티 글 등록
export const useCreateCommunityPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.write,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all });
    },
  });
};

// 커뮤니티 글 삭제
export const useDeleteCommunityPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all });
    },
  });
};

// 커뮤니티 글 수정
export const useUpdateCommunityPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.update,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.postDetail(data.id) });
    },
  });
};

// 게시글 좋아요 목록 조회
export const useGetPostLikes = (postId: string) => useQuery(queryOptions.postLikes(postId));

// 댓글 조회
export const useGetComments = (postId: string) => useQuery(queryOptions.comments(postId));

// 댓글 등록
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.addComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(variables.postId) });
    },
  });
};

// 댓글 업데이트
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.updateComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(variables.postId) });
    },
  });
};

// 댓글 삭제
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.deleteComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(variables.postId) });
    },
  });
};

// 댓글 좋아요 목록 조회
export const useGetCommentLikes = (commentId: string) => useQuery(queryOptions.commentLikes(commentId));

// 답글 조회
export const useGetReplies = (commentId: string) => useQuery(queryOptions.replies(commentId));

// 답글 등록
export const useAddReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.addReply,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.replies(variables.commentId) });
    },
  });
};

// 답글 업데이트
export const useUpdateReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.updateReply,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.replies(variables.commentId) });
    },
  });
};

// 답글 삭제
export const useDeleteReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.deleteReply,
    onSuccess: (data, replyId) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all });
    },
  });
};
// 답글 좋아요 목록 조회
export const useGetReplyLikes = (replyId: string) => useQuery(queryOptions.replyLikes(replyId));

// 게시글 좋아요 토글
export const useTogglePostLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.togglePostLike,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: communityQueryKeys.postDetail(postId) });
      const previousPost = queryClient.getQueryData<CommunityPostData>(communityQueryKeys.postDetail(postId));

      if (previousPost) {
        const newIsLiked = !previousPost.isLiked;
        queryClient.setQueryData<CommunityPostData>(communityQueryKeys.postDetail(postId), {
          ...previousPost,
          likes: newIsLiked ? previousPost.likes + 1 : previousPost.likes - 1,
          isLiked: newIsLiked,
        });
      }
      return { previousPost };
    },
    onError: (err, postId: string, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(communityQueryKeys.postDetail(postId), context.previousPost);
      }
    },
    onSettled: (data, error, postId: string) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.all });
    },
  });
};
// 댓글 좋아요 토글
export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.toggleCommentLike,
    onMutate: async ({ postId, commentId }: { postId: string; commentId: string }) => {
      await queryClient.cancelQueries({ queryKey: communityQueryKeys.comments(postId) });
      const previousComments = queryClient.getQueryData<CommentData[]>(communityQueryKeys.comments(postId));

      if (previousComments) {
        const updatedComments = previousComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
            : comment,
        );
        queryClient.setQueryData<CommentData[]>(communityQueryKeys.comments(postId), updatedComments);
      }
      return { previousComments };
    },
    onError: (err, { postId }, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(communityQueryKeys.comments(postId), context.previousComments);
      }
    },
    onSettled: (data, error, { postId, commentId }) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(postId) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.commentLikes(commentId) });
    },
  });
};

// 답글 좋아요 토글
export const useToggleReplyLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.toggleReplyLike,
    onMutate: async (replyId: string) => {
      await queryClient.cancelQueries({ queryKey: communityQueryKeys.replies(replyId) });
      const previousReplies = queryClient.getQueryData<ReplyData[]>(communityQueryKeys.replies(replyId));

      if (previousReplies) {
        const updatedReplies = previousReplies.map((reply) =>
          reply.id === replyId
            ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
            : reply,
        );
        queryClient.setQueryData<ReplyData[]>(communityQueryKeys.replies(replyId), updatedReplies);
      }
      return { previousReplies };
    },
    onError: (err, replyId: string, context) => {
      if (context?.previousReplies) {
        queryClient.setQueryData(communityQueryKeys.replies(replyId), context.previousReplies);
      }
    },
    onSettled: (data, error, replyId: string) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.replies(replyId) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.replyLikes(replyId) });
    },
  });
};

// 투표 목록 조회
export const useGetVotes = () => useQuery(queryOptions.vote());
// 투표자 조회
export const useGetVoters = (voteId: string) => useQuery(queryOptions.voter(voteId));
// 투표 등록
export const usePostVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.postVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.votes() });
    },
  });
};
// 투표 업데이트
export const useUpdateVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.votes() });
    },
  });
};
