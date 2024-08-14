import api from '@/service/service';
import { InsertNotification } from '@/types/notification';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export const notificationsQueryKeys = {
  all: ['notifications'] as const,
};

export const notificationsQueryOptions = {
  getNotifications: (client: SupabaseClient<Database>) => ({
    queryKey: notificationsQueryKeys.all,
    queryFn: () => api.notifications.getNotifications(client),
  }),
};

export const notificationsMutationOptions = {
  notificationIsRead: {
    mutationFn: (nid: number) => api.notifications.updateNotificationIsRead(nid),
  },
  notificationsIsRead: {
    mutationFn: () => api.notifications.updateNotificationsIsRead(),
  },
  createNotification: {
    mutationFn: (notificationData: InsertNotification) => api.notifications.createNotification(notificationData),
  },
};
