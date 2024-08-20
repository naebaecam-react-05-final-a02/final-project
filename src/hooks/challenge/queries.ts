import { getVerification } from '@/app/(providers)/(root)/challenges/[id]/verification/_hooks/useVerification';
import api from '@/service/service';
import { ChallengeFilterTypes } from '@/types/challenge';
import { Database, Tables } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const challengesQueryKeys = {
  all: ['challenge'] as const,
  popular: () => [...challengesQueryKeys.all, 'coming'] as const,
  count: ({ filter }: { filter: ChallengeFilterTypes }) => [...challengesQueryKeys.all, 'filter', filter],
};

export const queryOptions = {
  getChallengeDetail: (id: number) => ({
    queryKey: ['challenge', { cid: id }],
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
  popular: () => ({
    queryKey: challengesQueryKeys.popular(),
    queryFn: () => fetch(`/api/challenges/coming?category=all`).then((res) => res.json()),
  }),
  count: ({ filter }: { filter: ChallengeFilterTypes }) => ({
    queryKey: challengesQueryKeys.count({ filter }),
    queryFn: () => api.challenge.getChallengeCount({ filter }),
  }),
};

export const mutationOptions = {
  registerChallenge: {
    mutationFn: (challengeData: Omit<Tables<'challenges'>, 'id'>) => api.challenge.registerChallenge(challengeData),
  },
  updateChallenge: {
    mutationFn: (data: { updateData: Omit<Tables<'challenges'>, 'id'>; cid: number }) =>
      api.challenge.updateChallenge(data),
  },
  deleteChallenge: {
    mutationFn: (cid: number) => api.challenge.deleteChallenge(cid),
  },
  joinChallenge: {
    mutationFn: (cid: number) => api.challenge.joinChallenge(cid),
  },
  leaveChallenge: {
    mutationFn: (cid: number) => api.challenge.leaveChallenge(cid),
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
