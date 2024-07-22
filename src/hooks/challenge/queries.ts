import api from '@/service/service';
import { Tables } from '@/types/supabase';

export const mutationOptions = {
  register: {
    mutationFn: (challengeData: Tables<'challenges'>) => api.challenge.register(challengeData),
  },
};
