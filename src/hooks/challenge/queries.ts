import api from '@/service/service';
import { Tables } from '@/types/supabase';

export const challengesQueryKeys = {
  all: ['challenge'] as const,
};
export const queryOptions = {
  getChallengeDetail: (id: number) => ({
    queryKey: challengesQueryKeys.all,
    queryFn: async () => {
      const data = await api.challenge.getChallengeDetail(id);

      if (!data) {
        throw new Error('data not found');
      }
      return data;
    },
  }),
};

export const mutationOptions = {
  register: {
    mutationFn: (challengeData: Omit<Tables<'challenges'>, 'id'>) => api.challenge.register(challengeData),
  },
  verify: {
    mutationFn: (verifyData: Omit<Tables<'challengeVerify'>, 'id' | 'date'>) => api.challenge.verify(verifyData),
  },
};
