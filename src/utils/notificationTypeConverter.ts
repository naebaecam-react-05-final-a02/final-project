const korNotificationTypeItems: { [key: string]: string } = {
  챌린지: 'challenge',
  대시보드: 'dashboard',
  커뮤니티: 'community',
};
const engNotificationTypeItems: { [key: string]: string } = {
  challenge: '챌린지',
  dashboard: '대시보드',
  community: '커뮤니티',
};
export const NotificationTypeConverter = (type: string) => {
  return korNotificationTypeItems[type] ?? engNotificationTypeItems[type];
};
