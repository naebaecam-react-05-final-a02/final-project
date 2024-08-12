import api from '@/service/service';
import { CommunityPostCreateData, CommunityPostData } from '@/types/community';

export const communityQueryKeys = {
  all: ['community'] as const,
  posts: ['community', 'posts'] as const,
  postDetail: (id: string) => ['community', 'post', id] as const,
};

export const queryOptions = {
  posts: {
    queryKey: communityQueryKeys.posts,
    queryFn: ({ pageParam = 1 }) => api.community.getPosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: { data: CommunityPostData[]; page: number; limit: number }) => {
      if (lastPage.data.length < lastPage.limit) {
        return undefined;
      }
      return lastPage.page + 1;
    },
  },
  postDetail: (id: string) => ({
    queryKey: communityQueryKeys.postDetail(id),
    queryFn: () => api.community.getPostDetail(id),
  }),
};

export const mutationOptions = {
  write: {
    mutationFn: (data: CommunityPostCreateData) => api.community.write(data),
  },
};
