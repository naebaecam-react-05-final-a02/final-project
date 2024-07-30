import api from '@/service/service';
import { Tables } from '@/types/supabase';

export const mutationOptions = {
  register: {
    mutationFn: (challengeData: Omit<Tables<'challenges'>, 'id'>) => api.challenge.register(challengeData),
  },
  verify: {
    mutationFn: (verifyData: Omit<Tables<'challengeVerify'>, 'id'>) => api.challenge.verify(verifyData),
  },
};

export const challengesQueryKeys = {
  all: ['challenges'] as const,
  popular: ({ category }: { category: string }) => [...challengesQueryKeys.all, 'coming', category] as const,
};

export const queryOptions = {
  popular: ({ category }: { category: string }) => ({
    queryKey: challengesQueryKeys.popular({ category }),
    queryFn: () => fetch(`/api/challenges/coming?category=${category}`).then((res) => res.json()),
  }),
};
