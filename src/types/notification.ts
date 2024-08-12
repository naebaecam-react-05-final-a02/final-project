type ChallengeAlarmCategory = 'verification' | 'pre-start';
type CommunityAlarmCategory = 'comment' | 'reply' | 'following';
type DashboardAlarmCategory = 'diet' | 'exercise' | 'weight';

type AlarmType =
  | { type: 'challenge'; category: ChallengeAlarmCategory }
  | { type: 'community'; category: CommunityAlarmCategory }
  | { type: 'dashboard'; category: DashboardAlarmCategory };
