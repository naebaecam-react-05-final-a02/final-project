import api from '@/service/service';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const levelQueryKeys = {
  level: ['level'] as const,
  experience: ['experience'] as const,
};

export const levelQueryOptions = {
  getLevel: (client: SupabaseClient<Database>) => ({
    queryKey: levelQueryKeys.level,
    queryFn: () => api.level.getLevel(client),
  }),
  getExperience: (client: SupabaseClient<Database>) => ({
    queryKey: levelQueryKeys.experience,
    queryFn: () => api.level.getExperience(client),
    staleTime: Infinity,
    gcTime: Infinity,
  }),
};

export const levelMutationOptions = {
  levelUp: {
    mutationFn: ({ uid, exp }: { uid?: string; exp: number }) => api.level.levelUp({ uid, exp }),
  },
};
