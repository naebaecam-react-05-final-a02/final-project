import { getVerification } from '@/app/(providers)/(root)/challenges/[id]/verification/_hooks/useVerification';
import api from '@/service/service';
import { Database, Tables } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

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
  getVerification: (client: SupabaseClient<Database>, cid: string, vid: string) => ({
    queryKey: ['verifications', { cid, vid }],
    queryFn: () => getVerification(client, cid, vid),
    staleTime: Infinity,
  }),
};

export const mutationOptions = {
  registerChallenge: {
    mutationFn: (challengeData: Omit<Tables<'challenges'>, 'id'>) => api.challenge.registerChallenge(challengeData),
  },
  deleteChallenge: {
    mutationFn: (cid: number) => api.challenge.deleteChallenge(cid),
  },
  registerVerification: {
    mutationFn: (verifyData: Omit<Tables<'challengeVerify'>, 'id' | 'date'>) =>
      api.challenge.registerVerification(verifyData),
  },
  updateVerification: {
    mutationFn: (data: { updateData: Omit<Tables<'challengeVerify'>, 'id' | 'date'>; cid: string; vid: string }) =>
      api.challenge.updateVerification(data),
  },
  deleteVerification: {
    mutationFn: (data: { cid: string; vid: string }) => api.challenge.deleteVerification(data),
  },
};
