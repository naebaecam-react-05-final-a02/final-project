import api from '@/service/service';
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
