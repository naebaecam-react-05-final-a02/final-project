import { Tables } from './supabase';

export type NotificationType = 'challenge' | 'community' | 'dashboard';

type ChallengeNotificationCategory = 'verification' | 'pre-start';
type CommunityNotificationCategory = 'comment' | 'reply' | 'following';
type DashboardNotificationCategory = 'diet' | 'exercise' | 'weight';

export type NotificationWithCategory =
  | { type: 'challenge'; category: ChallengeNotificationCategory }
  | { type: 'community'; category: CommunityNotificationCategory }
  | { type: 'dashboard'; category: DashboardNotificationCategory };

export type Notification = Omit<Tables<'notifications'>, 'type' | 'category'> & NotificationWithCategory;
