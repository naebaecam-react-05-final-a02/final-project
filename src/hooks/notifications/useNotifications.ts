import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notificationsMutationOptions, notificationsQueryOptions } from './query';

// 모든 알림 정보 가져오기
export const useGetNotifications = (client: SupabaseClient<Database>) =>
  useQuery(notificationsQueryOptions.getNotifications(client));

// 하나의 알림 읽음 처리
export const useNotificationIsRead = () => useMutation(notificationsMutationOptions.noticiationIsRead);
