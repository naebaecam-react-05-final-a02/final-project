type ChallengeNotificationCategory = 'verification' | 'pre-start';
type CommunityNotificationCategory = 'comment' | 'reply' | 'following';
type DashboardNotificationCategory = 'diet' | 'exercise' | 'weight';

type NotificationType =
  | { type: 'challenge'; category: ChallengeNotificationCategory }
  | { type: 'community'; category: CommunityNotificationCategory }
  | { type: 'dashboard'; category: DashboardNotificationCategory };
