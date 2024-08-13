import api from '@/service/service';
import { CommunityPostCreateData, CommunityPostData, CommunityPostUpdateData } from '@/types/community';
import { QueryClient } from '@tanstack/react-query';

export const communityQueryKeys = {
  all: ['community'] as const,
  posts: (category: string) => ['community', 'posts', category] as const,
  postDetail: (id: string) => ['community', 'post', id] as const,
};

export const queryOptions = {
  posts: (category: string) => ({
    queryKey: communityQueryKeys.posts(category),
    queryFn: ({ pageParam = 1 }) => api.community.getPosts({ pageParam, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: CommunityPostData[]; page: number; limit: number }) => {
      if (lastPage.data.length < lastPage.limit) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  }),
  postDetail: (id: string) => ({
    queryKey: communityQueryKeys.postDetail(id),
    queryFn: () => api.community.getPostDetail(id),
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
};

export const prefetchCommunityPosts = async (queryClient: QueryClient, categories: string[]) => {
  const prefetchPromises = categories.map((category) =>
    queryClient.prefetchInfiniteQuery(queryOptions.posts(category)),
  );
  await Promise.all(prefetchPromises);
};
