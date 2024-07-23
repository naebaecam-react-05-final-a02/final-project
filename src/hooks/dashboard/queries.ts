import api from '../../service/service';

export const usersQueryKeys = {
  all: ['dashboard'] as const,
};

export const queryOptions = {
  weights: (query: string) => ({
    queryKey: ['weights', { query }],
    queryFn: async () => api.dashboard.getWeights(query),
  }),
};
