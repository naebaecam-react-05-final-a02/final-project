import { InsertNotification, NotificationWithCategory } from '@/types/notification';

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
export const notificationTypeConverter = (type: string) => {
  return korNotificationTypeItems[type] ?? engNotificationTypeItems[type];
};

export const makeNotificationLink = ({ type, category }: NotificationWithCategory, id: string | null): string => {
  const baseURLs = {
    challenge: '/challenges',
    community: '/community',
  };

  switch (type) {
    case 'challenge':
      switch (category) {
        case 'verification':
          return `${baseURLs[type]}/${id}/verification/list`;
        case 'pre-start':
          return `${baseURLs[type]}/${id}/detail`;
        default:
          throw new Error('Invalid challenge notification category');
      }

    case 'community':
      switch (category) {
        case 'comment':
        case 'reply':
          return `${baseURLs[type]}/${id}`;
        case 'following':
          return `/mypage`;
        default:
          throw new Error('Invalid community notification category');
      }

    case 'dashboard':
      switch (category) {
        case 'diet':
          return '/diets';
        case 'exercise':
          return '/exercises';
        case 'weight':
          return '/weight';
        default:
          throw new Error('Invalid dashboard notification category');
      }
    default:
      throw new Error('Invalid notification type');
  }
};

export const makeNotificationData = (
  { type, category }: NotificationWithCategory,
  targetUserId: string,
  idForURL: string | null,
): InsertNotification => {
  const commonData = {
    createdAt: new Date().toISOString(),
    targetUserId,
    type,
    category,
    isRead: false,
  };

  if (['following', 'diet', 'exercise', 'weight'].includes(category)) {
    return {
      ...commonData,
      idForURL: null,
    };
  }

  return {
    ...commonData,
    idForURL,
  };
};
