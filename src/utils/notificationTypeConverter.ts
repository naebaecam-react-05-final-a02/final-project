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
  let url = '';

  switch (type) {
    case 'challenge':
      url = '/challenges';
      switch (category) {
        case 'verification':
          url += `/${id}/verification/list`;
          break;
        case 'pre-start':
          url += `/${id}/detail`;
          break;
        default:
          throw new Error('Invalid challenge notification category');
      }
      break;

    //TODO 커뮤니티쪽 url은 나중에 변경해야함
    case 'community':
      url = '/community';
      switch (category) {
        case 'comment':
          url += '/comment';
          break;
        case 'reply':
          url += '/reply';
          break;
        case 'following':
          url = '/mypage';
          break;
        default:
          throw new Error('Invalid community notification category');
      }
      break;

    case 'dashboard':
      switch (category) {
        case 'diet':
          url = '/diets';
          break;
        case 'exercise':
          url = '/exercises';
          break;
        case 'weight':
          url = '/weight';
          break;
        default:
          throw new Error('Invalid dashboard notification category');
      }
      break;

    default:
      throw new Error('Invalid notification type');
  }

  return url;
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
