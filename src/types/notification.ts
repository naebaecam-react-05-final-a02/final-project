import { Tables } from './supabase';

export type NotificationType = 'challenge' | 'community' | 'dashboard';

export type ChallengeNotificationCategory = 'verification' | 'pre-start';
export type CommunityNotificationCategory = 'comment' | 'reply' | 'following';
export type DashboardNotificationCategory = 'diet' | 'exercise' | 'weight';

export type NotificationWithCategory =
  | { type: 'challenge'; category: ChallengeNotificationCategory }
  | { type: 'community'; category: CommunityNotificationCategory }
  | { type: 'dashboard'; category: DashboardNotificationCategory };

export type Notification = Omit<Tables<'notifications'>, 'type' | 'category'> & NotificationWithCategory;
export type InsertNotification = Omit<Notification, 'id'>;
