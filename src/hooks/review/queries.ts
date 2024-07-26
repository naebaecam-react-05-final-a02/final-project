import api from '@/service/service';

export const ReviewsQueryKeys = {
  all: ['challengeReview'] as const,
};
export const queryOptions = {
  getChallengeReviews: (id: number) => ({
    queryKey: ReviewsQueryKeys.all,
    queryFn: async () => {
      const data = await api.review.getReviews(id);

      if (!data) {
        throw new Error('data not found');
      }
      return data;
    },
  }),
};

export const mutationOptions = {
  register: {
    mutationFn: (reviewData: FormData) => api.review.register(reviewData),
  },
};
