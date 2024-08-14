import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { notificationsQueryOptions } from './query';

export const useGetNotifications = (client: SupabaseClient<Database>) =>
  useQuery(notificationsQueryOptions.getNotifications(client));
