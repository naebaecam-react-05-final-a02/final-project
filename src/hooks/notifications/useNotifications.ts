import { queryClient } from '@/providers/QueryProvider';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { notificationsMutationOptions, notificationsQueryKeys, notificationsQueryOptions } from './query';

// 모든 알림 정보 가져오기
export const useGetNotifications = (client: SupabaseClient<Database>) =>
  useQuery(notificationsQueryOptions.getNotifications(client));

// 하나의 알림 읽음 처리
export const useNotificationIsRead = () => useMutation(notificationsMutationOptions.notificationIsRead);

// 전체 알림 읽음 처리
export const useNotificationsIsRead = () =>
  useMutation({
    ...notificationsMutationOptions.notificationsIsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationsQueryKeys.all });
      const prev = queryClient.getQueryData(notificationsQueryKeys.all);
      queryClient.setQueryData(notificationsQueryKeys.all, () => {
        return [];
      });
      return { prev };
    },
    onError: (error, _, context) => {
      console.error('Failed to update notifications isRead', error);
      queryClient.setQueryData(notificationsQueryKeys.all, context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationsQueryKeys.all });
    },
  });

// 알림 생성
export const useCreateNotification = () =>
  useMutation({
    ...notificationsMutationOptions.createNotification,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationsQueryKeys.all }),
  });
