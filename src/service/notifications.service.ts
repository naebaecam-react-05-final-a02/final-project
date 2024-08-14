import { Notification } from '@/types/notification';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

class NotificationsAPI {
  constructor() {}

  getNotifications = async (client: SupabaseClient<Database>) => {
    try {
      const {
        data: { user },
      } = await client.auth.getUser();

      if (!user) {
        return null;
      }

      const response = await client
        .from('notifications')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(50)
        .match({ targetUserId: user.id, isRead: false })
        .returns<Notification[]>();

      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw err;
    }
  };
}

export default NotificationsAPI;
