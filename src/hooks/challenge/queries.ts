import api from '@/service/service';
import { Tables } from '@/types/supabase';

export const mutationOptions = {
  register: {
    mutationFn: (challengeData: Omit<Tables<'challenges'>, 'id'>) => api.challenge.register(challengeData),
  },
};
