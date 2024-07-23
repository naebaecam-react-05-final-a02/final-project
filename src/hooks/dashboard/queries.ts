import api from '../../service/service';

export const usersQueryKeys = {
  all: ['dashboard'] as const,
};

export const queryOptions = {
  dashboard: () => ({
    queryKey: usersQueryKeys.all,
    queryFn: async () => {
      const weights = await api.dashboard.getWeightsData();

      if (!weights) {
        throw new Error('weights not found');
      }
      return weights;
    },
  }),
};
