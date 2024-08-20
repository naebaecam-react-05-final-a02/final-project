import { Answer, AnswerResponse, CommentData, CommunityPostData, PostsResponse } from '@/types/community';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { communityQueryKeys, mutationOptions, queryOptions } from './queries';

interface UseGetCommunityPostsProps {
  category: string;
  categories: string[];
  initialData?: PostsResponse;
}
// 게시글 목록 불러오기
export const useGetCommunityPosts = ({ category, categories, initialData }: UseGetCommunityPostsProps) => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery<PostsResponse, Error, InfiniteData<PostsResponse, number>>({
    ...queryOptions.posts(category),
    queryKey: communityQueryKeys.posts(category),
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
  });

  const fetchCategoryData = async () => {
    const prefetchedCategories = queryClient.getQueryData(['prefetchedCategories']);
    if (!prefetchedCategories) {
      await Promise.all(categories.map((cat) => queryClient.prefetchInfiniteQuery(queryOptions.posts(cat))));
      queryClient.setQueryData(['prefetchedCategories'], true);
    }
  };

  return {
    ...query,
    fetchCategoryData,
  };
};

// 커뮤니티 글 상세 조회
export const useGetCommunityPostDetail = (postId: string, initialData: CommunityPostData) =>
  useQuery({
    ...queryOptions.postDetail(postId),
    initialData,
  });

// 커뮤니티 글 등록
export const useCreateCommunityPost = (category: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.write,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.posts('전체') });

      queryClient.invalidateQueries({ queryKey: communityQueryKeys.posts(category) });
    },
  });
};

// 커뮤니티 글 삭제
export const useDeleteCommunityPost = (category: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.posts('전체') });

      queryClient.invalidateQueries({ queryKey: communityQueryKeys.posts(category) });
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
export const useGetPostLikes = () => useQuery(queryOptions.postLikes());

// 댓글 조회
export const useGetComments = (postId: string) => useQuery(queryOptions.comments(postId.toString()));

// 댓글 등록
export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.addComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(variables.postId.toString()) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.postDetail(variables.postId.toString()) });
    },
  });
};

// 댓글 업데이트
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.updateComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(variables.postId.toString()) });
    },
  });
};

// 댓글 삭제
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.deleteComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(variables.postId.toString()) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.postDetail(variables.postId.toString()) });
    },
  });
};

// 댓글 좋아요 목록 조회
export const useGetCommentLikes = (commentId: string) => useQuery(queryOptions.commentLikes(commentId));

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
    onSettled: (data, error, postId) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.postDetail(postId.toString()) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.allPosts });
    },
  });
};
// 댓글 좋아요 토글
export const useToggleCommentLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.toggleCommentLike,
    onMutate: async ({ postId, commentId }: { postId: string; commentId: string }) => {
      await queryClient.cancelQueries({ queryKey: communityQueryKeys.comments(postId.toString()) });
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
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.comments(postId.toString()) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.commentLikes(commentId.toString()) });
    },
  });
};

// 투표 목록 조회
export const useGetVotes = (postId: string) => useQuery(queryOptions.vote(postId.toString()));
// 투표자 조회
export const useGetVoters = (postId: string) => useQuery(queryOptions.voter(postId.toString()));
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

// 답변 목록 조회
export const useGetAnswers = (questionId: string, initialData: AnswerResponse) =>
  useQuery({ ...queryOptions.answers(questionId), initialData });

// 채택된 답변 조회
export const useGetAcceptedAnswer = (questionId: string) => useQuery(queryOptions.acceptedAnswer(questionId));

// 답변 항목 조회
export const useGetAnswer = (answerId: string) => {
  return useQuery<Answer, Error>(queryOptions.answer(answerId));
};

// 답변 생성
export const useCreateAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.createAnswer,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.answers(variables.questionId.toString()) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.postDetail(variables.questionId.toString()) });
    },
  });
};

// 답변 수정
export const useUpdateAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.updateAnswer,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.answer(variables.answerId) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.answers(data.questionId) });
    },
  });
};
// 답변 삭제
export const useDeleteAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.deleteAnswer,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.answers(variables.questionId) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.allPosts });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.postDetail(variables.questionId) });
    },
  });
};
// 답변 채택
export const useAcceptAnswer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...mutationOptions.acceptAnswer,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.acceptedAnswer(variables.questionId.toString()) });
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.answers(variables.questionId.toString()) });
    },
  });
};

