import api from '@/service/service';
import {
  CommentCreateData,
  CommentUpdateData,
  CommunityPostCreateData,
  CommunityPostUpdateData,
  PostsResponse,
  ReplyCreateData,
  ReplyUpdateData,
  VoteData,
  VoteUpdateData,
} from '@/types/community';
import { InfiniteData, UseInfiniteQueryOptions } from '@tanstack/react-query';

interface PostsProps {
  pageParam?: number;
  category?: string;
}

export const communityQueryKeys = {
  all: ['community'] as const,
  posts: (category: string) => ['community', 'posts', category] as const,
  postDetail: (postId: string) => ['community', 'post', postId] as const,
  comments: (postId: string) => ['community', 'comments', postId] as const,
  replies: (commentId: string) => ['community', 'replies', commentId] as const,
  postLikes: () => ['community', 'postLikes'] as const,
  commentLikes: (commentId: string) => ['community', 'commentLikes', commentId] as const,
  replyLikes: (replyId: string) => ['community', 'replyLikes', replyId] as const,
  votes: () => ['community', 'vote'] as const,
  voters: () => ['community', 'voter', 'vote'] as const,
  answer: (answerId: string) => ['community', 'answer', answerId] as const,
  answers: (questionId: string) => ['community', 'answers', questionId] as const,
  acceptedAnswer: (questionId: string) => ['community', 'acceptedAnswer', questionId] as const,
  qaPostLikes: (postId: string) => ['community', 'post', postId] as const,
  qaAnswerLikes: (postId: string) => ['community', 'answers', postId] as const,
};

export const queryOptions = {
  posts: (category: string): UseInfiniteQueryOptions<PostsResponse, Error, InfiniteData<PostsResponse, number>> => ({
    queryKey: communityQueryKeys.posts(category),
    queryFn: ({ pageParam = 1 }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1;
      return api.community.getPosts({ pageParam: page, category });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PostsResponse, allPages) => {
      if (lastPage.data.length < lastPage.limit || allPages.length * lastPage.limit >= lastPage.totalCount) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: Infinity,
  }),

  postDetail: (postId: string) => ({
    queryKey: communityQueryKeys.postDetail(postId),
    queryFn: () => api.community.getPostDetail(postId),
  }),
  comments: (postId: string) => ({
    queryKey: communityQueryKeys.comments(postId),
    queryFn: () => api.community.getComments(postId),
  }),
  replies: (commentId: string) => ({
    queryKey: communityQueryKeys.replies(commentId),
    queryFn: () => api.community.getReplies(commentId),
  }),
  postLikes: () => ({
    queryKey: communityQueryKeys.postLikes(),
    queryFn: () => api.community.getPostLikes(),
  }),
  commentLikes: (commentId: string) => ({
    queryKey: communityQueryKeys.commentLikes(commentId),
    queryFn: () => api.community.getCommentLikes(commentId),
  }),
  replyLikes: (replyId: string) => ({
    queryKey: communityQueryKeys.replyLikes(replyId),
    queryFn: () => api.community.getReplyLikes(replyId),
  }),
  vote: (postId: string) => ({
    queryKey: communityQueryKeys.votes(),
    queryFn: () => api.community.getVote(postId),
  }),
  voter: (postId: string) => ({
    queryKey: communityQueryKeys.voters(),
    queryFn: () => api.community.getVoter(postId),
  }),
  answer: (answerId: string) => ({
    queryKey: communityQueryKeys.answer(answerId),
    queryFn: () => api.community.getAnswer(answerId),
  }),
  answers: (questionId: string) => ({
    queryKey: communityQueryKeys.answers(questionId),
    queryFn: () => api.community.getAnswers(questionId),
  }),
  acceptedAnswer: (questionId: string) => ({
    queryKey: communityQueryKeys.acceptedAnswer(questionId),
    queryFn: () => api.community.getAcceptedAnswer(questionId),
  }),
};

export const mutationOptions = {
  write: {
    mutationFn: (data: CommunityPostCreateData) => api.community.write(data),
  },
  delete: {
    mutationFn: (id: string) => api.community.delete(id),
  },
  update: {
    mutationFn: (data: CommunityPostUpdateData) => api.community.update(data),
  },
  addComment: {
    mutationFn: (data: CommentCreateData) => api.community.addComment(data),
  },
  updateComment: {
    mutationFn: ({ postId, data }: { postId: string; data: CommentUpdateData }) =>
      api.community.updateComment(postId, data),
  },
  deleteComment: {
    mutationFn: ({ postId, commentId }: { postId: string; commentId: string }) =>
      api.community.deleteComment(postId, commentId),
  },
  addReply: {
    mutationFn: (data: ReplyCreateData) => api.community.addReply(data),
  },
  updateReply: {
    mutationFn: (data: ReplyUpdateData) => api.community.updateReply(data),
  },
  deleteReply: {
    mutationFn: (replyId: string) => api.community.deleteReply(replyId),
  },
  togglePostLike: {
    mutationFn: (postId: string) => api.community.togglePostLike(postId),
  },
  toggleCommentLike: {
    mutationFn: ({ postId, commentId }: { postId: string; commentId: string }) =>
      api.community.toggleCommentLike(postId, commentId),
  },
  toggleReplyLike: {
    mutationFn: (replyId: string) => api.community.toggleReplyLike(replyId),
  },
  postVote: {
    mutationFn: (data: VoteData) => api.community.postVote(data),
  },
  updateVote: {
    mutationFn: (data: VoteUpdateData) => api.community.updateVote(data),
  },
  createAnswer: {
    mutationFn: (data: { questionId: string; content: string }) => api.community.createAnswer(data),
  },
  updateAnswer: {
    mutationFn: (data: { answerId: string; content: string }) => api.community.updateAnswer(data),
  },
  deleteAnswer: {
    mutationFn: ({ answerId, questionId }: { answerId: string; questionId: string }) =>
      api.community.deleteAnswer(answerId, questionId),
  },
  acceptAnswer: {
    mutationFn: (data: { questionId: string; answerId: string }) => api.community.acceptAnswer(data),
  },
  toggleQaPostLike: {
    mutationFn: ({ postId, likeType }: { postId: string; likeType: 'like' | 'dislike' | null }) =>
      api.community.toggleQAPostLike(postId, likeType),
  },
  toggleQaAnswerLike: {
    mutationFn: ({ id, postId, likeType }: { id: string; postId: string; likeType: 'like' | 'dislike' | null }) =>
      api.community.toggleQAAnswerLike(id, postId, likeType),
  },
};
