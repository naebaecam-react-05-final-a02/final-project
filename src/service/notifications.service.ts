import { InsertNotification, Notification } from '@/types/notification';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import axios from 'axios';

class NotificationsAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = '/api/notifications';
  }

  // 알림 정보 가져오기
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

  // 개별 알림 읽음 처리
  updateNotificationIsRead = async (nid: number) => {
    try {
      const response = await axios.patch(`${this.baseURL}/${nid}`);
      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw err;
    }
  };

  // 전체 알림 읽음 처리
  updateNotificationsIsRead = async () => {
    try {
      const response = await axios.patch(`${this.baseURL}`);
      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw err;
    }
  };

  // 알림 생성
  createNotification = async (notificationData: InsertNotification) => {
    try {
      const response = await axios.post(`${this.baseURL}`, notificationData);
      return response.data;
    } catch (error) {
      const err = error as Error;
      console.error(err);
      throw err;
    }
  };
}

export default NotificationsAPI;
