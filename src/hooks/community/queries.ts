import api from '@/service/service';
import { CommunityPostData } from '@/types/community';

export const dietsQueryKeys = {
  all: ['community'] as const,
};

export const queryOptions = {
  // 커뮤니티 항목 불러오는 로직
};

export const mutationOptions = {
  write: {
    mutationFn: (data: CommunityPostData) => api.community.write(data),
  },
};