// QA 게시물 좋아요/싫어요 토글 훅
export const useToggleQAPostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.toggleQaPostLike,
    onMutate: async ({ postId, likeType }) => {
      const queryKey = communityQueryKeys.postDetail(postId.toString());
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<CommunityPostData>(queryKey);

      if (previousData) {
        let updatedLikes = previousData.likes;
        let updatedDislikes = previousData.dislikes || 0;
        let updatedIsLiked = previousData.isLiked;

        if (likeType === 'like') {
          if (updatedIsLiked === true) {
            // 좋아요 취소
            updatedLikes -= 1;
            updatedIsLiked = null;
          } else if (updatedIsLiked === false) {
            // 싫어요에서 좋아요로 전환
            updatedLikes += 1;
            updatedDislikes -= 1;
            updatedIsLiked = true;
          } else {
            // 좋아요 추가
            updatedLikes += 1;
            updatedIsLiked = true;
          }
        } else if (likeType === 'dislike') {
          if (updatedIsLiked === false) {
            // 싫어요 취소
            updatedDislikes -= 1;
            updatedIsLiked = null;
          } else if (updatedIsLiked === true) {
            // 좋아요에서 싫어요로 전환
            updatedLikes -= 1;
            updatedDislikes += 1;
            updatedIsLiked = false;
          } else {
            // 싫어요 추가
            updatedDislikes += 1;
            updatedIsLiked = false;
          }
        } else if (likeType === null) {
          // 현재 상태에 따라 취소
          if (updatedIsLiked === true) {
            updatedLikes -= 1;
          } else if (updatedIsLiked === false) {
            updatedDislikes -= 1;
          }
          updatedIsLiked = null;
        }

        const updatedScore = updatedLikes - updatedDislikes;

        const updatedData = {
          ...previousData,
          likes: updatedLikes,
          dislikes: updatedDislikes,
          score: updatedScore,
          isLiked: updatedIsLiked,
        };

        queryClient.setQueryData<CommunityPostData>(queryKey, updatedData);

        return { previousData };
      }

      return { previousData: null };
    },
    onError: (err, { postId }, context) => {
      console.error('Error in useToggleQAPostLike:', err);
      const queryKey = communityQueryKeys.postDetail(postId.toString());
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: (data, error, { postId }) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.answers(postId.toString()) });
    },
  });
};

// QA 답변 좋아요/싫어요 토글 훅
export const useToggleQAAnswerLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...mutationOptions.toggleQaAnswerLike,
    onMutate: async ({ id, postId, likeType }) => {
      await queryClient.cancelQueries({ queryKey: communityQueryKeys.answers(postId) });

      const previousData = queryClient.getQueryData<AnswerResponse>(communityQueryKeys.answers(postId));

      if (previousData && previousData.answers.length > 0) {
        const updatedAnswers = previousData.answers.map((answer) => {
          if (answer.id === id) {
            let updatedLikes = answer.likes;
            let updatedDislikes = answer.dislikes || 0;
            let updatedIsLiked = answer.isLiked;

            if (likeType === 'like') {
              if (updatedIsLiked === true) {
                // 좋아요 취소
                updatedLikes -= 1;
                updatedIsLiked = null;
              } else if (updatedIsLiked === false) {
                // 싫어요에서 좋아요로 전환
                updatedLikes += 1;
                updatedDislikes -= 1;
                updatedIsLiked = true;
              } else {
                // 좋아요 추가
                updatedLikes += 1;
                updatedIsLiked = true;
              }
            } else if (likeType === 'dislike') {
              if (updatedIsLiked === false) {
                // 싫어요 취소
                updatedDislikes -= 1;
                updatedIsLiked = null;
              } else if (updatedIsLiked === true) {
                // 좋아요에서 싫어요로 전환
                updatedLikes -= 1;
                updatedDislikes += 1;
                updatedIsLiked = false;
              } else {
                // 싫어요 추가
                updatedDislikes += 1;
                updatedIsLiked = false;
              }
            } else if (likeType === null) {
              // 현재 상태에 따라 취소
              if (updatedIsLiked === true) {
                updatedLikes -= 1;
              } else if (updatedIsLiked === false) {
                updatedDislikes -= 1;
              }
              updatedIsLiked = null;
            }

            const updatedScore = updatedLikes - updatedDislikes;

            return {
              ...answer,
              likes: updatedLikes,
              dislikes: updatedDislikes,
              score: updatedScore,
              isLiked: updatedIsLiked,
            };
          }
          return answer;
        });

        const updatedData = {
          ...previousData,
          answers: updatedAnswers,
        };

        queryClient.setQueryData<AnswerResponse>(communityQueryKeys.answers(postId), updatedData);

        return { previousData };
      }

      return { previousData: null };
    },
    onError: (err, { postId }, context) => {
      console.error('Error in useToggleQAAnswerLike:', err);
      if (context?.previousData) {
        queryClient.setQueryData(communityQueryKeys.answers(postId), context.previousData);
      }
    },
    onSettled: (data, error, { postId }) => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.answers(postId.toString()) });
    },
  });
};
