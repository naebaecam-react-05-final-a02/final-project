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
