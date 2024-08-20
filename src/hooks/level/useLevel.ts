import { queryClient } from '@/providers/QueryProvider';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { levelMutationOptions, levelQueryKeys, levelQueryOptions } from './queries';

// 경험치 정보 - 이제 안씀
export const useGetExperience = (client: SupabaseClient<Database>) => useQuery(levelQueryOptions.getExperience(client));

// 현재 레벨 정보
export const useGetLevel = (client: SupabaseClient<Database>) => useQuery(levelQueryOptions.getLevel(client));

// 레베루업
export const useLevelUp = () =>
  useMutation({
    ...levelMutationOptions.levelUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: levelQueryKeys.level }),
  });
